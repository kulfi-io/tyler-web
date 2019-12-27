import Axios, { AxiosPromise } from 'axios';
import BaseService from './base-service';
import { IEndpoint, ICalEvent, ICryptorCalEvent, IEventTargets, IEventDateTarget, IEventEmailTarget, ICryptoData, IMeetingSearch } from '../models/interfaces';

export class CalendarEventService extends BaseService {

    private eventEndpoint: string;
    private eventsByDateEndpoint: string;
    private eventsByUserEndpoint: string;
    private eventsByTargetsEndpoint: string;
    private scheduledEventsEndpoint: string;
    private eventSearch: string;

    constructor() {
        super();
        const _events = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'events');

        const _eventsByDate = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'events-by-date');

        const _eventsByUser = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'events-by-user');

        const _eventsByTargets = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'events-by-targets');

        const _event = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'event');

        const _scheduled = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'scheduled-events');

        const _search = <IEndpoint>this.event.endpoints
            .find(x => x.name === 'event-search');



        this.eventEndpoint = `${this.eventBaseUrl}/${_event.endpoint}`;
        this.eventsByDateEndpoint = `${this.eventBaseUrl}/${_eventsByDate.endpoint}`;
        this.eventsByUserEndpoint = `${this.eventBaseUrl}/${_eventsByUser.endpoint}`;
        this.eventsByTargetsEndpoint = `${this.eventBaseUrl}/${_eventsByTargets.endpoint}`;
        this.scheduledEventsEndpoint = `${this.eventBaseUrl}/${_scheduled.endpoint}`;
        this.eventSearch = `${this.eventBaseUrl}/${_search.endpoint}`;


    }

    eventsByTargets = (data: IEventTargets) => {
        const _date = this.encrypt(data.date);
        const _email = this.encrypt(data.email);
        const _url = `${this.eventsByTargetsEndpoint}/${_date}/${_email}`;

        return Axios.get(_url, { headers: this.header });
    }

    eventsByDate = (data: IEventDateTarget) => {
        const _date = this.encrypt(data.date);
        const _url = `${this.eventsByDateEndpoint}/${_date}`;

        return Axios.get(_url, { headers: this.header });
    }

    eventsByEmail = (data: IEventEmailTarget) => {
        const _email = this.encrypt(data.email);
        const _url = `${this.eventsByUserEndpoint}/${_email}`;

        return Axios.get(_url, { headers: this.header });
    }

    // events(): AxiosPromise {
    //     return Axios.get(this.eventsEndpoint, {headers: this.header});
    // }

    search = (data: IMeetingSearch) => {

        console.debug('data', data);

        const _start = this.encrypt(data.start);
        const _end = this.encrypt(data.end);

        const _url = `${this.eventSearch}/${_start}/${_end}`;
        return Axios.get(_url, { headers: this.header });
    }

    scheduled = (data: string) => {
        const _email = this.encrypt(data);
        const _url = `${this.scheduledEventsEndpoint}/${_email}`;

        return Axios.get(_url, { headers: this.header });
    }

    create(data: ICalEvent): AxiosPromise {

        let _data: ICryptorCalEvent | ICalEvent;

        if (this.isProd) {
            _data = {
                end: this.encryptIv(data.end),
                location: this.encryptIv(data.location),
                start: this.encryptIv(data.start),
                title: this.encryptIv(data.title),
                email: this.encryptIv(data.email),
                comment: data.comment ? this.encryptIv(data.comment) : undefined
            }
        } else {
            _data = data;
        }

        return Axios.post(this.eventEndpoint, _data, { headers: this.header });
    }

    delete(id: string): AxiosPromise {
        const _endpoint = `${this.eventEndpoint}/${id}`;

        return Axios.delete(_endpoint, { headers: this.header });
    }
}

export default new CalendarEventService();