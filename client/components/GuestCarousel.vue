<template>
  <carousel-3d :height="445" :width="750" :autoplay="true" :autoplay-timeout="3000">
    <slide v-for="(slide, i) in slides" :key="i" :index="i">
      <b-img :src="slide.src" :alt="slide.alt" />
    </slide>
  </carousel-3d>
</template>

<script>
export default {
  name: 'GuestCarousel',
  data: () => ({
    slides: [
      { src: require('assets/img/carousel/jpeg/foto1.jpg'), alt: 'Entrata ristorante' },
      { src: require('assets/img/carousel/jpeg/foto2.jpg'), alt: 'Ristorante interno' },
      { src: require('assets/img/carousel/jpeg/foto3.jpg'), alt: 'Cortile esterno' },
      { src: require('assets/img/carousel/jpeg/foto4.jpg'), alt: 'Tavolo con piatto' }
    ]
  })
}
</script>

<style scoped>
.carousel-3d-slide {
  height: auto !important;
}
</style>
