<template lang="pug">
    div
        div.kulfi-password-set(class="split")
            div.split-half-left
                Password(:tag="tag" :title="title" 
                :label="label" :placeholder="placeholder"
                :account="account" :set="true")     
            div.split-half-right
                Password(  :tag="`verify-${tag}`" :title="title"
                :label="'verify'" :placeholder="placeholder"
                :account="account" :set="true")
        div.instructions
            div.split
                div.text-muted( class="split-left")
                    small.form-text(ref="pwdLength" class="form-text text-muted" id="pwd-length") At least 8 characters long (max of 15).
                div.text-muted( class="split-right")
                    small.form-text(ref="pwdMatch" class="form-text text-muted" id="pwd-match") Password matches.
            div.split   
                div.text-muted( class="split-left")
                    small.form-text(ref="pwdUpper" class="form-text text-muted" id="pwd-upper") Contains at least 1 upper case.
                div.text-muted( class="split-right")   
                    small.form-text(ref="pwdLower" class="form-text text-muted" id="pwd-lower") Contains at least 1 lower case.
            div.split
                div.text-muted(class="split-left")    
                    small.form-text(ref="pwdNumber" class="form-text text-muted" id="pwd-number") Contains at least 1 number.
                div.text-muted(class="split-right")
                    small.form-text(ref="pwdSpecial" class="form-text text-muted" id="pwd-special") Contains at least 1 special [!@#$%] character.
</template>

<script lang="ts">
import Vue from "vue";
import Password from "../kulfi/password.vue";
import { IValidKey } from "../../models/interfaces";

export default Vue.extend({
  name: "kulfi-password-set",
  props: ["tag", "title", "placeholder", "label", "account"],
  components: {
    Password
  },
  mounted: function() {
    const _self = this;
    const _pwd = <HTMLInputElement>this.$el.querySelector(`#${this.tag}`);
    const _verify = <HTMLInputElement>(
      this.$el.querySelector(`#verify-${this.tag}`)
    );

    _pwd.addEventListener("keyup", (e: Event) => {
      _self.validatePassword(_pwd, _verify);
    });

    _pwd.addEventListener("focus", (e: Event) => {
      _self.resetValidation();
      _self.validatePassword(_pwd, _verify);
    });

    _verify.addEventListener("keyup", (e: Event) => {
      _self.validatePassword(_verify, _pwd);
    });

    _verify.addEventListener("focus", (e: Event) => {
      _self.resetValidation();
      _self.validatePassword(_verify, _pwd);
    });
  },
  methods: {
    setMatched: function(
      label: string,
      matched: boolean,
      target: Element
    ): void {
      const _library = this.account;
      matched ? _library.passed(target) : _library.muted(target);
      const _key: IValidKey = {
        name: label,
        relative: "",
        value: matched
      };

      _library.setValidationResult(_key);
    },
    resetValidation: function() {
      const _library = this.account;
      _library.pwdCriteriaMatched = [];

      var _length = <Element>this.$refs.pwdLength;
      var _upper = <Element>this.$refs.pwdUpper;
      var _lower = <Element>this.$refs.pwdLower;
      var _number = <Element>this.$refs.pwdNumber;
      var _special = <Element>this.$refs.pwdSpecial;
      var _match = <Element>this.$refs.pwdMatch;

      _library.muted(_length);
      _library.muted(_upper);
      _library.muted(_lower);
      _library.muted(_number);
      _library.muted(_special);
    },
    validatePassword: function(
      source: HTMLInputElement,
      target: HTMLInputElement
    ): boolean {
      const _library = this.account;
      const _parent = <Element>source.closest("main");
      var _length = <Element>this.$refs.pwdLength;
      var _upper = <Element>this.$refs.pwdUpper;
      var _lower = <Element>this.$refs.pwdLower;
      var _number = <Element>this.$refs.pwdNumber;
      var _special = <Element>this.$refs.pwdSpecial;
      var _match = <Element>this.$refs.pwdMatch;
      var _passFa = _parent.querySelectorAll(".fa-pwd");

      var _sourceValue = source.value;
      var _targetValue = target.value;

      if (!_sourceValue.length || _sourceValue.length > 15) return false;

      this.setMatched("length", _sourceValue.length >= 8, _length);
      this.setMatched(
        "lower",
        _library.validateLowerAlpha(_sourceValue),
        _lower
      );
      this.setMatched(
        "upper",
        _library.validateUpperAlpha(_sourceValue),
        _upper
      );
      this.setMatched("digit", _library.validateDigit(_sourceValue), _number);
      this.setMatched(
        "special",
        _library.validateSpecial(_sourceValue),
        _special
      );
      this.setMatched(
        "match",
        _library.validateMatched(_sourceValue, _targetValue),
        _match
      );

      const _criteria: IValidKey[] = _library.pwdCriteriaMatched;
      const _failed = _criteria.filter(x => !x.value);

      const _sourceMatched = /[a-zA-Z0-9!@#$%]{8,15}/.test(_sourceValue);
      const _targetMatched = /[a-zA-Z0-9!@#$%]{8,15}/.test(_targetValue);

      _library.matched =
        _sourceMatched && _targetMatched && _failed.length == 0;
      _library.matched
        ? _library.passed(_passFa.item(0))
        : _library.muted(_passFa.item(0));
      _library.matched
        ? _library.passed(_passFa.item(1))
        : _library.muted(_passFa.item(1));

      const _key: IValidKey = {
        name: "password-set",
        relative: "",
        value: _library.matched
      };

      _library.validateComplete(_key);

      return _library.matched;
    }
  }
});
</script>

