import moment from 'moment';
import { range } from '../config/config.json';


export class Slider {
    // private rangeSlider: HTMLInputElement;
    private rangeBullet: HTMLElement;
    protected target?: HTMLInputElement;
    private availabilty: HTMLSpanElement;
    private busy: number[];
    private selectedDate?: number;
    protected submitter?: HTMLButtonElement;
    private min: number;
    private max: number;
    private sliderValue: number;
    private increase: HTMLButtonElement;
    private decrease: HTMLButtonElement;
    private validator?: () => void;

    constructor() {

        this.increase = <HTMLButtonElement>document.querySelector('.increase');
        this.decrease = <HTMLButtonElement>document.querySelector('.decrease');
        this.rangeBullet = <HTMLElement>document.querySelector('#bullet');
        this.availabilty = <HTMLSpanElement>document.querySelector('.availability');
        this.min = 10;
        this.max = 24;
        this.sliderValue = this.min;

        if (this.increase && this.decrease) {

            this.increase.addEventListener('click', this.increaseApptTime);
            this.decrease.addEventListener('click', this.decreaseApptTime);
        }

        this.busy = [];
    }

    private increaseApptTime = (event: Event) => {
        this.sliderValue = this.sliderValue == this.max - 1
            ? this.sliderValue = this.sliderValue
            : this.sliderValue += 1;
        this.showSliderValue();

    }

    private decreaseApptTime = (event: Event) => {
        this.sliderValue = this.sliderValue == this.min
            ? this.sliderValue = this.sliderValue
            : this.sliderValue -= 1;
        this.showSliderValue();
    }

    protected setRangeSliderValue = (value: Date) => {
        const _targetVal = value.getHours();
        this.sliderValue = _targetVal;
        this.rangeBullet.innerText = moment(_targetVal, ['HH:MM']).format('hh:mm a');
        this.cancelState();
    }

    protected reset = () => {
        this.selectedDate = undefined;
        this.busy = [];
    }

    protected setFirstOpenAppointment = (selected: number, reserved: number[], validate: () => void) => {
        const _todate = Date.parse(new Date().toDateString());  //moment(moment(new Date().toISOString())).valueOf();
        this.selectedDate = selected;
        this.busy = reserved;
        this.validator = validate;

        const recursiveNext = (next: number): number => {
            const _current = reserved.find(x => new Date(x).getHours() == next)

            if (_current && new Date(_current).getDate() === new Date(selected).getDate()
                && new Date(_current).getHours() == next) {
                return recursiveNext(next + 1);
            }

            if (this.busy.indexOf(next) >= 0) {
                return recursiveNext(next + 1);
            }

            return next;
        }

        let _currentHour = new Date().getHours() + 1; //moment(new Date()).format('HH');
        let _nextAppt = _currentHour < range.min ? range.min : _currentHour;

        if (selected > _todate) {
            _currentHour = new Date(selected).getHours() + 1; //moment(new Date()).format('HH');
            _nextAppt = _currentHour < range.min ? range.min : _currentHour;
        }
        this.sliderValue = recursiveNext(_nextAppt);
        this.showSliderValue();

    }

    private cancelState = () => {
        // this.rangeSlider.classList.add('reserved');
        this.rangeBullet.classList.add('reserved');


        if (this.submitter) {
            this.submitter.classList.replace('bg-muted', 'bg-passed');
            this.submitter.textContent = this.submitter.getAttribute('data-label-cancel');
        }
    }

    private reserved = () => {

        if (this.validator)
            this.validator();

        if (!this.rangeBullet.classList.contains('reserved')) {
            this.rangeBullet.classList.add('reserved');
            this.availabilty.classList.add('reserved');
            this.availabilty.textContent = 'reserved';

            if (this.submitter) {
                this.submitter.classList.replace('bg-passed', 'bg-muted');
                this.submitter.textContent = this.submitter.getAttribute('data-label-reserved');
            }

            this.setSelectedTime();
        }
    }

    private setSelectedTime = (seletedTime?: string) => {
        const _dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

        if (this.target) {

            const selectedDate = this.target.value.split(' @');
            if (seletedTime) {
                this.target.value = new Date(selectedDate[0]).toLocaleDateString('en-US', _dateOptions);
            } else {
                this.target.value = selectedDate[0];
            }
        }
    }

    private available = (time: string) => {

        this.rangeBullet.classList.remove('reserved');
        this.availabilty.classList.remove('reserved');
        this.availabilty.textContent = 'available';


        if (this.submitter) {
            this.submitter.classList.replace('bg-muted', 'bg-passed');
            this.submitter.textContent = this.submitter.getAttribute('data-label-create');

        }
        this.setSelectedTime(time);
    }

    protected showSliderValue = () => {

        const _targetVal = this.sliderValue;
        const _val = moment(_targetVal, ['HH:MM']).format('hh:mm a');
        const _reserved = this.busy.find(x => new Date(x).getHours() == _targetVal)

        if (this.selectedDate) {

            const _todate = Date.parse(new Date().toDateString());
            this.rangeBullet.innerHTML = _val;
            let _compareHour = new Date().getHours() < this.min ? this.min : new Date().getHours();

            if (this.selectedDate === _todate) {
                if (_targetVal <= _compareHour) {
                    this.reserved();
                } else {
                    this.available(_val);
                }
            }


            if (_reserved) {
                this.reserved();
            } else {
                this.available(_val);
            }

        }
    }
}

export default Slider;