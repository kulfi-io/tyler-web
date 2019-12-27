<template lang="pug">
    div.validate
      header-vue
      full-page.fullpage( :options="options")
        div(class="section page validate")
          ValidateVue
</template>

<script lang="ts">
import Vue from "vue";
import ValidateVue from "../components/validate-login.vue";
import Option from "../library/fpOption";

const _validate = new Option(["validate"], ["#0b1222"]);

export default Vue.extend({
  name: "validate-view",
  components: {
    ValidateVue
  },
  data() {
    return {
      options: _validate.Option
    };
  }
});
</script>

<style lang="scss">
@import "./public/sass/validate.scss";
</style>
