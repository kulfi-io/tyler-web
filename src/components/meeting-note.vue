<template lang="pug">
    div.account-note
      form(id="note-form")
        div.split()
          div.split-third(class='meeting-email note')
          div.split-third(class='meeting-firstName note')
          div.splitflex-1(class='meeting-lastName note')
        div.form-group
          input.form-control(class='meeting-title' type='text' placeholder='Title' required)
        div.form-group
          div.input-group
            div.text-area(class="form-control" contenteditable="true"
            id="meeting-note" data-text="please enter notes")
        div.split(class="action")
            a.split-half-left(class="link add-note view" href="#") add
            a.split-half-right(class="link close view" href="#") close
            //- div.form-group(class="submit")
            //-   button.form-control(class="submitter bg-muted" type="submit" id="save-note") Save
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "meeting-note",
  props: ["account"],
  mounted: function() {
    const _submitter = document.querySelector(".add-note");
    const _title = document.querySelector(".meeting-title");
    const _note = document.querySelector("#meeting-note");

    if (_submitter) {
      _submitter.addEventListener("click", (e: Event) => {
        e.preventDefault();

        if (_submitter.classList.contains("bg-muted")) {
          return false;
        } else {
          this.account.createNote(e);
        }
      });
    }

    if (_title && _note) {
      _title.addEventListener("keyup", (e: Event) => {
        this.account.validateNote(e as KeyboardEvent);
      });
      _note.addEventListener("keyup", (e: Event) => {
        this.account.validateNote(e as KeyboardEvent);
      });
    }
  }
});
</script>