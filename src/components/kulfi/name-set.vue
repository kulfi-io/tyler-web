<template lang="pug">
    div.kulfi-name-set(class="split")
        div.split-half-left
            Name(:tag="`firstname`" :title="'firstname is required'" 
            :label="'firstname'" :placeholder="'firstname'"
            :account="account" :set="true" :relative="''" :key="'first'")     
        div.split-half-right
            Name(:tag="`lastname`" :title="'lastname is required'" 
            :label="'lastname'" :placeholder="'lastname'"
            :account="account" :set="true" :relative="''" :key="'last'")   
</template>

<script lang="ts">
import Vue from "vue";
import Name from "./name.vue";
import { IValidKey } from "../../models/interfaces";
export default Vue.extend({
  name: "name-set",
  props: ["account"],
  components: {
    Name
  },
  // computed: {
  //     account: function()  {
  //         return this.$parent.$data.account;
  //     }
  // },
  mounted: function() {
    const _self = this;
    const _last = <Element>document.querySelector(`#lastname`);
    const _first = <Element>document.querySelector(`#firstname`);

    _last.addEventListener("keyup", function(e: Event) {
      _self.validateName(e.currentTarget as HTMLInputElement);
    });

    _first.addEventListener("keyup", function(e: Event) {
      _self.validateName(e.currentTarget as HTMLInputElement);
    });
  },
  methods: {
    validateName: function(elm: HTMLInputElement) {
      const _library = this.$parent.$data.account;
      const _relative = elm.getAttribute("data-relation");

      const _parent = <Element>elm.closest("main");
      var _nameFa = <Element>_parent.querySelector(`.fa-${elm.id}`);
      var _value = elm.value;

      _library.matched = /[A-Za-z]{3,25}/.test(_value);
      _library.matched ? _library.passed(_nameFa) : _library.muted(_nameFa);

      const _key: IValidKey = {
        name: elm.id,
        relative: _relative ? _relative : "",
        value: _library.matched
      };

      _library.validateComplete(_key);
    }
  }
});
</script>

