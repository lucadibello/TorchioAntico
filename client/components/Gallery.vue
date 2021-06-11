<template>
  <div class="gallery">
    <div v-for="(image, i) in images" :key="i" class="image-container p-1">
      <b-img
        class="image img-fluid shadow-lg bg-body rounded"
        :src="image.url"
        :alt="image.alt"
        @click="$emit('update:gallery',i)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: auto;
    text-align: center;
    overflow: scroll;
  }
  .gallery img {
    cursor: pointer;
    max-height: 40vh;
  }

  .image-container {
    margin-top:2vh;
  }
</style>
