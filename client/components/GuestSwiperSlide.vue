<template>
  <swiper-slide class="fill">
    <b-img class="swiper-img" :src="src" :alt="alt" fluid />
  </swiper-slide>
</template>

<script>
export default {
  name: 'GuestSwiperSlide',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false,
      default: () => {
        return ''
      }
    },
    title: {
      type: String,
      required: false,
      default: () => {
        return ''
      }
    },
    text: {
      type: String,
      required: false,
      default: () => {
        return ''
      }
    }
  }
}
</script>

<style>
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: auto;
}
.fill img {
  max-width:100%;
  max-height:100%;
}
</style>
