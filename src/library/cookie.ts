import Config from '../config/config.json';
import { ICookie, IDuration, ICookieUser } from '../models/interfaces';
import { cryptor } from './cryptor';
import * as TinyCookie from 'tiny-cookie';

export class CookieManager extends cryptor{
    protected expires: IDuration;
    protected config: ICookie;
    public value?: Object;
    public decryptedValue?: ICookieUser;

    constructor() {
        super();
        this.config = Config.cookie;
    

        this.expires = {
            name: 'sec',
            value: '20sec'
        };

        this.initDuration();
    }

    private initDuration = () => {
        const _selected = this.config.expiration.selected;
        const _expires = this.config.expiration.duration
                        .find((x:IDuration) => x.name === _selected);

        if(_expires) this.expires = _expires;

    }

    public setCookie = (value: Object) => {
        this.value = this.encryptUserCookie(value);

        if(TinyCookie.isCookieEnabled && this.value)  {

            TinyCookie.setCookie(this.config.name
                , this.value.toString(), {expires: this.expires.value});
        }
    }

    public findCookie = () => {
        const _cookie = TinyCookie.getCookie(this.config.name);

        if(_cookie)  {
            this.value = <Object>_cookie;
            this.decryptedValue = this.decryptUserValue;
        }   
    }

    public deleteCookie = () => {
        if(this.config.name) {
            TinyCookie.remove(this.config.name);
            this.value = undefined;
        }
    }

    private get decryptUserValue(): ICookieUser | undefined {
        if(this.value) 
            return this.decryptUserCookie(this.value.toString());
    }
}

export default CookieManager;
