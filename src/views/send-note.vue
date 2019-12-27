<template lang="pug">
  div.send-note-vue
    header-vue
    div.note-vue
      full-page.fullpage( :options="options")
        div.section(class="page send-email")
          NoteVue
</template>

<script lang="ts">
import Vue from "vue";
import NoteVue from "../components/send-note.vue";
import Option from "../library/fpOption";

const _note = new Option(["send-email"], ["#0b1222"]);

export default Vue.extend({
  name: "send-note-view",
  components: {
    NoteVue
  },
  data: () => {
    return {
      options: _note.Option
    };
  }
});
</script>

<style lang="scss">
@import "./public/sass/note.scss";
</style>
