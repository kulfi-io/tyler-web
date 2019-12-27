<template lang="pug">
    div.kulfi.name
        label.control-label( :for="`${tag}`") {{tag}}
            span.required-field *
        div.input-group
            input.form-control(type="text"  required 
            :placeholder="placeholder" :title="title" 
            :id="`${tag}`" :data-is-set="set"
            :data-relation="relative" :data-key="validKey")
            div.input-group-prepend
                span.input-group-text(class="required-field") *
                    font-awesome-icon.fa-name( :class="`fa-${tag} fa text-muted`" :icon="iconCheck" )
</template>

<script lang="ts">
import Vue from "vue";
import { IconDefinition } from "@fortawesome/fontawesome-free-solid";
import { IValidKey } from "../../models/interfaces";

export default Vue.extend({
  name: "kulfi-name",
  props: [
    "tag",
    "title",
    "placeholder",
    "account",
    "set",
    "relative",
    "validKey"
  ],
  computed: {
    iconCheck: function(): IconDefinition {
      return this.account.displayCheckIcon();
    }
  },
  mounted: function() {
    const _self = this;
    const _name = <HTMLInputElement>document.querySelector(`#${this.tag}`);

    _name.addEventListener("keypress", function(e: Event) {
      var _elm = <HTMLInputElement>_name;

      if (_elm.value.length > 25) {
        e.preventDefault();
      }
      var _return = _self.validateInput(e as KeyboardEvent);
      if (!_return) {
        e.preventDefault();
      }
    });

    _name.addEventListener("keyup", function(e: Event) {
      const _isPartOfSet = _name.getAttribute("data-is-set");
      if (!_isPartOfSet) {
        _self.validateName(e.currentTarget as HTMLInputElement);
      }
    });
  },
  methods: {
    validateInput: function(event: KeyboardEvent): boolean {
      let _return = true;

      if (
        !(event.which >= 65 && event.which <= 90) &&
        !(event.which >= 97 && event.which <= 122)
      ) {
        _return = false;
      }

      return _return;
    },
    validateName: function(elm: HTMLInputElement) {
      const _library = this.account;
      const _relative = elm.getAttribute("data-relation");
      const _validKey = elm.getAttribute("data-key");
      const _parent = <Element>elm.closest("main");
      const _nameFa = <Element>_parent.querySelector(`.fa-${this.tag}`);
      const _value = elm.value;

      _library.matched = /[A-Za-z]{3,25}/.test(_value);
      _library.matched ? _library.passed(_nameFa) : _library.muted(_nameFa);

      const _pair: IValidKey = {
        name: _validKey ? _validKey : elm.id,
        relative: _relative ? _relative : "",
        value: _library.matched
      };

      _library.validateComplete(_pair);
    }
  }
});
</script>

