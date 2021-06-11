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
    <b-sidebar
      id="sidebar-variant"
      title="Navigazione rapida"
      bg-variant="white"
      text-variant="dark"
      shadow
    >
      <div class="my-3 mx-2 text-center">
        <!-- Restourant Logo -->
        <b-img class="logo-menu" :src="logo" fluid />
        <!-- Each page section -->
        <div id="links">
          <div v-for="section in sections" :key="section.number" class="link-item my-2">
            <nuxt-link :to="section.page" exact>
              <h5 style="text-primary">
                {{ section.name }}
              </h5>
            </nuxt-link>
          </div>
        </div>
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
        name: 'Homepage',
        page: '/'
      },
      {
        name: 'Orari',
        page: '/orari'
      },
      {
        name: 'Galleria',
        page: '/galleria'
      },
      {
        name: 'Contatti',
        page: '/contatti'
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
  max-height: 50px;
  max-width: 50px;
}

.logo-menu {
  max-width: 70%;
  height: auto;
}

#links {
  margin-top: 5vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

#links h5 {
  flex-grow: 1;
  height: auto;
}

/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-active {
  color: #007bff !important;
  text-underline-offset: 2px;
}
</style>
