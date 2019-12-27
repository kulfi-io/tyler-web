<template lang="pug">
    div.kulfi-text-area
        label.control-label( :for="`${tag}`") {{tag}}
            span.required-field(v-if="required") *
        div.input-group
            div.text-area(class="form-control" contenteditable="true"
            :id="`${tag}`" data-text="Enter note content" 
            :data-relation="relative" :data-key="validKey")
            div.input-group-prepend
                span.input-group-text(v-if="required" class="required-field") *
                    font-awesome-icon.fa( :class="`text-muted fa-${tag}`" :icon="iconCheck" )
</template>
<script lang="ts">
import Vue from "vue";
import { IconDefinition } from "@fortawesome/fontawesome-free-solid";
import { IValidKey } from "../../models/interfaces";

export default Vue.extend({
  name: "kulfi-name",
  props: ["tag", "required", "account", "relative", "validKey"],
  computed: {
    iconCheck: function(): IconDefinition {
      return this.account.displayCheckIcon();
    }
  },
  mounted: function() {
    const _self = this;
    const _note = <HTMLDivElement>document.querySelector(`#${this.tag}`);

    _note.addEventListener("keypress", function(e: Event) {
      if (_note.innerText.length > 300) {
        e.preventDefault();
      }
    });

    _note.addEventListener("keyup", function(e: Event) {
      _self.validateNote(e.currentTarget as HTMLInputElement);
    });
  },
  methods: {
    validateNote: function(elm: HTMLDivElement) {
      const _library = this.account;
      const _relative = elm.getAttribute("data-relation");
      const _validKey = elm.getAttribute("data-key");
      const _noteFa = <Element>document.querySelector(`.fa-${this.tag}`);
      const _relatedNoteFa = <Element>(
        document.querySelector(`.fa-${_relative}`)
      );

      _library.matched = elm.innerText.length >= 15;

      if (_library.matched) {
        _library.passed(_noteFa);
        _library.passed(_relatedNoteFa);
      } else {
        _library.muted(_noteFa);
        _library.muted(_relatedNoteFa);
      }

      const _key: IValidKey = {
        name: _validKey ? _validKey : elm.id,
        relative: _relative ? _relative : "",
        value: _library.matched
      };

      _library.validateComplete(_key);
    }
  }
});
</script>
