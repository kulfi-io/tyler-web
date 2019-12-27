<template lang="pug">
  div.slider
    div.container
      div.range-slider
          div.info
            span Use arrows to change time.
          div.split
            div.split-third(class="increase") 
              font-awesome-icon.fa(:icon="iconUp" aria-hidden="true")
              div.open first appt. 10:00 am
            div.split-third
              div.bullet(id="bullet" ) 10:00 am
              div.availability Available
            div.split-third-end(class="decrease")
              font-awesome-icon.fa(:icon="iconDown" aria-hidden="true")
              div.close last appt. 11:00 pm
</template>

<script lang="ts">
import Vue from "vue";
import { IconDefinition, faArrowUp, faArrowDown } from '@fortawesome/fontawesome-free-solid';


export default Vue.extend({
  name: "slider-two",
  computed: {
    iconUp: function(): IconDefinition {
        return faArrowUp;
      },
      iconDown: function(): IconDefinition {
        return faArrowDown;
      }
  }
});
</script>