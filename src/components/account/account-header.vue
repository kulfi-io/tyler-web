<template lang="pug">
    div.account-header
        div.title(v-if="title" :class="target")
            div.heading {{ title }}
            p
                a( v-if="href && hrefLabel" :href="href") {{hrefLabel}}
                span(v-if="subtext")  {{ subtext }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'account-header',
    props: [ 'target', 'title', 'href', 'hrefLabel', 'subtext'],
})
</script>

