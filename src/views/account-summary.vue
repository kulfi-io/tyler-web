

<template lang="pug">
  div.account-summary
    header-vue
    full-page.fullpage(:options="options")
      AccountSummary(class="section page account-summary")
    footer-vue
</template>
<script lang="ts">
import Vue from "vue";
import AccountSummary from "../components/account-summary.vue";
import Options from "../library/fpOption";

const _options = new Options(["account-summary"], ["#0b1222"]);

export default Vue.extend({
  name: "summary-view",
  components: {
    AccountSummary
  },
  data: () => {
    return {
      options: _options.Option
    };
  }
});
</script>

<style lang="scss">
@import "./public/sass/account-summary.scss";
</style>
