import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import {
    ICookieUser,
    ILogin,
    IRegisterUser,
    IReset,
    IResetAccount,
    IVerifyLogin,
    IEndpoint,
    ICryptorRegisterUser,
    ICrytorLogin,
    ICryptorVerifyLogin,
    ICryptorReset,
    ICryptorResetAccount,
    ICryptorAccountNote,
    IAccountNote,
    ICryptorEmails,
    ICryptoData
} from '../models/interfaces';

export class AccountService extends BaseService {
    private userEndpoint: string;
    private registerEndpoint: string;
    private verifyEndpoint: string;
    private loginEndpoint: string;
    private resetRequestEndpoint: string;
    private resetEndpoint: string;
    private accountNoteEndpoint: string;
    private searchUserEndpoint: string;
    private userListEndpoint: string;


    constructor() {
        super();
        const _user = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'user');
        const _register = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'register');
        const _verify = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'verify');
        const _login = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'login');
        const _resetRequest = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'resetRequest');
        const _reset = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'reset');
        const _accountNote = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'account-note');
        const _searchUser = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'search');
        const _userList = <IEndpoint>this.account.endpoints
            .find(x => x.name === 'userList');

        this.userEndpoint = `${this.accountBaseUrl}/${_user.endpoint}`;
        this.registerEndpoint = `${this.accountBaseUrl}/${_register.endpoint}`;
        this.verifyEndpoint = `${this.accountBaseUrl}/${_verify.endpoint}`;
        this.loginEndpoint = `${this.accountBaseUrl}/${_login.endpoint}`;
        this.resetRequestEndpoint = `${this.accountBaseUrl}/${_resetRequest.endpoint}`;
        this.resetEndpoint = `${this.accountBaseUrl}/${_reset.endpoint}`;
        this.accountNoteEndpoint = `${this.accountBaseUrl}/${_accountNote.endpoint}`;
        this.searchUserEndpoint = `${this.accountBaseUrl}/${_searchUser.endpoint}`;
        this.userListEndpoint = `${this.accountBaseUrl}/${_userList.endpoint}`;
    }

    register(data: IRegisterUser): AxiosPromise {

        let _data: ICryptorRegisterUser | IRegisterUser;

        if (this.isProd) {
            _data = {
                email: this.encryptIv(data.email),
                firstname: this.encryptIv(data.firstname),
                lastname: this.encryptIv(data.lastname),
                password: this.encryptIv(data.password),
                type: this.encryptIv(data.type),
                username: this.encryptIv(data.username)
            }
        } else {
            _data = data;
        }

        return Axios.post(this.registerEndpoint, _data, { headers: this.header });

    }

    login(data: ILogin): AxiosPromise {

        let _data: ICrytorLogin | ILogin;

        if (this.isProd) {
            _data = {
                username: this.encryptIv(data.username),
                password: this.encryptIv(data.password)
            }
        } else {
            _data = data;
        }

        return Axios.post(this.loginEndpoint, _data, { headers: this.header });

    }

    verify(data: IVerifyLogin): AxiosPromise {

        let _data: ICryptorVerifyLogin | IVerifyLogin;

        if (this.isProd) {
            _data = {
                username: this.encryptIv(data.username),
                password: this.encryptIv(data.password),
                token: data.token
            }
        }
        else {
            _data = data;
        }

        return Axios.post(this.verifyEndpoint, _data, { headers: this.header });
    }

    resetUser(data: IReset): AxiosPromise {

        let _data: ICryptorReset | IReset;

        if (this.isProd) {
            _data = {
                username: this.encryptIv(data.username),
                password: this.encryptIv(data.password),
                email: this.encryptIv(data.email),
                token: data.token
            }
        } else {
            _data = data;
        }

        return Axios.post(this.resetEndpoint, data, { headers: this.header });
    }

    resetRequest(data: IResetAccount): AxiosPromise {

        let _data: ICryptorResetAccount | IResetAccount;

        if (this.isProd) {
            _data = {
                email: this.encryptIv(data.email)
            }
        } else {
            _data = data;
        }

        return Axios.post(this.resetRequestEndpoint, _data, { headers: this.header });
    }

    findUser(data: ICookieUser): AxiosPromise {
        const _url = `${this.userEndpoint}`;
        return Axios.post(_url, data, { headers: this.header });
    }

    createAccountNote(data: IAccountNote): AxiosPromise {

        let _data: ICryptorAccountNote | IAccountNote;

        if (this.isProd) {
            _data = {
                title: this.encryptIv(data.title),
                note: this.encryptIv(data.note),
                userId: this.encryptIv(data.userId)
            }
        } else {
            _data = data;
        }

        return Axios.post(this.accountNoteEndpoint, _data, { headers: this.header });
    }

    searchUser(criteria: string): AxiosPromise {

        const _criteria = this.encrypt(criteria);
        const _url = `${this.searchUserEndpoint}/${_criteria}`;
        return Axios.get(_url, { headers: this.header });

    }

    userByEmailList(data: string[]): AxiosPromise {

        let _data: ICryptorEmails;

        if (this.isProd) {

            let _emails: ICryptoData[] = [];

            data.forEach((item) => {
                _emails.push(this.encryptIv(item));
            });

            _data = {
                emails: _emails
            }

        } else {

            _data = {
                emails: data
            }
        }


        return Axios.post(this.userListEndpoint, _data, { headers: this.header });

    }
}

export default new AccountService();