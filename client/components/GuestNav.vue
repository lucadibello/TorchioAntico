<template>
  <div>
    <b-navbar id="navbar" toggleable="lg" type="light" variant="white" fixed="top">
      <b-navbar-brand>
        Al Torchio Antico
      </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item href="#">
          Home
        </b-nav-item>
        <b-nav-item href="#" disabled>
          Chi siamo
        </b-nav-item>
        <b-nav-item href="#" disabled>
          Storia
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button v-b-toggle.sidebar-variant size="md" rounded variant="white">
          <b-icon icon="three-dots" aria-label="Open menu" />
        </b-button>
      </b-navbar-nav>
    </b-navbar>

    <!-- Navbar -->
    <b-sidebar id="sidebar-variant" title="Navigazione rapida" bg-variant="white" text-variant="dark" shadow>
      <div class="px-3 py-2">
        <!-- List of things to insert -->

        <!--
          - Catalogo animato
          - Portfolio
          - Attrazioni da vedere in zona
          - Costo menu / camere
        -->
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'GuestNav'
}
</script>

<style scoped>
#navbar {
  background: linear-gradient(60deg, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0));
}
</style>
