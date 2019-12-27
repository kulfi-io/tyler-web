import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import { IMailerUser, INote, IResetRequest, IEndpoint, ICryptorNote } from '../models/interfaces';

export class MailerService extends BaseService {

    private noteEndpoint: string;
    private registerEndpoint: string;
    private resetRequestEndpoint: string;


    constructor() {
        super();
        const _note = <IEndpoint>this.mailer.endpoints
            .find(x => x.name === 'note');
        const _register = <IEndpoint>this.mailer.endpoints
            .find(x => x.name === 'register');
        const _resetRequest = <IEndpoint>this.mailer.endpoints
            .find(x => x.name === 'resetRequest');

        this.noteEndpoint = `${this.mailerBaseUrl}/${_note.endpoint}`;
        this.registerEndpoint = `${this.mailerBaseUrl}/${_register.endpoint}`;
        this.resetRequestEndpoint = `${this.mailerBaseUrl}/${_resetRequest.endpoint}`;

    }

    register(data: IMailerUser): AxiosPromise {

        if (data.email && data.username && data.userId
            && data.token) {
            data.email = data.email;
            data.userId = data.userId;
            data.username = data.username;
            data.token = data.token;
        }

        return Axios.post(this.registerEndpoint, data, { headers: this.header });
    }

    resetRequest(data: IResetRequest): AxiosPromise {
        return Axios.post(this.resetRequestEndpoint, data, { headers: this.header })
    }

    sendNote(data: INote): AxiosPromise {

        let _data: ICryptorNote | INote;

        if (this.isProd) {
            _data = {
                email: this.encryptIv(data.email),
                firstname: this.encryptIv(data.firstname),
                lastname: this.encryptIv(data.lastname),
                content: this.encryptIv(data.content)
            }
        } else {
            _data = data;
        }


        return Axios.post(this.noteEndpoint, _data, { headers: this.header });
    }

}

export default new MailerService();