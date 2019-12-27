<template lang="pug">
    main.intro-contact-vue
        div.content 
            AfterAnime.contact-banner(:animation="animations[0]")
            Note
</template>

<script lang="ts">

import Vue from 'vue';
import AfterAnime from '../components/after-anime.vue';
import Note from './intro-note.vue';

export default Vue.extend({
    name: 'contact',
    props: ['animations'],
    components: {
        Note,
        AfterAnime,
    },
    
});
</script>