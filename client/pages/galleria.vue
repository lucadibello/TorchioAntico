<template>
  <section id="gallery">
    <b-container fluid>
      <h2 class="display-5">
        <span class="title">Galleria</span>
        <b-badge variant="success" class="mx-3">
          {{ images.length }} Foto
        </b-badge>
      </h2>
      <!-- Show only a row -->
      <p>Clicca su una foto per ingrandirla</p>

      <!-- Show gallery -->
      <gallery :images="images" @update:gallery="index = $event" />
      <client-only>
        <!-- Show lightbox if clicked -->
        <vgs :images="images" :index="index" @close="index = null" />
      </client-only>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'Galleria',
  layout: 'default',
  data: () => ({
    images: [
      require('assets/img/gallery/foto1.jpg'),
      require('assets/img/gallery/foto2.jpg'),
      require('assets/img/gallery/foto3.jpg'),
      require('assets/img/gallery/foto4.jpg'),
      require('assets/img/gallery/foto5.jpg'),
      require('assets/img/gallery/foto6.jpeg'),
      require('assets/img/gallery/foto7.jpeg'),
      require('assets/img/gallery/foto8.jpeg'),
      require('assets/img/gallery/foto9.jpeg'),
      require('assets/img/gallery/foto10.jpg')
    ],
    index: null
  }),
  head: () => ({
    title: 'Galleria',
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'Album fotografico digitale del Ristorante Al Torchio Antico'
    }, {
      hid: 'og:description',
      name: 'og:description',
      content: 'Album fotografico digitale del Ristorante Al Torchio Antico'
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Galleria'
    }]
  })
}
</script>
