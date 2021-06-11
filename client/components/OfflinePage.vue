<template>
  <b-container class="text-center" fluid>
    <b-img id="logo" :src="require('~/assets/img/no-connection.svg')" alt="Logo nessuna connesssione" />
    <h1 id="title">
      Oops! A quanto pare sei offline.. potrai utilizzare il pannello admin quando tornerai online
    </h1>
  </b-container>
</template>

<script>
export default {
  name: 'Offline'
}
</script>

<style scoped>
#logo {
  text-align: center;
  max-height: 50vh;
  color: red;
}

</style>
