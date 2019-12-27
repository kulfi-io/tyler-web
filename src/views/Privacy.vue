<template lang="pug">
    div.privacy
      header-vue
      Privacy
</template>

<script lang="ts">
import Vue from "vue";
import Privacy from "../components/privacy.vue";
import Helper from "../library/helper";
import NavHelper from "../library/nav-helper";

export default Vue.extend({
  name: "privacy",
  components: {
    Privacy
  },
  mounted: function() {
    this.$data.helper.displayloggedItems();
    this.$data.helper.attachNavEvents();
    NavHelper.setActiveNavItem("privacy");
  },
  data: function() {
    return {
      helper: new Helper()
    };
  }
});
</script>

