<template>
  <b-container fluid>
    <NotFound link="/admin/dashboard" btn-text="Torna alla dashboard" text="Sembra proprio che ti sei perso.. clicca il pusante per tornare alla dashboard del pannello di amministrazione!" />
  </b-container>
</template>

<script>
export default {
  name: 'AdminGeneric',
  middleware: 'auth'
}
</script>
