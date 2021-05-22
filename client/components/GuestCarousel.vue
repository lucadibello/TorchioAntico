<template>
  <b-carousel
    id="carousel-1"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    background="#ababab"
    style="text-shadow: 1px 1px 2px #333;"
  >
    <!-- Text slides with image -->
    <b-carousel-slide
      class="custom-slide"
      caption="First slide"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
      :img-src="require('assets/img/carousel/foto1.webp')"
    />

    <!-- Text slides with image -->
    <b-carousel-slide
      caption="First slide"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
      :img-src="require('assets/img/carousel/foto2.webp')"
    />

    <!-- Text slides with image -->
    <b-carousel-slide
      caption="First slide"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
      :img-src="require('assets/img/carousel/foto3.webp')"
    />

    <!-- Text slides with image -->
    <b-carousel-slide
      caption="First slide"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
      :img-src="require('assets/img/carousel/foto4.webp')"
    />

    <!-- Text slides with image -->
    <b-carousel-slide
      caption="First slide"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
      :img-src="require('assets/img/carousel/foto5.webp')"
    />
  </b-carousel>
</template>

<script lang="ts">
export default {
  name: 'GuestCarousel',
  data () {
    return {
      slide: 0
    }
  }
}
</script>

<style>
.custom-slide img{
  max-height: 10% !important;
  object-fit: cover;
}
</style>
