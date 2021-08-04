<template>
  <carousel-3d :height="445" :width="750" :autoplay="true" :autoplay-timeout="3000">
    <slide v-for="(slide, i) in slides" :key="i" :index="i">
      <b-img :src="slide.src.webp" :alt="slide.alt" :height="445" :width="750" />
    </slide>
  </carousel-3d>
</template>

<script>
export default {
  name: 'GuestCarousel',
  data: () => ({
    slides: [
      {
        src: {
          // jpg: require('assets/img/carousel/jpeg/foto1.jpg'),
          webp: require('assets/img/carousel/webp/foto1.webp')
        },
        alt: 'Entrata ristorante'
      },
      {
        src: {
          // jpg: require('assets/img/carousel/jpeg/foto2.jpg'),
          webp: require('assets/img/carousel/webp/foto2.webp')
        },
        alt: 'Ristorante interno'
      },
      {
        src: {
          // jpg: require('assets/img/carousel/jpeg/foto3.jpg'),
          webp: require('assets/img/carousel/webp/foto3.webp')
        },
        alt: 'Cortile esterno'
      },
      {
        src: {
          // jpg: require('assets/img/carousel/jpeg/foto4.jpg'),
          webp: require('assets/img/carousel/webp/foto4.webp')
        },
        alt: 'Tavolo con piatto'
      }
    ]
  })
}
</script>

<style scoped>
.carousel-3d-slide {
  height: auto !important;
}
</style>
