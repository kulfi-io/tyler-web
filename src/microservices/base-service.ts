import Config from '../config/config.json';
import { cryptor } from '../library/cryptor';
import { IMicroService } from '../models/interfaces';

export default class BaseService extends cryptor {
    protected header: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; };

    protected account: IMicroService;
    protected accountBaseUrl: string;

    protected mailer: IMicroService;
    protected mailerBaseUrl: string;

    protected event: IMicroService;
    protected eventBaseUrl: string;

    constructor() {
        super();
        this.header = Config.header

        // API
        this.account = <IMicroService>Config.microservices.services.find(x => x.name === 'account');
        this.mailer = <IMicroService>Config.microservices.services.find(x => x.name === 'mailer');
        this.event = <IMicroService>Config.microservices.services.find(x => x.name === 'calendar');

        // ACCOUNT
        if (!Config.microservices.overrideProd) {
            this.accountBaseUrl = `${this.account.scheme}://${this.account.baseEndpoint}`;
        } else {
            this.accountBaseUrl = `http://${this.account.devBaseEndpoint}:${this.account.port}`;
        }

        // MAILER
        if (!Config.microservices.overrideProd) {
            this.mailerBaseUrl = `${this.mailer.scheme}://${this.mailer.baseEndpoint}`;
        } else {
            this.mailerBaseUrl = `http://${this.mailer.devBaseEndpoint}:${this.mailer.port}`;
        }

        // CALENDAR
        if (!Config.microservices.overrideProd) {
            this.eventBaseUrl = `${this.event.scheme}://${this.event.baseEndpoint}`;
        } else {
            this.eventBaseUrl = `http://${this.event.devBaseEndpoint}:${this.event.port}`;
        }

    }
}