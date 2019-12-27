import Cookie from './cookie';
import { cryptor } from './cryptor';
import { ICookieUser, IUser, ICalEventResponse, ICryptorUser, IAccountNote, ICryptorAccountNote, ICryptoAccountNote, ICalTime } from '../models/interfaces';
import { EventInput } from '@fullcalendar/core';
import moment from 'moment';
import AccountService from '@/microservices/account';


export class Helper extends cryptor {
    protected user?: IUser;
    protected _cookieManager: Cookie;
    private isAdmin: boolean = false;
    protected _value?: ICookieUser;
    private _book?: HTMLDivElement;
    private _navs?: HTMLUListElement[];


    constructor() {
        super();
        this._cookieManager = new Cookie();
        this._cookieManager.findCookie();


    }

    protected get Admin() {
        return this.isAdmin;
    }

    protected decryptResponse = (item: ICalEventResponse): EventInput => {

        const _eventInput: EventInput = {
            id: item.id ? this.decryptIv(JSON.stringify(item.id)) : undefined,
            title: item.summary ? this.decryptIv(JSON.stringify(item.summary)) : undefined,
            start: item.start ? this.decryptIv(JSON.stringify(item.start.dateTime)).toString() : undefined,
            end: item.end ? this.decryptIv(JSON.stringify(item.end.dateTime)).toString() : undefined,
            location: item.location ? this.decryptIv(JSON.stringify(item.location)) : undefined,
            date: item.start ? this.decryptIv(JSON.stringify(item.start.dateTime)) : undefined,
            extendedProps: item.attendees ? <Object>this.decryptIv(JSON.stringify(item.attendees[0].email)) : undefined,
            allDay: false,
        }


        return _eventInput;

    }

    protected decryptUserResponses = (items: ICryptorUser[]): IUser[] => {
        const _users: IUser[] = [];
        items.forEach((item) => {
            const _user = this.decryptUserResponse(item, true);
            if (_user) {
                _users.push(_user);
            }
        });
        return _users;

    }

    protected decryptUserResponse = (item: ICryptorUser, forArray = false): IUser | undefined => {

        const _user: IUser = {
            active: this.decryptIv(JSON.stringify(item.active)) === 'true' ? true : false,
            email: this.decryptIv(JSON.stringify(item.email)),
            firstName: this.decryptIv(JSON.stringify(item.firstName)),
            id: this.decryptIv(JSON.stringify(item.id)),
            lastName: this.decryptIv(JSON.stringify(item.lastName)),
            tokenValidated: this.decryptIv(JSON.stringify(item.tokenValidated)) === 'true' ? true : false,
            username: this.decryptIv(JSON.stringify(item.username)),
            validationToken: this.decryptIv(JSON.stringify(item.validationToken)),
            userType: {
                active: this.decryptIv(JSON.stringify(item.userType.active)) === 'true' ? true : false,
                description: this.decryptIv(JSON.stringify(item.userType.description)),
                display: this.decryptIv(JSON.stringify(item.userType.display)),
                id: this.decryptIv(JSON.stringify(item.userType.id))
            }
        }


        if (!forArray) {
            this.user = _user;
            this.user.notes = [];
        } else {
            _user.notes = [];
        }

        if (item.notes && this.user) {
            const _notes = item.notes.sort((a, b) => {
                if (a.createdAt && b.createdAt) {

                    const _a = Date.parse(a.createdAt.toString());
                    const _b = Date.parse(b.createdAt.toString());

                    return _b - _a;
                }

                return 0;


            }).slice(0, 30);


            _notes.forEach((note) => {
                const _note: IAccountNote = {
                    title: this.decryptIv(JSON.stringify(note.title)),
                    note: this.decryptIv(JSON.stringify(note.note)),
                    id: note.id
                        ? this.decryptIv(JSON.stringify(note.id))
                        : undefined,
                    createdAt: note.createdAt
                        ? moment(note.createdAt).format('llll')
                        : undefined,
                    userId: this.decryptIv(JSON.stringify(note.userId)),
                }

                if (!forArray) {
                    if (this.user && this.user.notes)
                        this.user.notes.push(_note)
                } else {
                    if (_user && _user.notes)
                        _user.notes.push(_note)
                }


            });
        }

        if (forArray) {
            return _user;
        }

    }

    protected logOut = () => {
        const _item = <HTMLAnchorElement>document.querySelector('.logout');

        if (_item) {

            _item.addEventListener('click', (e: Event) => {
                e.preventDefault();
                this.LoggedOut();
            });
        }
    }

    protected LoggedOut = () => {

        this._cookieManager.deleteCookie();
        this.displayBookedItems();

        if (window) {
            window.location.href = '/';
        }
    }

    protected userAccessRedirect = () => {
        if (!this._cookieManager.value && window) {
            window.location.href = `${window.location.protocol}//${window.location.host}/#login`;
        } else {
            this._value = this._cookieManager.decryptedValue;
        }
    }

    public attachNavEvents = () => {

        this._navs = Array.from(document.querySelectorAll('.pages'));
        if (this._navs) {
            this._navs.forEach((list: HTMLUListElement) => {
                const _items = list.querySelectorAll('li');
                if (_items) {
                    _items.forEach((item: Element) => {
                        item.addEventListener('click', this.selectMunuItem);
                    });
                }
            });
        }
    }

    private selectMunuItem = (e: Event) => {
        const _target = <HTMLElement>e.currentTarget;

        if (_target) {
            const _parent = _target.parentNode;

            if (_parent) {
                const _item = _parent.querySelector('li.active');
                if (_item) {
                    _item.classList.remove('active');
                }
            }

            _target.classList.add('active');

        }

    }

    protected findUser = () => {
        if (this._value) {
            AccountService.findUser(this._value)
                .then((user) => {

                    this.decryptUserResponse(user.data[0]);
                    if (this.user) {
                        this.isAdmin = this.user.userType.display === 'admin';
                    }

                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    protected displayloggedItems = () => {

        if (!this._navs) {
            this._navs = Array.from(document.querySelectorAll('.pages'));
        }

        if (this._navs) {

            if (this._cookieManager.value) {
                this._navs.forEach((item: HTMLUListElement) => {
                    item.classList.remove('active-nav');

                    if (item.classList.contains('logged-in')) {
                        item.classList.add('active-nav');
                    }
                });
            } else {
                this._navs.forEach((item: HTMLUListElement) => {
                    item.classList.remove('active-nav');

                    if (item.classList.contains('default')) {
                        item.classList.add('active-nav');
                    }
                });
            }
        }

    }

    public displayBookedItems = () => {
        if (!this._book) {
            this._book = <HTMLDivElement>document.querySelector('.book');
            this._book.addEventListener('click', (e: Event) => {
                if (window) {
                    window.location.href = '/schedule';
                }
            });


            if (this._cookieManager.value && !this._book.classList.contains('show')) {
                this._book.classList.add('show');
            }

        } else {
            if (!this._cookieManager.value && this._book.classList.contains('show')) {
                this._book.classList.remove('show');
            }
        }

        this.displayloggedItems();


    }


}

export default Helper;