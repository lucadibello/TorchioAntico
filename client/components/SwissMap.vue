<template>
  <client-only>
    <l-map :zoom="20" :center="center">
      <l-tile-layer url="http://{s}.tile.osm.ch/switzerland/{z}/{x}/{y}.png" />
      <l-marker v-for="marker in markers" :key="marker[0]" :lat-lng="marker" />
    </l-map>
  </client-only>
</template>

<script>
export default {
  name: 'Map',
  props: {
    center: {
      type: Array,
      required: true
    },
    markers: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  }
}
</script>
