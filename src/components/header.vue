<template lang="pug">
  div.header-wrapper
    header.initial(data-mode="sticky")
      nav.primary-navigation(aria-label="Primary")
        a.logo(href="/" title="Tyler" itemscope itemtype="http://schema.org/Organization" itemprop="url")
          svg(id="head-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288.88 26.71")
            title() Tyler-Logo
            text.logo(transform="translate(0 20.4)") T
              tspan(x="13.3" y="0" style="letter-spacing:0.000020345052083333332em") yler Chambe
              tspan(x="168.86" y="0" style="letter-spacing:-0.006978352864583333em") r
              tspan(x="178.53" y="0" style="letter-spacing:-0.000020345052083333332em") lain, CMT
        a.toggle(@click="toggleNav")
          svg( xmlns="http://www.w3.org/2000/svg" id="hamburger-nav" width="32"
            height="18" viewBox="0 0 32 18")
            g(fill="none" fill-rule="evenodd" stroke="#515769"
              stroke-linecap="square" stroke-width="2" transform="translate(1)")
              path(d="M0 1L30 1M0 9L30 9M0 17L30 17")
        div.menu(class="initial")
          a.toggle(@click="toggleNav")
            svg(xmlns="http://www.w3.org/2000/svg" width="14" height="26" viewBox="0 0 14 26")
              g(fill="none" fill-rule="evenodd" stroke="#FFF"
                stroke-linecap="square" stroke-width="2" transform="translate(2 2)")
                path(d="M0,11 L10,0")
                path(d="M0,22 L10,11" transform="matrix(1 0 0 -1 0 33)")
          ul.pages(class="default active-nav")
            li.nav-home(class="active")
              a(href="/") Home
            li.nav-login()
              a(href="/#login") Login
            li.nav-register()
              a(href="/#register") Register
            li.nav-contact()
              a(href="/#contact") Contact
            li.nav-about()
              a(href="/about") About
          ul.pages(class="logged-in")
            li.nav-home(class="active")
              a(href="/") Home
            li.nav-logout()
              a.logout(href="/") Logout
            li.nav-register()
              a(href="/#register") Register
            li.nav-contact()
              a(href="/#contact") Contact
            li.nav-schedule()
              a(href="/schedule") Schedule
            li.nav-account-summary()
              a(href="/account") Account
            li.nav-send-email()
              a(href="/note") Note
            li.nav-about()
              a(href="/about") About
          SocialFooter
    div.book
</template>

<script lang="ts">
import Vue from "vue";
import SocialFooter from "./social-footer.vue";
export default Vue.extend({
  name: "header-vue",
  components: {
    SocialFooter
  },
  methods: {
    toggleNav: function(e: Event) {
      const _menu = document.querySelector(".menu");

      if (_menu) {
        _menu.classList.toggle("active");
        const _active = _menu.classList.contains("active");
      }
    }
  }
});
</script>

