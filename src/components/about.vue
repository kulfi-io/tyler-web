<template lang="pug">
  div.about-vue
    main
      header.initial
      article
        div.primary
          div.image
            img(src="../../public/img/tyler.png" alt="tyler")
          div.text
            blockquote.blockquote Our anatomy is structured to work as a cohesive, singular being
        section
          p Our anatomy is structured to work as a cohesive, singular being. Muscles, tendons, and ligaments can be identified, felt, and touched. But it's the layers within, the unexpected (and often magical) connections between the obvious and the less understood, that really excite me: how gentle stretching can allow the opposing muscle to relax; how non-invasive Vagus nerve work can almost immediately relax the entire body; how unraveling the fascia (the stuff that holds it all in place, and is usually neglected in massage) is so critical to overall muscle health; how simply receiving touch can invigorate the soul. 
          p I've heard my role as a massage therapist described as that of a chameleon, and that resonates. Occasionally, we need to get deep into the muscles. There may be painful trigger points to be released, or a specific injury requiring attention. You may be pregnant, have tech-neck, or may be holding stress in your shoulders or abdomen. You may have pain walking uphill (but not down), chronic headaches, or unidentified pain in your back. You likely have some combination of "all of the things", and my passion is to work together to tailor the bodywork specifically for your needs, on that day. Then, ideally, a plan to address goals over time.
          p It amazes me how many massage therapists don't put any thought into the music. It's such a critical element, since we're really working with all the senses. From chamber music if you want to be soothed, to nature sounds if you want to zone out, to underground techno if you want to be energized, we'll find the right fit.
          p Perhaps most importantly, I firmly believe in the power of human touch. It's OK to want that, to simply receive pleasure, to have a safe place where you can just feel good. To have an energetically clean and soft space to relax. It's fascinating how often I observe clients who simply want to receive a relaxing, pleasurable massage, and are almost embarrassed to say it, as if it's not a good enough reason. IT IS!
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "about-vue"
});
</script>

<style scoped>
article {
  animation-duration: 1s;
  animation-name: fadeIn;
  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);
}
</style>

