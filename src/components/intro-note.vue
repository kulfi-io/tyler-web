<template lang="pug">
    div.note-vue
        div.portrait(ref="portrait" class="portrait")
            form(id="note-form-portrait")
                div.split
                    div.split-half-left
                        div.heading
                            span send us a note!
                        div.form-group
                            Email( 
                                :tag="'note-email'"
                                :placeholder="'email'"
                                :title="'email is required'"
                                :label="'email'" :account="account"
                                :relative="'note-land-email'" :validKey="'email'")
                        div.form-group
                            Name(
                                :tag="'note-first'"
                                :placeholder="'firstname'"
                                :title="'firstname is required'"
                                :account="account" :set="false"
                                :relative="'note-land-first'" :validKey="'first'")
                        div.form-group
                            Name(
                                :tag="'note-last'"
                                :placeholder="'lastname'"
                                :title="'lastname is required'"
                                :account="account" :set="false"
                                :relative="'note-land-last'" :validKey="'last'")
                        div.form-group
                            Area(
                                :tag="'note'"
                                :placeholder="'Note'"
                                :title="'Note is required'" :required="true"
                                :account="account"
                                :relative="'land-note'" :validKey="'note'")
                        div.form-group(class="submit")
                            button.form-control(class="submitter bg-muted" type="submit" id="send-note") Send
                    div.split-half-right
                        div.heading
                            span call us!
                        div.other-info
                            section
                                p.title Tyler Chamberlain, CMT
                                p 999 Sutter Street 
                                p San Francisco, CA 94109
                                p 415.275.0167
        div.landscape(ref="landscape" class="hide-element landscape")
            form(id="note-form-landscape")
                div.heading
                    span send us a note!
                div.form-group(class="split")
                    div.split-third
                        Email( 
                        :tag="'note-land-email'"
                        :placeholder="'email'"
                        :title="'email is required'"
                        :label="'email'" :account="account" 
                        :relative="'note-email'" :validKey="'email'")
                    div.split-third
                        Name(
                        :tag="'note-land-first'"
                        :placeholder="'firstname'"
                        :title="'firstname is required'"
                        :account="account"
                        :relative="'note-first'" :validKey="'first'")
                    div.split-third-end
                        Name(
                        :tag="'note-land-last'"
                        :placeholder="'lastname'"
                        :title="'lastname is required'"
                        :account="account"
                        :relative="'note-last'" :validKey="'last'")
                div.form-group
                    Area(
                    :tag="'land-note'"
                    :placeholder="'Note'"
                    :title="'Note is required'" :required="true"
                    :account="account" 
                    :relative="'note'" :validKey="'note'")
                div.form-group(class="submit")
                    button.form-control(class="submitter bg-muted" type="submit" id="land-send-note") Send
                div.heading   
                    div.other-info
                        section
                            p.landscape-contact Tyler Chamberlain, CMT  |  999 Sutter Street, San Francisco, CA 94109 | 415.275.0167 
</template>

<script lang="ts">
import Vue from "vue";
import Email from "../components/kulfi/email.vue";
import Name from "../components/kulfi/name.vue";
import Area from "../components/kulfi/large-text-area.vue";
import Library from "../library/account";

export default Vue.extend({
  name: "note",
  components: {
    Email,
    Name,
    Area
  },
  computed: {
    initAccount: function() {
      const _portSubmitter = <Element>document.querySelector("#send-note");
      const _landSubmitter = <Element>document.querySelector("#land-send-note");
      const _account = <Library>this.$data.account;
      _account.readyToSubmit.submitter = _portSubmitter;
      _account.readyToSubmit.max = 4;
      this.$data.account = _account;

      _portSubmitter.addEventListener("click", this.$data.account.sendNote);
      _landSubmitter.addEventListener("click", this.$data.account.sendNote);
    }
  },
  data: function() {
    return {
      account: new Library()
    };
  },
  mounted: function() {
    this.initAccount;
    this.displayBasedOnOrientation();
    window.addEventListener("resize", () => {
      this.displayBasedOnOrientation();
    });
  },
  methods: {
    matchPortView: function() {
      const _faElements: Element[] = [];

      const _email = <HTMLInputElement>(
        document.querySelector("#note-land-email")
      );
      const _emailFa = <HTMLElement>document.querySelector(`.fa-${_email.id}`);
      const _sourceEmail = <HTMLInputElement>(
        document.querySelector(`#${_email.getAttribute("data-relation")}`)
      );

      const _first = <HTMLInputElement>(
        document.querySelector("#note-land-first")
      );
      const _firstFa = <HTMLElement>document.querySelector(`.fa-${_first.id}`);
      const _sourceFirst = <HTMLInputElement>(
        document.querySelector(`#${_first.getAttribute("data-relation")}`)
      );

      const _last = <HTMLInputElement>document.querySelector("#note-land-last");
      const _lastFa = <HTMLElement>document.querySelector(`.fa-${_last.id}`);
      const _sourceLast = <HTMLInputElement>(
        document.querySelector(`#${_last.getAttribute("data-relation")}`)
      );

      const _note = <HTMLDivElement>document.querySelector("#land-note");
      const _noteFa = <HTMLElement>document.querySelector(`.fa-${_note.id}`);
      const _sourceNote = <HTMLDivElement>(
        document.querySelector(`#${_note.getAttribute("data-relation")}`)
      );

      _email.value = _sourceEmail.value;
      _first.value = _sourceFirst.value;
      _last.value = _sourceLast.value;
      _note.innerText = _sourceNote.innerText;

      _faElements.push(_emailFa);
      _faElements.push(_firstFa);
      _faElements.push(_lastFa);
      _faElements.push(_noteFa);

      this.$data.account.matchSiblingState(_faElements);
    },

    matchLandView: function() {
      const _faElements: Element[] = [];

      const _email = <HTMLInputElement>document.querySelector("#note-email");
      const _emailFa = <HTMLElement>document.querySelector(`.fa-${_email.id}`);
      const _sourceEmail = <HTMLInputElement>(
        document.querySelector(`#${_email.getAttribute("data-relation")}`)
      );

      const _first = <HTMLInputElement>document.querySelector("#note-first");
      const _firstFa = <HTMLElement>document.querySelector(`.fa-${_first.id}`);
      const _sourceFirst = <HTMLInputElement>(
        document.querySelector(`#${_first.getAttribute("data-relation")}`)
      );

      const _last = <HTMLInputElement>document.querySelector("#note-last");
      const _lastFa = <HTMLElement>document.querySelector(`.fa-${_last.id}`);
      const _sourceLast = <HTMLInputElement>(
        document.querySelector(`#${_last.getAttribute("data-relation")}`)
      );

      const _note = <HTMLDivElement>document.querySelector("#note");
      const _noteFa = <HTMLElement>document.querySelector(`.fa-${_note.id}`);
      const _sourceNote = <HTMLDivElement>(
        document.querySelector(`#${_note.getAttribute("data-relation")}`)
      );

      _email.value = _sourceEmail.value;
      _first.value = _sourceFirst.value;
      _last.value = _sourceLast.value;
      _note.innerText = _sourceNote.innerText;

      _faElements.push(_emailFa);
      _faElements.push(_firstFa);
      _faElements.push(_lastFa);
      _faElements.push(_noteFa);

      this.$data.account.matchSiblingState(_faElements);
    },

    displayBasedOnOrientation: function() {
      const _portrait = <HTMLDivElement>document.querySelector(".portrait");
      const _landscape = <HTMLDivElement>document.querySelector(".landscape");
      const _portraitClassList = _portrait.classList;
      const _landscapeClassList = _landscape.classList;
      var mql = window.matchMedia("(orientation: portrait)");

      if (mql.matches) {

        const _submitter = <Element>document.querySelector("#send-note");
        this.$data.account.readyToSubmit.submitter = _submitter;


        if (_portraitClassList.contains("hide-element")) {
          
          _portrait.classList.remove("hide-element");
          _landscape.classList.add("hide-element");

          this.matchLandView();
        }

      } else {

        const _submitter = <Element>document.querySelector("#land-send-note");
        this.$data.account.readyToSubmit.submitter = _submitter;

        if (_landscapeClassList.contains("hide-element")) {
          
          _landscape.classList.remove("hide-element");
          _portrait.classList.add("hide-element");

          this.matchPortView();
        }
      }
    }
  }
});
</script>
