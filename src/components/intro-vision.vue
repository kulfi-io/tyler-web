<template lang="pug">
    div.intro-vision-vue
      AfterAnime.people-text(:animation="animations[0]")
      AfterAnime.collage-image(:animation="animations[1]")
      div.quote
        blockquote.media-standard Our anatomy is structured to work as a cohesive, singular being.         
          router-link.detail(class="health" to="/about") read more...
</template>

<script lang="ts">
import Vue from "vue";
import AfterAnime from './after-anime.vue';

export default Vue.extend({
  name: "intro-vision",
  components: {
    AfterAnime,
  },
  props: {
    animations: {
      type: Array,
      required: true
    }
  }

});
</script>