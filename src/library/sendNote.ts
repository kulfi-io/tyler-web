import Helper from './helper';

export class SendNote extends Helper {
    private email: HTMLDivElement;
    private firstname: HTMLDivElement;
    private lastname: HTMLDivElement;
    private subject: HTMLInputElement;

    constructor() {

        super();
        this.userAccessRedirect();
        this.attachNavEvents();
        this.displayloggedItems();
        this.logOut();


        this.email = <HTMLDivElement>document.querySelector('.email');
        this.firstname = <HTMLDivElement>document.querySelector('.first');
        this.lastname = <HTMLDivElement>document.querySelector('.last');
        this.subject = <HTMLInputElement>document.querySelector('.subject');
        this.populate();

    }

    private populate() {

        if(this._value) {

            const _email = this.decrypt(this._value.email);
            const _first = this.decrypt(this._value.first);
            const _last = this.decrypt(this._value.last);
            const _full = this.decrypt(this._value.fullname);

            if(_email && _first && _last && _full) {

                this.email.innerText = _email;
                this.firstname.innerText = _first;
                this.lastname.innerText = _last;
                this.subject.value = `Communication from ${ _full }`

            }
        }
    }
}

export default SendNote;