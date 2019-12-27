<template lang="pug">
  div.schedule-vue
    header-vue
    full-page.fullpage( :options="schedule.Option" id="fullpage" ref="fullpage")
      div.section(class="page schedule")
        div.slide(class="slide-calendar")
          ScheduleAppointmenVue
        div.slide(class="slide-appointment")
          Appointment
    footer-vue
</template>

<script lang="ts">
import Vue from "vue";
import ScheduleAppointmenVue from "../components/schedule-appointment.vue";
import Appointment from "../components/appointment.vue";
import Option from "../library/fpOption";

// div.schedule-appointment-vue

const _schedule = new Option([], ["#0b1222"]);

export default Vue.extend({
  name: "schedule-view",
  components: {
    ScheduleAppointmenVue,
    Appointment
  },
  data: () => {
    return {
      schedule: _schedule
    };
  }
});
</script>

<style lang="scss">
@import "./public/sass/schedule.scss";
@import "./public/sass/appointment.scss";
@import "./public/sass/slider.scss";
</style>
