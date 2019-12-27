<template lang="pug">
    div.send-note
        div.send-note-background
        div.send-note-header
            div.title
                div.heading
                    p.greet(ref="greet") We want to hear from you
                    p.greet-sub send us a note!
        div.send-note-body
            div.content
                form(id="note-form")
                    div.split()
                        div.split-third(class='email note')
                        div.split-third(class='first note')
                        div.splitflex-1(class='last note')
                    div.form-group
                        input.form-control(class='subject' type='text' placeholder='Subject' required)
                    div.form-group
                        div.input-group
                            div.text-area(class="form-control" contenteditable="true"
                            id="message" data-text="message")
                    div.form-group(class="submit")
                        button.form-control(class="submitter bg-muted" type="submit" id="send-note") Send
        div.send-note-footer
            div.split
                div.split-half-left
                    a.heading(class="link" href="/account") Account 
                div.split-half-right(class="link-last")
                    a.heading(class="link" href="/schedule") Schedule
</template>

<script lang="ts">
import Vue from "vue";
import { SendNote } from "../library/sendNote";

export default Vue.extend({
  name: "send-note",
  data: function() {
    return {
      note: typeof SendNote
    };
  },
  mounted: function() {
    this.$data.note = new SendNote();
  }
});
</script>