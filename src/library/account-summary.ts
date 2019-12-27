import AccountService from '../microservices/account';
import CalendarService from '../microservices/calendar-event';
import { Helper } from './helper';
import { ICalEvents, ICalEventResponse, IAccountNote, IMeetingSearch, IUser, ICryptorUser } from '@/models/interfaces';
import { EventInput } from '@fullcalendar/core';
import { ReadyToSubmit } from './ready-to-submit';
import moment from 'moment';
import { MODE } from '@/models/model-enums';

export default class Summary extends Helper {

    public eventInputs: EventInput[] = [];
    public searchEventInputs: EventInput[] = [];
    public searchUsers: IUser[] = [];
    private activePanel?: HTMLDivElement;
    private readyToSubmit?: ReadyToSubmit;
    private meetingOverlay: HTMLDivElement;
    private meetingNoteOverlay: HTMLDivElement;
    private calTitle: HTMLDivElement;
    private calLocation: HTMLDivElement;
    private calDate: HTMLDivElement;
    private calClose: HTMLAnchorElement;
    private noteClose: HTMLAnchorElement;
    private calCancelApt: HTMLAnchorElement;
    private activeMeeting?: EventInput;
    private targetUser?: IUser;
    private mode: MODE;
    private impersonate: HTMLDivElement;
    private reset: HTMLAnchorElement;


    constructor() {
        super();

        this.mode = MODE.BASIC;
        this.meetingOverlay = <HTMLDivElement>document.querySelector('.meeting-view-popup');
        this.meetingNoteOverlay = <HTMLDivElement>document.querySelector('.meeting-note-popup');
        this.calTitle = <HTMLDivElement>this.meetingOverlay.querySelector('.cal-name');
        this.calLocation = <HTMLDivElement>this.meetingOverlay.querySelector('.cal-location');
        this.calDate = <HTMLDivElement>this.meetingOverlay.querySelector('.cal-date');
        this.calClose = <HTMLAnchorElement>this.meetingOverlay.querySelector('.close');
        this.calCancelApt = <HTMLAnchorElement>this.meetingOverlay.querySelector('.cancel-apt');
        this.impersonate = <HTMLDivElement>document.querySelector('.impersonate');
        this.reset = <HTMLAnchorElement>document.querySelector('.impersonate-reset');

        this.noteClose = <HTMLAnchorElement>this.meetingNoteOverlay.querySelector('.close');
        this.calClose.addEventListener('click', this.closePopup);
        this.noteClose.addEventListener('click', this.closePopup);
        this.reset.addEventListener('click', this.resetImpersonate);

        this.attachNavEvents();
        this.attachTabEvent();
        this.userAccessRedirect();
        this.findUser();

        this.scheduledEvents();

        this.displayloggedItems();
        this.logOut();
        this.setValues();
    }

    private setAsAdmin = () => {

        const _tabs = <HTMLDivElement>document.querySelector('.tabs');
        const _search = <HTMLInputElement>_tabs.querySelector('#search');
        const _label = <HTMLLabelElement>_tabs.querySelector('label[for=search]');
        const _panel = <HTMLDivElement>_tabs.querySelector('.search-panel');

        if (!this.Admin) {
            _tabs.removeChild(_search);
            _tabs.removeChild(_panel);
            _tabs.removeChild(_label)
        }

    }

    private closePopup = (e: Event) => {

        if (this.meetingOverlay.classList.contains('meeting-display')) {
            this.meetingOverlay.classList.remove('meeting-display');
            this.calTitle.innerText = '';
            this.calLocation.innerText = '';
            this.calDate.innerText = '';
            this.activeMeeting = undefined;
        }

        if (this.meetingNoteOverlay.classList.contains('meeting-display')) {
            this.meetingNoteOverlay.classList.remove('meeting-display');
        }
    }

    public resetImpersonate = (e: Event) => {
        this.mode = MODE.BASIC;
        this.setValues();
        this.setEventsResult()
        this.impersonate.innerText = '';
        this.reset.innerText = '';
    }

    private processAccount = (parent: HTMLLIElement) => {
        if (this.mode === MODE.SEARCH) {
            this.activeMeeting = this.searchEventInputs.find(x => x.id === parent.id);
        } else {
            this.activeMeeting = this.eventInputs.find(x => x.id === parent.id);
            this.accountNoteResult();
        }
    }

    private processSearch = (target: HTMLElement, parent: HTMLLIElement) => {
        this.activeMeeting = this.searchEventInputs.find(x => x.id === parent.id);
        const _email = parent.querySelector('.meeting-email');

        if (_email) {

            const _user = this.searchUsers.find(x => x.email === _email.textContent);
            if (_user) {
                this.targetUserAccountNoteResult(_user);
            }

        }
    }

    private openMeetingPopup = (e: Event) => {
        const _target = <HTMLElement>e.currentTarget;
        const _parent = <HTMLLIElement>_target.closest('li');
        const _activeTab = <HTMLElement>document.querySelector('.tab-input:checked');


        if (_target.classList.contains('view-meeting')) {

            if (!this.meetingOverlay.classList.contains('meeting-display')) {

                if (_activeTab.id.includes('account')) {
                    this.processAccount(_parent);
                }

                if (_activeTab.id.includes('search')) {
                    this.processSearch(_target, _parent);
                }

                this.setMeetingPopupValues();
                this.meetingOverlay.classList.add('meeting-display');
            }

        } else {
            if (!this.meetingNoteOverlay.classList.contains('meeting-display')) {
                // if (_activeTab.id.includes('account')) {
                //     this.activeMeeting = this.eventInputs.find(x => x.id === _parent.id);
                // }

                // if (_activeTab.id.includes('search')) {
                //     this.activeMeeting = this.searchEventInputs.find(x => x.id === _parent.id);
                // }

                // this.setMeetingPopupValues();
                this.meetingNoteOverlay.classList.add('meeting-display');


            }
        }


    }

    private setMeetingPopupValues = () => {

        if (this.activeMeeting) {
            this.calTitle.innerText = this.activeMeeting.title ? this.activeMeeting.title : 'Appointment';
            this.calLocation.innerText = this.activeMeeting.location ? this.activeMeeting.location : 'NA';
            this.calDate.innerText = this.activeMeeting.start ? moment(this.activeMeeting.start).format('llll') : 'NA';

            if (this.calCancelApt) {
                const _now = Date.now();
                const _start = Date.parse(<string>this.activeMeeting.start);

                if (_start <= _now) {
                    if (!this.calCancelApt.classList.contains('hide'))
                        this.calCancelApt.classList.add('hide');
                } else {
                    if (this.calCancelApt.classList.contains('hide'))
                        this.calCancelApt.classList.remove('hide');
                }


            }
        }
    }

    private checkValue = (criteria: string, max: number) => {
        if (criteria.charAt(0) !== "0" || criteria == "00") {
            var num = parseInt(criteria);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            criteria =
                num > parseInt(max.toString().charAt(0)) &&
                    num.toString().length == 1
                    ? "0" + num
                    : num.toString();
        }
        return criteria;
    }

    private findUsersByEmails = () => {

        const _result = {
            emails: Array.from(new Set(this.searchEventInputs.map((item) => item.extendedProps)))
        }
        AccountService.userByEmailList(<[]>_result.emails)
            .then((result) => {
                this.searchUsers = this.decryptUserResponses(result.data);
            })
            .catch((err) => {
                console.error(err);
            });

    }

    private meetingSearchScheduled = () => {

        const _user = <HTMLInputElement>document.querySelector('.results .users');
        const _scheduled = <HTMLInputElement>document.querySelector('.results .scheduled');

        const _start = <HTMLInputElement>document.querySelector('#start');
        const _end = <HTMLInputElement>document.querySelector('#end');


        const _data: IMeetingSearch = {
            start: _start.value,
            end: _end.value
        }


        CalendarService.search(_data)
            .then((result) => {

                const _events = result.data.events.all;
                const _eventInputs: EventInput[] = [];

                _events.forEach((item: ICalEventResponse) => {
                    const _item = this.decryptResponse(item);

                    if (this.user && _item.extendedProps) {

                        if (_item.extendedProps.toString() !== this.user.email)
                            _eventInputs.push(_item);

                    }

                });

                this.searchEventInputs = _eventInputs;
                this.findUsersByEmails();

                this.setSearchEventsResult();

                if (_scheduled.classList.contains('hide')) {
                    _scheduled.classList.remove('hide');
                    if (!_user.classList.contains('hide')) {
                        _user.classList.add('hide');
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });

    }

    private userSearch = () => {
        const _userList = <HTMLInputElement>document.querySelector('.results .users');
        const _scheduled = <HTMLInputElement>document.querySelector('.results .scheduled');

        const _userSearch = <HTMLInputElement>document.querySelector('#search-account');

        AccountService.searchUser(_userSearch.value.trim())
            .then((result) => {
                this.searchUsers = this.decryptUserResponses(result.data);

                if (this.user) {
                    const _id = this.user.id;
                    const _index = this.searchUsers.findIndex(x => x.id === _id);
                    this.searchUsers.splice(_index, 1);
                }

                this.setSearchUserResult();

                if (_userList.classList.contains('hide')) {
                    _userList.classList.remove('hide');
                    if (!_scheduled.classList.contains('hide')) {
                        _scheduled.classList.add('hide');
                    }
                }

            })
            .catch((err) => {
                console.error(err);
            });

    }

    private showPanel = () => {
        const _panels = document.querySelectorAll('.tab-input+.tab-label+.panel');
        const _panel = <HTMLDivElement>document.querySelector('.tab-input:checked+.tab-label+.panel');

        _panels.forEach((item) => {
            if (item === _panel) {

                if (_panel && _panel.classList.contains('hidden-panel')) {
                    _panel.classList.remove('hidden-panel');
                    _panel.classList.add('show-panel');
                }
            } else {
                if (item && item.classList.contains('show-panel')) {
                    item.classList.remove('show-panel');
                    item.classList.add('hidden-panel');
                }
            }

        })



        this.activePanel = _panel;
    }

    private hidePanel = () => {

        if (this.activePanel && this.activePanel.classList.contains('show-panel')) {
            this.activePanel.classList.remove('show-panel');
            this.activePanel.classList.add('hidden-panel');
        }

    }

    private tabEvent = (e: Event) => {
        if (e.currentTarget) {
            const _target = <HTMLElement>e.currentTarget;
            const _active = <HTMLDivElement>document.querySelector(`#${_target.id}+.tab-label+.panel`);

            if (_active) {
                this.hidePanel();
                this.showPanel();
            }
        }
    }

    private attachTabEvent = () => {
        const _tabs = document.querySelectorAll('input[name="tabs"]');

        if (_tabs) {
            _tabs.forEach((item) => {
                item.addEventListener('click', this.tabEvent);
            });
        }
    }

    private accountNoteResult = () => {
        const _result = <HTMLUListElement>document.querySelector('.account-note-list');
        const _sourceItem = <HTMLLIElement>_result.querySelector('li[data-cloned="false"]');
        const _clonedItems = _result.querySelectorAll('li[data-cloned="true"]');

        _clonedItems.forEach((item) => {
            _result.removeChild(item);
        });

        if (this.user && this.user.notes) {
            this.user.notes.forEach((item) => {
                const _clonedItem = <HTMLLIElement>_sourceItem.cloneNode(true);
                const _noteTitle = <HTMLDivElement>_clonedItem.querySelector('.note-title');
                const _note = <HTMLDivElement>_clonedItem.querySelector('.note');
                const _created = <HTMLDivElement>_clonedItem.querySelector('.created');

                _clonedItem.id = item.id ? item.id : '';
                _clonedItem.setAttribute('data-cloned', 'true');
                _noteTitle.innerText = item.title;
                _note.innerText = item.note;
                _created.innerText = item.createdAt ? item.createdAt : '';

                if (_clonedItem.classList.contains('hide')) {
                    _clonedItem.classList.remove('hide');
                }
                _result.append(_clonedItem);
            });

        }
    }

    private targetUserAccountNoteResult = (targetUser: IUser) => {
        const _result = <HTMLUListElement>document.querySelector('.account-note-list');
        const _sourceItem = <HTMLLIElement>_result.querySelector('li[data-cloned="false"]');
        const _clonedItems = _result.querySelectorAll('li[data-cloned="true"]');

        _clonedItems.forEach((item) => {
            _result.removeChild(item);
        });

        if (targetUser && targetUser.notes) {
            targetUser.notes.forEach((item) => {
                const _clonedItem = <HTMLLIElement>_sourceItem.cloneNode(true);
                const _noteTitle = <HTMLDivElement>_clonedItem.querySelector('.note-title');
                const _note = <HTMLDivElement>_clonedItem.querySelector('.note');
                const _created = <HTMLDivElement>_clonedItem.querySelector('.created');

                _clonedItem.id = item.id ? item.id : '';
                _clonedItem.setAttribute('data-cloned', 'true');

                _noteTitle.innerText = item.title;
                _note.innerText = item.note;
                _created.innerText = item.createdAt ? item.createdAt : '';

                if (_clonedItem.classList.contains('hide')) {
                    _clonedItem.classList.remove('hide');
                }
                _result.append(_clonedItem);
            });

        }
    }

    private setValues = () => {
        if (this.user) {
            this.setAsAdmin();
            const _client = <HTMLElement>document.querySelector('.client-name');
            const _today = <HTMLElement>document.querySelector('.today');
            const _first = <HTMLElement>document.querySelector('.firstname');
            const _last = <HTMLElement>document.querySelector('.lastname');
            const _email = <HTMLElement>document.querySelector('.email');
            const _username = <HTMLElement>document.querySelector('.username');
            const _scheduled = <HTMLDivElement>document.querySelector('.scheduled');

            _first.innerText = this.user.firstName ? this.user.firstName.toString() : '';
            _last.innerText = this.user.lastName.toString();
            _client.innerText = ` ${this.user.firstName} ${this.user.lastName}`;
            _today.innerText = new Date().toDateString();
            _email.innerText = this.user.email.toString();
            _username.innerText = this.user.username.toString();

            this.accountNoteResult();
            this.showPanel();

            if (_scheduled.classList.contains('hide')) {
                _scheduled.classList.remove('hide');
            }


        } else {
            setTimeout(this.setValues, 500);
        }

    }

    private setSearchUserResult = (): void => {
        const _userList = <HTMLUListElement>document.querySelector('.results .users .user-list');
        const _sourceItem = <HTMLLIElement>_userList.querySelector('li[data-cloned="false"]');
        const _clonedItems = _userList.querySelectorAll('li[data-cloned="true"]');

        _clonedItems.forEach((item) => {
            _userList.removeChild(item);
        });


        if (this.searchUsers) {
            this.searchUsers.forEach((item) => {
                const _clonedItem = <HTMLLIElement>_sourceItem.cloneNode(true);
                const _fullName = <HTMLDivElement>_clonedItem.querySelector('.full-name');
                const _email = <HTMLDivElement>_clonedItem.querySelector('.email');
                const _detail = <HTMLAnchorElement>_clonedItem.querySelector('.view-user');
                const _addNote = <HTMLAnchorElement>_clonedItem.querySelector('.add-note');

                _clonedItem.id = item.id ? item.id : '';
                _clonedItem.setAttribute('data-cloned', 'true');

                _fullName.innerText = `${item.firstName} ${item.lastName}`;
                _email.innerText = item.email;
                _detail.addEventListener('click', this.viewDetail);
                _addNote.addEventListener('click', this.openMeetingPopup);

                if (_clonedItem.classList.contains('hide')) {
                    _clonedItem.classList.remove('hide');
                }
                _userList.append(_clonedItem);

            });

        }

    }

    private setEventsResult = (): void => {
        const _scheduleList = <HTMLUListElement>document.querySelector('.schedule-list');
        const _clonedItems = _scheduleList.querySelectorAll('li[data-cloned="true"]');

        _clonedItems.forEach((item) => {
            _scheduleList.removeChild(item);
        });

        this.populateEvents(this.eventInputs, _scheduleList);

    }

    private setSearchEventsResult = (): void => {

        const _scheduleList = <HTMLUListElement>document.querySelector('.results .scheduled .schedule-list');
        const _clonedItems = _scheduleList.querySelectorAll('li[data-cloned="true"]');

        _clonedItems.forEach((item) => {
            _scheduleList.removeChild(item);
        });

        this.populateEvents(this.searchEventInputs, _scheduleList);
    }

    private populateEvents = (events: EventInput[], target: HTMLUListElement) => {

        const _sourceItem = <HTMLLIElement>target.querySelector('li[data-cloned="false"]');

        if (events) {
            events.forEach((item) => {
                const _email = document.createElement('div');
                _email.classList.add("meeting-email");

                const _clonedItem = <HTMLLIElement>_sourceItem.cloneNode(true);
                const _start = <HTMLDivElement>_clonedItem.querySelector('.start-date-time');
                const _location = <HTMLDivElement>_clonedItem.querySelector('.location');
                const _detail = <HTMLAnchorElement>_clonedItem.querySelector('.view-meeting');
                const _addNote = <HTMLAnchorElement>_clonedItem.querySelector('.view-note');

                _clonedItem.id = item.id ? item.id.toString() : '';
                _clonedItem.setAttribute('data-cloned', 'true');
                const _parent = <HTMLDivElement>_addNote.parentNode;

                if (!this.Admin) {
                    _parent.removeChild(_addNote);
                }

                if (item.start) {

                    const _startTime = Date.parse(item.start.toString());
                    const _nowTime = Date.now();

                    if (_startTime < _nowTime) {

                        if (this.Admin) {
                            _parent.removeChild(_addNote);
                        }

                        _detail.innerText = 'view-detail';

                    } else {
                        _addNote.addEventListener('click', this.openMeetingPopup);
                    }

                }


                _email.innerText = item.extendedProps ? item.extendedProps.toString() : '';
                _start.innerText = moment(item.start).format('llll');
                _location.innerText = item.location;
                _detail.addEventListener('click', this.openMeetingPopup);

                _start.append(_email);
                if (_clonedItem.classList.contains('hide')) {
                    _clonedItem.classList.remove('hide');
                }
                target.append(_clonedItem);

            });
        }

    }

    private setSearchAccountEventDetail = (): void => {

        const _scheduleList = <HTMLUListElement>document.querySelector('.scheduled .schedule-list');
        const _clonedItems = _scheduleList.querySelectorAll('li[data-cloned="true"]');

        _clonedItems.forEach((item) => {
            _scheduleList.removeChild(item);
        });

        this.populateEvents(this.searchEventInputs, _scheduleList);


    }

    private setTargetUserValues = (targetUser: IUser) => {

        const _client = <HTMLElement>document.querySelector('.client-name');
        const _today = <HTMLElement>document.querySelector('.today');
        const _first = <HTMLElement>document.querySelector('.firstname');
        const _last = <HTMLElement>document.querySelector('.lastname');
        const _email = <HTMLElement>document.querySelector('.email');
        const _username = <HTMLElement>document.querySelector('.username');
        const _scheduled = <HTMLDivElement>document.querySelector('.scheduled');

        _first.innerText = targetUser.firstName ? targetUser.firstName.toString() : '';
        _last.innerText = targetUser.lastName.toString();
        _client.innerText = ` ${targetUser.firstName} ${targetUser.lastName}`;
        _today.innerText = new Date().toDateString();
        _email.innerText = targetUser.email.toString();
        _username.innerText = targetUser.username.toString();

        this.targetUserAccountNoteResult(targetUser);
        this.showPanel();

        if (_scheduled.classList.contains('hide')) {
            _scheduled.classList.remove('hide');
        }


    }

    private scheduledEvents = (forSearch: boolean = false) => {
        if (this._value) {
            let _email = this.decryptIv(JSON.stringify(this._value.email));

            if (forSearch && this.targetUser) {
                _email = this.targetUser.email;
            }

            CalendarService.scheduled(_email)
                .then((result) => {

                    const _items: ICalEvents = result.data.events;
                    const _events: EventInput[] = [];

                    _items.targets.forEach((item: ICalEventResponse) => {
                        const _item = this.decryptResponse(item);
                        _events.push(_item);
                    });

                    if (!forSearch) {
                        this.eventInputs = _events;
                        this.setEventsResult();
                    }
                    else {
                        this.searchEventInputs = _events;
                        this.setSearchAccountEventDetail();
                    }

                })
                .catch((err) => {
                    console.error(err);
                });

        }
    }

    public viewDetail = (e: Event) => {

        const _target = <HTMLAnchorElement>e.currentTarget;
        const _targetUser = <HTMLLIElement>_target.closest('li');
        const _activeTab = <HTMLInputElement>document.querySelector('.tab-input:checked');
        this.mode = MODE.SEARCH;

        if (_activeTab.id.includes('search')) {
            const _accountTab = <HTMLInputElement>document.querySelector('#account.tab-input');

            if (_accountTab && this.searchUsers) {
                this.targetUser = this.searchUsers.find(x => x.id === _targetUser.id);
                this.scheduledEvents(true);

                if (this.targetUser && this.searchEventInputs) {
                    this.setTargetUserValues(this.targetUser);

                    _activeTab.checked = false;
                    _accountTab.checked = !_activeTab.checked;
                    this.impersonate.innerText = 'Impersonated : ' + this.targetUser.firstName + ' ' + this.targetUser.lastName;
                    this.reset.innerText = this.user
                        ? 'Reset account : ' + ` ${this.user.firstName} ${this.user.lastName}`
                        : ''

                    this.showPanel();
                }
            }
        }


    }

    public search = (e: Event) => {
        this.searchUsers = [];
        this.searchEventInputs = [];

        const _category = <HTMLInputElement>document.querySelector('.category:checked')
        const _userList = <HTMLInputElement>document.querySelector('.results .users');
        const _scheduled = <HTMLInputElement>document.querySelector('.results .scheduled');

        if (_category && _userList && _scheduled) {
            const _target = _category.id.includes('user') ? 'user' : 'meeting';

            if (_target === 'user') {
                this.userSearch();

            } else {
                this.meetingSearchScheduled();
            }
        }
    }

    public setDateInput = (e: Event) => {
        const _target = <HTMLInputElement>e.currentTarget;
        let _targetVal = _target.value;

        if (/\D\/$/.test(_targetVal)) _targetVal = _targetVal.substr(0, _targetVal.length - 3);
        var values = _targetVal.split("/").map(function (v) {
            return v.replace(/\D/g, "");
        });
        if (values[0]) values[0] = this.checkValue(values[0], 12);
        if (values[1]) values[1] = this.checkValue(values[1], 31);
        var output = values.map(function (v, i) {
            return v.length == 2 && i < 2 ? v + " / " : v;
        });
        _target.value = output.join("").substr(0, 14);

    }

    public maskDateInput = (e: Event) => {
        const _target = <HTMLInputElement>e.currentTarget;
        const _targetVal = _target.value;

        var values = _targetVal.split("/").map(function (v, i) {
            return v.replace(/\D/g, "");
        });
        var output = "";

        if (values.length == 3) {
            var year =
                values[2].length !== 4
                    ? parseInt(values[2]) + 2000
                    : parseInt(values[2]);
            var month = parseInt(values[0]) - 1;
            var day = parseInt(values[1]);
            var d = new Date(year, month, day);

            if (d) {
                _target.value = d.toString();
                var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
                output = dates
                    .map(function (val) {
                        const _val = val.toString();
                        return _val.length == 1 ? "0" + val : val;
                    })
                    .join(" / ");
            }
        }
        _target.value = output;
    }

    public clearSearch = (e: Event) => {
        console.debug('clear-search');

        const _search = <HTMLInputElement>document.querySelector('#search-account');
        const _start = <HTMLInputElement>document.querySelector('#start');
        const _end = <HTMLInputElement>document.querySelector('#end');
        const _user = <HTMLDivElement>document.querySelector('.results .users');
        const _scheduled = <HTMLDivElement>document.querySelector('.results .scheduled');

        const _userList = _user.querySelector('.user-list ');
        const _scheduleList = _scheduled.querySelector('.schedule-list');

        if (_userList) {

            const _cloned = _userList.querySelectorAll('li[data-cloned=true]');
            _cloned.forEach((item) => {
                _userList.removeChild(item);
            });

        }

        if (_scheduleList) {

            const _cloned = _scheduleList.querySelectorAll('li[data-cloned=true]');
            _cloned.forEach((item) => {
                _scheduleList.removeChild(item);
            });

        }


        this.mode = MODE.BASIC;

        if (_search && _start && _end) {
            _search.value = '';
            _start.value = '';
            _end.value = '';
            this.searchEventInputs = [];
            this.searchUsers = [];
            this.activeMeeting = undefined;

            if (!_user.classList.contains('hide'))
                _user.classList.add('hide');

            if (!_scheduled.classList.contains('hide'))
                _scheduled.classList.add('hide');

        }
    }

    public toggleCategory = (e: Event) => {
        const _target = <HTMLInputElement>e.currentTarget;
        const _user = <HTMLDivElement>document.querySelector('.search-account .user');
        const _meeting = <HTMLDivElement>document.querySelector('.search-account .meeting');
        const _userList = <HTMLDivElement>document.querySelector('.result .users');
        const _scheduleList = <HTMLDivElement>document.querySelector('.result .scheduled');

        if (_target.id.indexOf('meeting') >= 0) {
            if (_meeting.classList.contains('hide')) {
                _meeting.classList.remove('hide');
                _user.classList.add('hide');

                _meeting.setAttribute('checked', 'checked');
                _user.removeAttribute('checked');

                if (this.searchEventInputs.length) {
                    if (_scheduleList.classList.contains('hide')) {
                        _scheduleList.classList.remove('hide');
                        if (!_userList.classList.contains('hide')) {
                            _userList.classList.add('hide')
                        }
                    }
                }
            }
        } else {
            if (_user.classList.contains('hide')) {
                _user.classList.remove('hide');
                _meeting.classList.add('hide');

                _user.setAttribute('checked', 'ckecked');
                _meeting.removeAttribute('checked');

                if (this.searchUsers.length) {
                    if (_userList.classList.contains('hide')) {
                        _userList.classList.remove('hide');
                        if (!_scheduleList.classList.contains('hide')) {
                            _scheduleList.classList.add('hide')
                        }
                    }
                }
            }
        }
    }

    public get today(): string {
        const _date = new Date();
        return _date.toDateString();
    }

    public get fullname(): string | undefined {

        if (this._value)
            return this.decryptIv(JSON.stringify(this._value.fullname));
        else
            this.userAccessRedirect();
    }

    public validateNote = (e: KeyboardEvent) => {

        const _title = <HTMLInputElement>document.querySelector('.meeting-title');
        const _note = <HTMLDivElement>document.querySelector('#meeting-note');
        const _submitter = <HTMLButtonElement>document.querySelector('.submitter');

        this.readyToSubmit = new ReadyToSubmit(<Element>_submitter, 1)

        if (_title.value.trim().length && _note.innerText.trim().length && this._value) {
            this.readyToSubmit.passed();
        } else {
            this.readyToSubmit.muted();
        }
    }

    public createNote = (e: Event) => {

        const _title = <HTMLInputElement>document.querySelector('.meeting-title');
        const _note = <HTMLDivElement>document.querySelector('#meeting-note');
        const _submitter = <HTMLButtonElement>e.currentTarget;

        if (_submitter) {
            const _originalText = _submitter.textContent ? _submitter.textContent : '';
            this.readyToSubmit = new ReadyToSubmit(<Element>_submitter, 1)

            if (this._value && _title.value.trim().length && _note.innerText.trim().length) {
                const _AccountNote: IAccountNote = {
                    title: _title.value.trim(),
                    note: _note.innerText.trim(),
                    userId: this.decryptIv(JSON.stringify(this._value.id))
                };

                AccountService.createAccountNote(_AccountNote)
                    .then((result) => {
                        console.debug('result', result);
                    })
                    .catch((err) => {
                        console.error(err);
                    });

            } else {

                _submitter.textContent = 'Title and note is required'
                this.readyToSubmit.notifySubmitter(<Element>_submitter, _originalText);

            }
        }


    }

}

