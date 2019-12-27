<template lang="pug">
  div.kulfi-password
    label.control-label( :for="tag") {{ label }}
      span.required-field *
    div.input-group
      div.input-group-prepend(class="hidden-left")
        span.input-group-text( class="input-icon-btn " :id="`toggle-${tag}`"
        :data-target="tag" data-display="false")
          font-awesome-icon.fa( ref="eye" id="fa-pwd-eye" class="fa-base" :icon="iconEye")
      input.form-control( type="password" :id="tag"  :data-is-set="set"
        :title="title" :placeholder="placeholder" 
      required )
      div.input-group-prepend
        span.input-group-text(class="required-field") *
          font-awesome-icon.fa( class="fa-pwd text-muted" :icon="iconLock" aria-hidden="true")
</template>


<script lang="ts">
import Vue from "vue";
import { IconDefinition } from "@fortawesome/fontawesome-free-solid";
import { IValidKey } from "../../models/interfaces";

export default Vue.extend({
  name: "kulfi-password",
  props: ["tag", "title", "placeholder", "label", "account", "set"],
  computed: {
    iconLock: function(): IconDefinition {
      return this.account.displayLockIcon();
    },
    iconEye: function(): IconDefinition {
      return this.account.displayEyeIcon();
    }
  },
  mounted: function() {
    const _self = this;
    const _library = this.account;
    const _eye = <HTMLElement>this.$refs.eye;
    const _pwd = <HTMLInputElement>this.$el.querySelector(`#${this.tag}`);

    _eye.addEventListener("click", (e: Event) => {
      _library.displayPassword(<SVGElement>e.currentTarget);
    });

    _pwd.addEventListener("keypress", (e: Event) => {
      var _return = _self.allowValidPwdCharacters(e as KeyboardEvent);
      if (!_return) {
        e.preventDefault();
      }
    });

    _pwd.addEventListener("keyup", (e: Event) => {
      const _isPartOfSet = _pwd.getAttribute("data-is-set");
      if (!_isPartOfSet) {
        _self.validatePassword(_pwd);
      }
    });
  },
  methods: {
    allowValidPwdCharacters: function(event: KeyboardEvent): boolean {
      let _return = true;

      if (
        !(event.which >= 64 && event.which <= 90) &&
        !(event.which >= 97 && event.which <= 122) &&
        !(event.which == 33) &&
        !(event.which >= 35 && event.which <= 37) &&
        !(event.which >= 48 && event.which <= 57)
      ) {
        _return = false;
      }

      return _return;
    },
    validatePassword: function(elm: HTMLInputElement) {
      const _val = elm.value;
      let _parent = elm.parentNode;

      if (_parent) {
        _parent = <Element>_parent.parentNode;
        var _passFa = _parent.querySelector(".fa-pwd");
        this.account.matched = /[a-zA-Z0-9!@#$%]{8,15}/.test(_val);
        this.account.matched
          ? this.account.passed(_passFa)
          : this.account.muted(_passFa);
      }

      const _key: IValidKey = {
        name: elm.id,
        relative: "",
        value: this.account.matched
      };

      this.account.validateComplete(_key);
    }
  }
});
</script>
