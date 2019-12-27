import Slider from './slider';
import { ICalEvent } from '../models/interfaces';
import CalendarEventService from '../microservices/calendar-event';
import { EventInput } from '@fullcalendar/core';


export class Appointment extends Slider {
	private body: HTMLDivElement;
	public title: HTMLInputElement;
	public location: HTMLInputElement;
	private comment: HTMLDivElement;
	public selectDate: HTMLInputElement;
	private popOverlay: HTMLDivElement;
	private popName: HTMLDivElement;
	private popLocation: HTMLDivElement;
	private popDate: HTMLDivElement;
	private popReset: HTMLAnchorElement;
	private popDuration: HTMLDivElement;
	private popComment: HTMLDivElement;
	private popCreate: HTMLAnchorElement;
	private duration: HTMLInputElement;
	private popStatus: HTMLDivElement;
	private fpData?: Record<string, any>;
	private bullet: HTMLDivElement;
	public email?: string;
	private refreshCal?: () => void;


	constructor() {
		super();

		this.body = <HTMLDivElement>document.querySelector('.appointment-body');
		this.title = <HTMLInputElement>this.body.querySelector('#title');
		this.location = <HTMLInputElement>this.body.querySelector('#location');
		this.selectDate = <HTMLInputElement>this.body.querySelector('#selectDate');
		this.comment = <HTMLDivElement>this.body.querySelector('#comment');
		this.target = this.selectDate;
		this.duration = <HTMLInputElement>this.body.querySelector('#duration');
		this.submitter = <HTMLButtonElement>this.body.querySelector('.submitter');
		this.bullet = <HTMLDivElement>this.body.querySelector('#bullet');
		
		this.popOverlay = <HTMLDivElement>this.body.querySelector('.appt-popup');
		this.popName = <HTMLDivElement>this.popOverlay.querySelector('.pop-name');
		this.popLocation = <HTMLDivElement>this.popOverlay.querySelector('.pop-location');
		this.popDate = <HTMLDivElement>this.popOverlay.querySelector('.pop-date')
		this.popDuration = <HTMLDivElement>this.popOverlay.querySelector('.pop-duration');
		this.popComment = <HTMLDivElement>this.popOverlay.querySelector('.pop-comment');
		this.popReset = <HTMLAnchorElement>this.popOverlay.querySelector('.cancel');
		this.popCreate = <HTMLAnchorElement>this.popOverlay.querySelector('.create');
		this.popStatus = <HTMLDivElement>this.popOverlay.querySelector('.pop-status');
		
		this.submitter.addEventListener('click', this.confirmAppointment);
		this.popReset.addEventListener('click', this.resetAppointment);
		this.popCreate.addEventListener('click', this.createAppointment)	
		this.title.addEventListener('keyup', this.readyToConfirm);
		this.location.addEventListener('keyup', this.readyToConfirm);
		this.selectDate.addEventListener('keyup', this.readyToConfirm);
		this.title.addEventListener('paste', this.readyToConfirm);
		this.location.addEventListener('paste', this.readyToConfirm);
		this.selectDate.addEventListener('paste', this.readyToConfirm);
		
		this.duration.addEventListener('keydown', this.preventDurationKeyEntry);
		this.duration.addEventListener('keyup', this.readyToConfirm);
		this.duration.addEventListener('click', this.clear);
		
	}

	private clear = (event: Event) => {
		this.duration.value = '';
	}

	public findFirstAppointment = (reserved: number[], target: string, fpData: Record<string, any>, refresh: () => void) => {
		this.email = target;
		this.fpData = fpData;
		this.refreshCal = refresh;
		const _selected = Date.parse(this.selectDate.value);
		this.setFirstOpenAppointment(_selected, reserved, this.validated);
		this.validated();
		
	}

	public cancelAppointment = (event: EventInput) => {
		
		
	}

	private preventDurationKeyEntry = (e: KeyboardEvent) => {
		const _keys: number[] = [46, 40, 8];
		

		if(_keys.indexOf(e.keyCode) < 0) {
			e.preventDefault();
		} 
	}

	private resetAppointment = (e: Event) => {
		this.popName.innerText = '';
		this.popLocation.innerText = '';
		this.popDate.innerText = '';
		this.popDuration.innerText = ''
		this.popComment.innerHTML = ''
		this.popStatus.innerText = '';
		this.title.value = '';
		this.location.value = '';
		this.selectDate.value = '';
		this.duration.value = '';
		this.comment.innerText = '';
		this.popOverlay.classList.remove('appt-popup-display');
		this.email = undefined;
		this.reset();

		if(this.submitter)
			this.submitter.classList.replace('bg-passed', 'bg-muted');

		
		if(this.fpData && this.refreshCal) {
			this.fpData.api.moveSlideLeft();
			this.refreshCal();
		}

		this.popCreate.removeAttribute('display');
	}

	private validated = () => {
		if(this.title.value.trim().length > 0 
		&& this.location.value.trim().length > 0 
			&& this.selectDate.value.length > 0
			&& this.duration.value.trim().length > 0)  {

				if(this.submitter) {
					this.submitter.classList.replace('bg-muted', 'bg-passed');
					this.submitter.textContent = this.submitter.getAttribute('data-label-create');
				}


		} else {

			if(this.submitter) {
				this.submitter.classList.replace('bg-passed', 'bg-muted');
				this.submitter.textContent = this.submitter.getAttribute('data-label-reserved');
			}
		}

		this.title.value.trim().length == 0 
			? this.title.classList.add('validation-error')
			: this.title.classList.remove('validation-error')
		this.location.value.trim().length == 0
			? this.location.classList.add('validation-error')
			: this.location.classList.remove('validation-error');
		this.duration.value.trim().length == 0
			? this.duration.classList.add('validation-error')
			: this.duration.classList.remove('validation-error')

		
	}

	private readyToConfirm = (e: Event) => {
		this.validated();
	}

	private confirmAppointment = (e: Event) => {

		e.preventDefault();

		if(this.submitter && this.submitter.classList.contains('bg-passed')) {
			this.popName.innerText = this.title.value;
			this.popLocation.innerText = this.location.value;
			this.popDate.innerText = this.selectDate.value;
			this.popDuration.innerText = this.duration.value + ' minutes';
			this.popComment.innerHTML = this.comment.innerText;
			this.popStatus.innerText = 'create appointment request...';
			this.popOverlay.classList.add('appt-popup-display');
		} else {

			if(!this.duration.value)
				this.duration.classList.add('validation-error');
			if(!this.location.value)
				this.location.classList.add('validation-error')	
			
			return false;
		}
	}

	private createAppointment = (e: Event) => {
		const _selectedDate = new Date(this.selectDate.value + " "+ this.bullet.innerText)
		const _duration = parseInt(this.duration.value);
		let _end =  new Date(_selectedDate);
		_end.setMinutes(_selectedDate.getMinutes() + _duration);

		if(this.email) {

			const _data: ICalEvent = {
				start: _selectedDate.toISOString(),
				end: _end.toISOString(),
				title: this.title.value,
				location: this.location.value,
				email: this.email,
				comment: this.comment.innerText
			}
	

			this.popStatus.innerText = 'creating appointment...';
			this.popCreate.setAttribute('display', 'none');
			CalendarEventService.create(_data)
			.then((result) => {
				this.popStatus.innerText = 'appointment created!';
				console.debug('result', result);
	
			})
			.catch((err) => {
				this.popStatus.innerText = 'Error occured, please notify customer service';
				console.debug(err.response.data.message);
			});

		} else {
			this.popStatus.innerText = 'Invalid email';
		}

	}

}