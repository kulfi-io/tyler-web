<template lang="pug">
    div.account-summary-vue
        div.account-summary-background
        div.account-summary-header
            div.title
                div.heading
                    p.greet(ref="greet") Welcome back!
                    p.greet-sub(class="client-name")
                    p.greet-sub( class="today" ref="today")
        div.account-summary-body
            div.content
                div.tabs
                    input.tab-input(name="tabs" type="radio" id="account" checked="checked")
                    label.tab-label(for="account") Account
                    div.panel(class="user-panel hidden-panel")
                        div.split
                            div.split-half-left(class="impersonate")
                            div.split-half-right
                                a.heading(class="link impersonate-reset" href="#")
                        div.split 
                            div.split-half-left
                                div.account-info
                                    div.control-label Firstname
                                    div.firstname( class="data" ref="firstname")
                            div.split-half-right
                                div.account-info
                                    div.control-label Lastname                            
                                    div.lastname( class="data" ref="lastname")
                        div.split 
                            div.split-half-left
                                div.account-info
                                    div.control-label Email
                                    div.email( class="data" ref="email")
                            div.split-half-right
                                div.account-info
                                    div.control-label Username                            
                                    div.username( class="data" ref="username")
                        div.notes
                            div.account-info
                                Scheduled()
                    input.tab-input(name="tabs" type="radio" id="search" )
                    label.tab-label(for="search" ) Search
                    div.panel(class="search-panel hidden-panel" )
                        SearchAccount(:account="library" :title="'Search'" :placeholder="'Search'")
                div.meeting-view-popup(id="meeting-view-popup" ref="meeting-view-popup" )
                    div.popup
                        div.title 
                        div.error
                        div.body
                            div.cal-name(class="info") 
                            div.cal-location(class="info") 
                            div.cal-date(class="info")
                            AccountNote(:account="library")
                            div.split
                                div.split-half-left
                                    a.heading(class="link cancel-apt" href="#") Cancel Appt
                                div.split-half-right(class="link-last")
                                    a.heading(class="link close" href="#" ) Close 
                div.meeting-note-popup(id="meeting-note-popup")
                    div.popup
                        div.title
                        div.error
                        div.body 
                            MeetingNote(:account="library") 
        div.account-summary-footer
            div.split
                div.split-half-left
                    a.heading(class="link" href="/note") Send a note
                div.split-half-right(class="link-last")
                    a.heading(class="link" href="/schedule") Schedule
</template>

<script lang="ts">
import Vue from "vue";
import Library from "../library/account-summary";
import Scheduled from "./scheduled-event.vue";
import MeetingNote from "./meeting-note.vue";
import AccountNote from "./account-note-result.vue";
import SearchAccount from "./search.vue";

export default Vue.extend({
  name: "account-summary",
  components: {
    Scheduled,
    MeetingNote,
    SearchAccount,
    AccountNote
  },
  mounted: function() {
    this.$data.library = new Library();
  },
  data: function() {
    return {
      library: typeof Library
    };
  }
});
</script>