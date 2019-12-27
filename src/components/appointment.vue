<template lang="pug">
	div.appointment
		div.appointment-background
		div.appointment-header
			div.title
				div.heading
					p.greet(ref="greet") Appointment
					p.greet-sub schedule an appointment!
		div.appointment-body
			div.content
				form(id="appointment-form")
					div.appt-title
						input.form-control(type="text"  required
							placeholder="Title" title="Title" disabled
							id="title" value="") 
					div.text-area(class="form-control" contenteditable="true"
						id="comment" data-text="comment")
					div.appt-location
						input.form-control(type="text"  required
							placeholder="Location" title="Location" 
							id="location" value="") 
					div.time-duration(class="split")
						div.split-half-left
							input.form-control(type="text"  disabled 
							placeholder="date" title="Date"  
							id="selectDate" ) 
						div.split-half-right
							input.form-control(type="text"   required
							placeholder="click to show durations" title="duration" 
							id="duration" list="durations" value="60")
							datalist(id="durations" )
								option(value="45") 45 minutes
								option(value="60") 60 minutes
								option(value="90") 90 minutes
					div.controller
						Slider.slider
						div.form-group(class="submit")
							button.form-control(class="submitter bg-muted" type="submit" id="create-meeting" data-label-reserved="Reserved" data-label-cancel="Cancel Appointment" data-label-create="Schedule Appointment") 
						div.appt-popup(id="appt-popup" ref="appt-popup")
							div.popup
								div.title Appointment Confirmation
								div.body
									div.pop-status(class="info status")
									div.pop-name(class="info") 
									div.pop-location(class="info") 
									div.pop-date(class="info")
									div.pop-duration(class="info")
									div.pop-comment(class="info") 
									div.split
										div.split-half-left
											a.heading(class="link create" href="#") Create
										div.split-half-right(class="link-last")
											a.heading(class="link cancel" href="#") Reset 
		div.appointment-footer
</template>

<script lang="ts">
import Vue from "vue";
import Slider from "./slider.vue";

export default Vue.extend({
  name: "appointment",
  components: {
    Slider
  }
});
</script>