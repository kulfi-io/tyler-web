<template lang="pug">
    div.Kulfi-email
        label.control-label( for="email") Email
            span.required-field *
        div.input-group(role="group")
            input.form-control( type="text" :id="tag" 
            ref="email" title="Email is required" 
            placeholder="email" required 
            :data-relation="relative" :data-key="validKey")
            div.input-group-prepend
                span.input-group-text(class="required-field") *
                    font-awesome-icon.fa( :class="`fa-${tag} text-muted`" :icon="iconEnvelope" )
</template>

<script lang="ts">
import Vue from "vue";
import { IconDefinition } from "@fortawesome/fontawesome-free-solid";
import { IValidKey } from "../../models/interfaces";

export default Vue.extend({
  name: "kulfi-email",
  props: ["tag", "account", "relative", "validKey"],
  computed: {
    iconEnvelope: function(): IconDefinition {
      return this.account.displayEnvelopIcon();
    }
  },
  mounted: function() {
    const _self = this;
    const _email = <Element>this.$refs.email;

    _email.addEventListener("keyup", function(e: Event) {
      _self.validateEmail(e.currentTarget as HTMLInputElement);
    });
  },
  methods: {
    validateInput: function(event: KeyboardEvent): boolean {
      let _return = true;
      if (
        !(event.which >= 64 && event.which <= 90) &&
        !(event.which >= 97 && event.which <= 122) &&
        !(event.which >= 48 && event.which <= 57) &&
        !(event.which == 64) &&
        !(event.which == 46)
      ) {
        _return = false;
      }

      return _return;
    },
    validateEmail: function(elm: HTMLInputElement) {
      const _library = this.account;
      const _relative = elm.getAttribute("data-relation");
      const _validKey = elm.getAttribute("data-key");
      const _parent = <Element>elm.closest("main");
      const _emailFa = <Element>_parent.querySelector(`.fa-${this.tag}`);
      const _relatedEmailFa = <Element>(
        _parent.querySelector(`.fa-${_relative}`)
      );
      const _value = elm.value;

      _library.matched = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        _value
      );

      if (_library.matched) {
        _library.passed(_emailFa);
        _library.passed(_relatedEmailFa);
      } else {
        _library.muted(_emailFa);
        _library.muted(_relatedEmailFa);
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
