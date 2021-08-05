<template>
  <carousel-3d :height="445" :width="750" :autoplay="true" :autoplay-timeout="3000">
    <slide v-for="(slide, i) in slides" :key="i" :index="i">
      <b-img v-if="!slide.lazy" :src="slide.src.webp" :alt="slide.alt" />
      <b-img-lazy v-else :src="slide.src.webp" :alt="slide.alt" />
    </slide>
  </carousel-3d>
</template>

<script>
export default {
  name: 'GuestCarousel',
  data: () => ({
    slides: [
      {
        lazy: false,
        src: {
          // jpg: require('assets/img/carousel/jpeg/foto1.jpg'),
          webp: require('assets/img/carousel/webp/foto1.webp')
        },
        alt: 'Entrata ristorante'
      },
      {
        lazy: true,
        src: {
          // jpg: require('assets/img/carousel/jpeg/foto2.jpg'),
          webp: require('assets/img/carousel/webp/foto2.webp')
        },
        alt: 'Ristorante interno'
      },
      {
        lazy: true,
        src: {
          // jpg: require('assets/img/carousel/jpeg/foto3.jpg'),
          webp: require('assets/img/carousel/webp/foto3.webp')
        },
        alt: 'Cortile esterno'
      },
      {
        lazy: true,
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
