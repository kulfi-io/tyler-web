<template lang="pug">
    div.notes Notes
        ul.account-note-list
            li.hide(data-cloned="false")
                div.split()
                    div.split-third(class="note-title")
                    div.split-third(class="note")
                    div.split-third(class="created")
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "account-note",
  props: ["account"]
});
</script>