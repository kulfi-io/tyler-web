import { View, EventApi } from '@fullcalendar/core';

export interface IMicroService {
    name: string;
    scheme: string;
    baseEndpoint: string;
    devBaseEndpoint: string;
    port: number;
    token: string;
    endpoints: IEndpoint[];
}

export interface ISquare {
    name: 'Tyler-Web',
    id: 'sandbox-sq0idb--8q1cUPSOcYUQwmh9Gx_NA',
    token: 'EAAAENgeLLsfnFnSf-dAcaeTtvHu2hJk7KR5gm1BtMFtYIVp_HrKD0Hx3jIbLvX6'
}

export interface IEndpoint {
    name: string;
    endpoint: string;
}

export interface IAppointmentMessage {
    title: string;
    location: string;
}

export interface IMailerUser {
    userId?: string;
    email?: string;
    username?: string;
    token?: string;
}

export interface INote {
    email: string;
    firstname: string;
    lastname: string;
    content: string;
}

export interface ICryptorNote {
    email: ICryptoData;
    firstname: ICryptoData;
    lastname: ICryptoData;
    content: ICryptoData;
}

export interface ICookie {
    secret: string;
    name: string;
    expiration: IExpiration;
}

export interface IExpiration {
    duration: IDuration[];
    selected: string;
}

export interface IDuration {
    name: string;
    value: string;
}

export interface IResetAccount {
    email: string;
}

export interface ICryptorResetAccount {
    email: ICryptoData;
}

export interface IResetRequest extends IResetAccount {
    firstname: string,
    lastname: string,
    username: string,
    token: string;
}

export interface IReset extends IResetAccount {
    username: string;
    token: string;
    password: string;
}

export interface ICryptorReset extends ICryptorResetAccount {
    username: ICryptoData;
    token: string;
    password: ICryptoData;
}

export interface IVerifyLogin {
    username: string,
    password: string,
    token: string
}

export interface ICryptorVerifyLogin {
    username: ICryptoData,
    password: ICryptoData,
    token: string
}

export interface ILogin {
    username: string;
    password: string;
}

export interface ICrytorLogin {
    username: ICryptoData;
    password: ICryptoData;
}

export interface IRegisterUser {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    username: string;
    type: string;
    active?: boolean
}

export interface ICryptorRegisterUser {
    id?: ICryptoData;
    email: ICryptoData;
    firstname: ICryptoData;
    lastname: ICryptoData;
    password: ICryptoData;
    username: ICryptoData;
    type: ICryptoData;
    active?: ICryptoData;
}

export interface IUserType {
    id: string;
    display: string;
    description: string;
    active: boolean | string;
}

export interface ICryptorUserType {
    id: ICryptoData;
    display: ICryptoData;
    description: ICryptoData;
    active: ICryptoData;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: IUserType;
    active: boolean;
    tokenValidated: boolean;
    validationToken: string;
    notes?: IAccountNote[];

}



export interface ICryptorUser {
    id: ICryptoData;
    username: ICryptoData;
    email: ICryptoData;
    firstName: ICryptoData;
    lastName: ICryptoData;
    userType: ICryptorUserType;
    active: ICryptoData;
    tokenValidated: ICryptoData;
    validationToken: ICryptoData;
    notes?: ICryptorAccountNote[];
}

export interface ICookieUser {
    id: ICryptoData;
    fullname: ICryptoData
    first: ICryptoData;
    last: ICryptoData;
    email: ICryptoData;
}

export interface ICalendarUser {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface IMeetingNote {
    title: string;
    display: string;
    detail: string;
    id: string;
}

export interface ICryptoAccountNote {
    id: string
    title: string
    note: string
    created: Date;
}


export interface ICryptoMeetingNote {
    title: ICryptoData;
    display: ICryptoData;
    detail: ICryptoData;
    id: ICryptoData;
}

export interface IMeetingNoteUser extends IMeetingNote {
    user: ICalendarEvent
}

export interface ICalendarEvent {
    id: string;
    start: Date;
    end: Date;
    title: string;
    description: string;
    meetingNotes: IMeetingNote[],
    user: ICalendarUser
}

export interface IEventRange {
    start: Date | string;
    end: Date | string;
}

export interface ICalTime {
    dateTime: string | ICryptoData;
    timeZone: string | ICryptoData;
}

export interface IAttendee {
    email: string | ICryptoData;
    responseStatus?: string | ICryptoData;
}

export interface ICalEventResponse {
    id?: string | ICryptoData;
    summary?: string | ICryptoData;
    location?: string | ICryptoData;
    description?: string | ICryptoData;
    start?: ICalTime;
    end?: ICalTime;
    attendees?: IAttendee[]
}

export interface ICalEvents {
    all: ICalEventResponse[],
    targets: ICalEventResponse[]
}


export interface IDayRenderArg {
    view: View;
    date: Date;
    allDay?: boolean;
    el: HTMLElement;
}

export interface IDayClickArgs {
    date: Date;
    dateStr: string;
    allDay: boolean;
    resource?: any;
    dayEl: HTMLElement;
    jsEvent: MouseEvent;
    view: View;
}

export interface ICalEvent {
    start: string;
    end: string;
    title: string;
    location: string;
    email: string;
    comment?: string;
}

export interface ICryptorCalEvent {
    start: ICryptoData;
    end: ICryptoData;
    title: ICryptoData;
    location: ICryptoData;
    email: ICryptoData;
    comment?: ICryptoData;
}

export interface IDayEventArgs {
    isMirror: boolean;
    isStart: boolean;
    isEnd: boolean;
    event: EventApi;
    el: HTMLElement;
    view: View;
}

export interface IEventSelected {
    start: string;
}

export interface IEventArgs {
    el: HTMLElement;
    event: EventApi;
    jsEvent: MouseEvent;
    view: View;
}



export interface IMeetingSearch {
    start: string;
    end: string;
}

export interface IAccountNote {
    title: string;
    note: string;
    id?: string;
    userId: string;
    createdAt?: string;
}

export interface ICryptorAccountNote {
    title: ICryptoData;
    note: ICryptoData;
    id?: ICryptoData;
    userId: ICryptoData;
    createdAt?: string;
}

export interface ICryptorEmails {
    emails: ICryptoData[] | string[];
}

export interface ICryptoData {
    iv: string,
    encryptedData: string
}


export interface IEventTargets extends IEventDateTarget, IEventEmailTarget {

}

export interface IEventDateTarget {
    date: Date;
}

export interface IEventEmailTarget {
    email: string;
}

export interface IValidKey {
    name: string;
    relative: string,
    value: boolean;
}

