<template lang="pug">
  div.account-vue
    header-vue
    div.login-vue
      full-page.fullpage( :options="options")
        div.section(class="page login")
          div.slide
            AccountLogin
          div.slide
            ResetPassword
          div.slide
            ChangePassword
    footer-vue
</template>

<script lang="ts">
import Vue from "vue";
import AccountLogin from "../components/account/account-login.vue";
import ChangePassword from "../components/account/change-password.vue";
import ResetPassword from "../components/account/reset-password.vue";
export default Vue.extend({
  name: "login",
  components: {
    AccountLogin,
    ChangePassword,
    ResetPassword
  },
  data: () => {
    return {
      options: {
        scrollOverflow: false,
        scrollBar: false,
        navigation: false,
        controlArrows: true,
        slidesNavigation: true,
        anchors: ["login"],
        sectionsColor: ["#C8C8C8"],
        licenseKey: "002D6FD2-0EC343D4-9403ACA4-CB7CDBFB"
      }
    };
  }
});
</script>

<style scoped>
</style>


<style lang="scss">
@import "./public/sass/account.scss";
@import "./public/sass/checkbox.scss";
.login-vue {
  animation-duration: 1s;
  animation-name: fadeIn;
  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);
}
</style>


