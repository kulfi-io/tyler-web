import config from '../config/config.json';
import * as crypto from 'crypto';
import { ENV } from '../models/model-enums';
import { ICookieUser, ICryptoData } from '../models/interfaces';

export class cryptor {

    private algorithm: string;
    public isProd: boolean;
    private algorithmIv: string;
    private key: Buffer;
    private iv: Buffer | undefined;


    constructor() {
        this.algorithm = 'aes192';
        this.isProd = config.microservices.overrideProd
            ? config.microservices.overrideProd
            : process.env.NODE_ENV === ENV.PROD;
        this.algorithmIv = 'aes-256-cbc';
        const _key = Buffer.alloc(32);
        this.key = Buffer.concat([Buffer.from(config.secret)], _key.length)
    }

    protected encrypt = (data: Object): string => {

        let encrypted = '';
        const cipher = crypto.createCipher(this.algorithm, config.secret);
        encrypted = cipher.update(data.toString(), 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return encrypted;
        //return this.isProd ? encrypted : data.toString();
    }

    protected encryptIv = (data: string): ICryptoData => {
        this.iv = crypto.randomBytes(16);

        let cipher = crypto.createCipheriv(this.algorithmIv.toString(), this.key, this.iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return {
            iv: this.iv.toString('hex'),
            encryptedData: encrypted
        };
    }

    protected decrypt(data: Object): string {

        let decrypted = '';
        const decipher = crypto.createDecipher(this.algorithm, config.secret);
        decrypted = decipher.update(data.toString(), 'hex', 'utf8');
        decrypted += decipher.final().toString();

        return decrypted;

        // return this.isProd ? decrypted : data.toString();
    }

    protected decryptIv = (data: string): string => {
        if (this.isProd) {
            // const _stringifiedData = JSON.stringify(data);
            // console.debug('de-data', data);

            const _data: ICryptoData = <ICryptoData>JSON.parse(data);

            let iv = Buffer.from(_data.iv, 'hex');
            let decipher = crypto.createDecipheriv(this.algorithmIv, this.key, iv);

            let decrypted = decipher.update(_data.encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;

        }

        return data;
    }

    protected encryptUserCookie(data: Object): string {

        const _jData = JSON.stringify(<ICookieUser>data);
        const _encrypted = this.encrypt(_jData);
        return _encrypted;
    }

    protected decryptUserCookie(data: string): ICookieUser {
        const _decrypted = this.decrypt(data);
        const _parsed = JSON.parse(_decrypted);

        return _parsed;
    }


}