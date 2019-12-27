<template lang="pug">
    main.intro-register-vue
        div.content
            div.register-banner
                img.salutation( src='../../public/img/register.png' alt="register")
            div.register-vue
                form(id="register-form")
                    div.heading
                        span please provide all necessary information
                    div.form-group(class="split")
                        Username(:account="account" class="split-half-left" ) 
                        Email( class="split-half-right" 
                        :tag="'register-email'"
                        :placeholder="'email'"
                        :title="'email is required'"
                        :label="'email'"
                        :account="account" :validKey="'email'")
                    div.form-group
                        NameSet(:account="account")
                    div.form-group
                        PasswordSet(
                        :tag="'password'"
                        :placeholder="'Password'"
                        :title="'Password is required'"
                        :label="'Password'" :account="account"
                        )                     
                    div.form-group(class="submit")
                        button.form-control(id="register-account" class="submitter bg-muted" type="submit" ) Register
</template>

<script lang="ts">
import Vue from "vue";
import Username from "./kulfi/username.vue";
import PasswordSet from "./kulfi/password-set.vue";
import Email from "./kulfi/email.vue";
import NameSet from "./kulfi/name-set.vue";
import Library from "../library/account";

export default Vue.extend({
  name: "intro-register",
  computed: {
    initAccount: function() {
      const _submitter = <Element>document.querySelector("#register-account");
      const _account = <Library>this.$data.account;
      _account.readyToSubmit.submitter = _submitter;
      _account.readyToSubmit.max = 5;
      _account.start();
      this.$data.account = _account;

      _submitter.addEventListener("click", this.$data.account.register);
    }
  },
  mounted: function() {
    this.initAccount;
  },
  data: function() {
    return {
      account: new Library()
    };
  },
  components: {
    Username,
    PasswordSet,
    Email,
    NameSet
  }
});
</script>
