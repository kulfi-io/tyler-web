<template lang="pug">
  div.home
    header-vue
    full-page.fullpage( :options="options")
      div.section(class="page home")
        IntroHome(:animations="[homeTop, homeBottom]")
      div.section(class="page vision")
        IntroVision(:animations="[visionTop, visionBottom]")
      div.section(class="page login")
        IntroLogin
      div.section(class="page register")
        IntroRegister
      div.section(class="page contact")
        IntroContact(:animations="[contactTop]")
    footer-vue
</template>

<script lang="ts">
import Vue from "vue";
import IntroHome from "../components/intro-home.vue";
import IntroVision from "../components/intro-vision.vue";
import IntroLogin from "../components/intro-login.vue";
import IntroContact from "../components/intro-contact.vue";
import IntroRegister from "../components/intro-register.vue";
import Option from "../library/fpOption-home";
import Helper from "../library/helper";

const _home = new Option(
  ["home", "vision", "login", "register", "contact"],
  ["#0b1222", "#0b1222", "#0b1222", "#0b1222", "#0b1222"]
);

export default Vue.extend({
  name: "home",
  components: {
    IntroHome,
    IntroVision,
    IntroLogin,
    IntroRegister,
    IntroContact
  },
  mounted: function() {
    const _helper = new Helper();
    _helper.attachNavEvents();
    _helper.displayBookedItems();
    _home.start();
  },
  data() {
    return {
      options: _home.Option,
      homeTop: _home.findAnimation(`${_home.Anchors[0]}-top`),
      homeBottom: _home.findAnimation(`${_home.Anchors[0]}-bottom`),
      visionTop: _home.findAnimation(`${_home.Anchors[1]}-top`),
      visionBottom: _home.findAnimation(`${_home.Anchors[1]}-bottom`),
      contactTop: _home.findAnimation(`${_home.Anchors[4]}-top`)
    };
  }
});
</script>

<style lang="scss">
@import "./public/sass/home.scss";
</style>
