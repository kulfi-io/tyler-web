<template lang="pug">
    div.tabs
      input.tab-input(name="tabs" type="radio" id="account" checked="checked")
      label.tab-label(for="account")
      div.panel
        //- AccountSummary
      input.tab-input(name="tabs" type="radio" id="search" checked="checked")
      label.tab-label(for="search")
      div.panel
        //
      input.tab-input(name="tabs" type="radio" id="notes" checked="checked")
      label.tab-label(for="notes")
      div.panel
        //
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "tabs"
});
</script>