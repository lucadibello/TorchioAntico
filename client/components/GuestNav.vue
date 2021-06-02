<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="light" variant="faded" fixed="top">
      <nuxt-link to="/" class="mr-2">
        <b-navbar-brand>
          <b-img :src="logo" class="d-inline-block align-middle logo" alt="Al Torchio Antico Logo" />
          <span class="title ml-2">Al Torchio Antico</span>
        </b-navbar-brand>
      </nuxt-link>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <li>
          <b-button v-b-toggle.sidebar-variant size="md" rounded variant="white">
            <b-icon icon="diagram2" aria-label="Open menu" />
          </b-button>
        </li>
      </b-navbar-nav>
    </b-navbar>

    <!-- Navbar -->
    <b-sidebar id="sidebar-variant" title="Navigazione rapida" bg-variant="white" text-variant="dark" shadow>
      <div class="px-3 py-2">
        <!-- Restourant Logo -->
        <b-img style="w-50" :src="logo" fluid />
        <!-- Each page section -->
        <b-list-group class="mt-4">
          <b-list-group-item v-for="section in sections" :key="section.number" :href="section.tag" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5>
                {{ section.number }}. {{ section.name }}
              </h5>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'GuestNav',
  data: () => ({
    logo: require('~/assets/img/logos/logo-white.png'),
    sections: [
      {
        number: 1,
        name: 'Introduzione',
        tag: '/contatti'
      },
      {
        number: 2,
        name: 'Dove trovarci',
        tag: ''
      },
      {
        number: 3,
        name: 'Servizi',
        tag: ''
      },
      {
        number: 4,
        name: 'Operatori telefonici',
        tag: ''
      },
      {
        number: 5,
        name: 'Stanze',
        tag: ''
      },
      {
        number: 6,
        name: 'Punti di interesse',
        tag: ''
      }
    ]
  })
}
</script>

<style scoped>
#navbar {
  background: linear-gradient(60deg, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0));
}
.logo {
  max-height: 70px;
  max-width: 70px;
}
</style>
