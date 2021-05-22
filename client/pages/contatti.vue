<template>
  <b-container>
    <h1>Contatti qui</h1>
  </b-container>
</template>

<script>
export default {
  name: 'Contatti',
  layout: 'default',
  head: () => ({
    title: 'Contatti',
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'Contatta Il Torchio Antico, sia tramite telefono che tramite mail'
    }, {
      hid: 'og:description',
      name: 'og:description',
      content: 'Contatta Il Torchio Antico, sia tramite telefono che tramite mail'
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Contatti'
    }]
  })
}
</script>
