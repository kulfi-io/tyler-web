<template lang="pug">
    div.about
        header-vue
        AboutVue
</template>

<script lang="ts">
import Vue from "vue";
import AboutVue from "../components/about.vue";
import Helper from "../library/helper";
import NavHelper from "../library/nav-helper";

export default Vue.extend({
  name: "about",
  components: {
    AboutVue
  },
  mounted: function() {
    this.$data.helper.displayloggedItems();
    this.$data.helper.attachNavEvents();
    NavHelper.setActiveNavItem("about");
  },
  data: function() {
    return {
      helper: new Helper()
    };
  }
});
</script>





