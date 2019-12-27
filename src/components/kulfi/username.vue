<template lang="pug">
  div.kulfi-username
    label.control-label( for="username") username
      span.required-field *
    div.input-group( role="group")
      input.form-control(type="text" id="username" ref="username" 
      title="username is required" placeholder="username" 
      required) 
      div.input-group-prepend
        span.input-group-text( class="required-field") *
          font-awesome-icon.fa-user( class="fa text-muted" :icon="iconUser")
</template>

<script lang="ts">
import Vue from "vue";
import { IconDefinition } from "@fortawesome/fontawesome-free-solid";
import { IValidKey } from "../../models/interfaces";

export default Vue.extend({
  name: "kulfi-username",
  props: ["account"],
  computed: {
    iconUser: function(): IconDefinition {
      return this.account.displayUserIcon();
    }
  },
  mounted: function() {
    var _self = this;
    const _username = <HTMLInputElement>this.$refs.username;

    _username.addEventListener("keypress", function(e: Event) {
      const _target = <HTMLInputElement>e.currentTarget;
      if (_target.value.length >= 15) e.preventDefault();

      var _return = _self.validateInput(e as KeyboardEvent);
      if (!_return) {
        e.preventDefault();
      }
    });

    _username.addEventListener("keyup", function(e: Event) {
      _self.validateUsername(e.currentTarget as HTMLInputElement);
    });
  },
  methods: {
    validateInput: function(e: KeyboardEvent): boolean {
      let _return = true;

      if (
        !(e.which >= 64 && e.which <= 90) &&
        !(e.which >= 97 && e.which <= 122) &&
        !(e.which >= 48 && e.which <= 57) &&
        !(e.which == 45) &&
        !(e.which == 95)
      ) {
        _return = false;
      }

      return _return;
    },
    validateUsername: function(elm: HTMLInputElement) {
      const _library = this.account;
      const _parent = <Element>elm.closest("main");
      const _userFa = <Element>_parent.querySelector(".fa-user");
      const _value = elm.value;

      _library.matched = /[a-zA-Z0-9-?_?]{5,15}\w+/.test(_value);
      _library.matched ? _library.passed(_userFa) : _library.muted(_userFa);

      const _key: IValidKey = {
        name: elm.id,
        relative: "",
        value: _library.matched
      };

      _library.validateComplete(_key);
    }
  }
});
</script>

