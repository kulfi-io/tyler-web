<template lang="pug">
    main.validate-login-vue
        div.content
            div.login-banner
                img.salutation( src="../../public/img/validate.png")
                div.validate-vue
                    form(id="validate-form")
                        div.heading
                            span Validate Login
                        div.token
                            Token
                        div.split
                            div.split-half-left
                                Username(:account="account")
                            div.split-half-right
                                Password(
                                :tag="'password'"
                                :placeholder="'Password'"
                                :title="'Password is required'"
                                :label="'Password'"
                                :account="account" :set="false")
                        div.split
                            div.split-half-flush(class="split custom-control-input")
                                div.split-for-cb(class="checkbox")
                                    input(type="checkbox" value="None" class="kulfi-cb" id="kulficb" ref="remember")
                                    label(for="kulficb")
                                div.split-for-label Remember me
                            div.split-half-flush
                        div.form-group(class="submit")
                            button.form-control(class="submitter bg-muted" type="submit" id="validate-account") validate
</template>

<script lang="ts">
import Vue from "vue";
import Username from "./kulfi/username.vue";
import Password from "./kulfi/password.vue";
import email from "./kulfi/email.vue";
import Token from "./kulfi/token.vue";
import Library from "../library/account";

export default Vue.extend({
  name: "validate-login",
  components: {
    Username,
    Password,
    Token
  },
  computed: {
    initLoginAccount: function() {
      const _submitter = <Element>document.querySelector("#validate-account");
      const _account = new Library(_submitter, 2);

      _submitter.addEventListener("click", _account.verify);
      this.$data.account = _account;
    }
  },
  mounted: function() {
    this.initLoginAccount;
  },
  data: function() {
    return {
      account: new Library()
    };
  }
});
</script>
