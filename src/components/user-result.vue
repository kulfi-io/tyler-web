<template lang="pug">
    div.users(class="hide") Users
        ul.user-list
            li.hide(data-cloned="false")
                div.split
                    div.split-60
                        div.full-name 
                        div.email
                    div.split-40(class="action")
                        div
                            a.view-user(class="link view" href="#" ) view-detail
                        div
                            a.add-note(class="link view" href="#") add-note
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "user-result"
});
</script>