<template lang="pug">
    div.scheduled(class="hide") Appointments
        ul.schedule-list
            li.hide(data-cloned="false")
                div.split
                    div.split-third(class="start-date-time" ) 
                    div.split-third(class="location") 
                    div.split-third-end(class="action split")
                        a.view(class="link view-meeting" href="#" ) view-cancel
                        a.view(class="link view-note" href="#" ) add-note
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "scheduled-events"
});
</script>