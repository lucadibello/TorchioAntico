<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <guest-swiper-slide :src="require('assets/img/carousel/jpeg/foto1.jpg')" />
    <guest-swiper-slide :src="require('assets/img/carousel/jpeg/foto2.jpg')" />
    <guest-swiper-slide :src="require('assets/img/carousel/jpeg/foto3.jpg')" />
    <guest-swiper-slide :src="require('assets/img/carousel/jpeg/foto4.jpg')" />
    <guest-swiper-slide :src="require('assets/img/carousel/jpeg/foto5.jpg')" />
    <div slot="pagination" class="swiper-pagination" />
  </swiper>
</template>

<script>
export default {
  name: 'GuestSwiper',
  data () {
    return {
      swiperOptions: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  }
}
</script>
