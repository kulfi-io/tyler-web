<template lang="pug">
  main.intro-home-vue
    div.top-wrapper
      AfterAnime.top-banner(:animation="animations[0]")
    div.bottom-wrapper
      AfterAnime.bottom-banner(:animation="animations[1]")
</template>

<script lang="ts">
import Vue from "vue";
import AfterAnime from '../components/after-anime.vue';
export default Vue.extend({
  name: "spash-vue",
  components: {
    AfterAnime,
  },
  props: ['animations']
});
</script>
