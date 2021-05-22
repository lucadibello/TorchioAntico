<template>
  <client-only>
    <l-map ref="map" :zoom="20" :center="center">
      <l-tile-layer url="http://{s}.tile.osm.ch/switzerland/{z}/{x}/{y}.png" />

      <!-- Insert markers -->
      <l-marker v-for="marker in markers" :key="marker[0]" :lat-lng="marker">
        <l-popup>
          <h4>Al Torchio Antico</h4>
        </l-popup>
      </l-marker>

      <!-- Insert POIs-->
      <l-marker v-for="poi in pois" :key="poi.name" :lat-lng="poi.cords">
        <l-icon
          :v-if="true"
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          :icon-url="require('assets/img/markers/' + poi.iconUrl)"
        />

        <l-popup>
          <h4>{{ poi.name }}</h4>
          <p class="text-justify mb-3">
            {{ poi.text }}
          </p>

          <!-- Footer -->
          <p v-if="poi.address != false" class="mb-0">
            <b-icon-geo-alt /> {{ poi.address }}
          </p>

          <p class="mt-0">
            <a rel="noreferrer" target="_blank" :title="poi.name" :alt="poi.name" :href="poi.link">
              <b-icon-bullseye /> Vai al sito
            </a>
          </p>
        </l-popup>
      </l-marker>

      <!-- Custom control -->
      <l-control class="centerControl">
        <b-button variant="dark" @click="recenterMap">
          Centra mappa
        </b-button>
      </l-control>
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
    },
    pois: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    }
  },
  updated () {
    this.hideWatermark()
  },
  methods: {
    recenterMap () {
      this.$refs.map.mapObject.flyTo(this.center, 15)
    },
    flyTo (cords, zoom = 15) {
      this.$refs.map.mapObject.flyTo(cords, zoom)
    },
    hideWatermark () {
      document.getElementsByClassName('leaflet-control-attribution')[0].style.display = 'none'
    }
  }
}
</script>
