<template lang="pug">
  div.search-account
    div.search-category
      input.category(name="cat" type="radio" id="cat-user" checked="checked")
      label.cat-label(for="act-user") Users
      input.category(name="cat" type="radio" id="cat-meeting" )
      label.cat-label(for="act-meeting") Meetings
    div.input-group
      div.input-group-prepend  
        span.input-group-text(class='text-muted')  
          font-awesome-icon.fa( class="fa-earse" :icon="iconErase" aria-hidden="true")
        div.user()
          input.form-control( type="text" id="search-account" 
          :title="title" :placeholder="placeholder" 
          required )
        div.meeting(class="split hide" )
          div.split-half-left
            input.form-control(type="text" id="start" placeholder="start date mm/dd/yyyy" )
          div.split-half-right
            input.form-control(type="text" id="end" placeholder="end date mm/dd/yyyy"  )
      div.input-group-prepend
        span.input-group-text(class='text-muted')
          font-awesome-icon.fa( class="fa-search" :icon="iconSearch" aria-hidden="true")
    div.results
      UserResult()
      ScheduleEvents()
      
</template>

<script lang="ts">
import Vue from "vue";
import UserResult from "./user-result.vue";
import ScheduleEvents from "./scheduled-event.vue";

import {
  IconDefinition,
  faSearch,
  faEraser
} from "@fortawesome/fontawesome-free-solid";

export default Vue.extend({
  name: "search-account",
  props: ["account", "placeholder", "title"],
  components: {
    UserResult,
    ScheduleEvents
  },
  computed: {
    iconSearch: function(): IconDefinition {
      return faSearch;
    },
    iconErase: function(): IconDefinition {
      return faEraser;
    }
  },
  mounted: function() {
    const _self = this;
    const _clear = <HTMLElement>document.querySelector(".fa-earse");
    const _search = <HTMLElement>document.querySelector(".fa-search");
    const _category = document.querySelectorAll(".category");
    const _start = <HTMLInputElement>document.querySelector("#start");
    const _end = <HTMLInputElement>document.querySelector("#end");

    if (_clear) {
      _clear.addEventListener("click", (e: Event) => {
        _self.account.clearSearch(e);
      });
    }

    if (_search) {
      _search.addEventListener("click", (e: Event) => {
        _self.account.search(e);
      });
    }

    if (_category) {
      _category.forEach(elm => {
        elm.addEventListener("change", (e: Event) => {
          _self.account.toggleCategory(e);
        });
      });
    }

    if (_start && _end) {
      _start.addEventListener("input", (e: Event) => {
        _self.account.setDateInput(e);
      });
      _start.addEventListener("blur", (e: Event) => {
        _self.account.maskDateInput(e);
      });

      _end.addEventListener("input", (e: Event) => {
        _self.account.setDateInput(e);
      });
      _end.addEventListener("blur", (e: Event) => {
        _self.account.maskDateInput(e);
      });
    }
  }
});
</script>