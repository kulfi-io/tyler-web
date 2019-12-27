<template lang="pug">
  div( ref="animeVue")
</template>

<script lang="ts">
import Vue from "vue";
import AfterAnime from '../library/after-anime';
export default Vue.extend({
  name: "anime-vue",
  props: ['animation'],
  mounted: function() {
      const _target = <HTMLElement>this.$refs.animeVue
      this.animation.init(_target);
  }
});
</script>

