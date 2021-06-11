<template>
  <main>
    <admin-nav @logout="logoutUser" />
    <b-container class="mt-5">
      <transition name="fade">
        <!-- Load page here -->
        <Nuxt v-if="$nuxt.isOnline" />
        <OfflinePage v-else />
      </transition>
    </b-container>
  </main>
</template>

<script>
// Import navbar from components
export default {
  name: 'AdminLayout',
  middleware: 'auth',
  methods: {
    logoutUser () {
      // Parse data + get fullname
      const user = this.$store.state.auth.user

      // Logout
      this.$auth.logout().then(() => {
        this.$swal({
          title: 'Arrivederci ' + user.name + '!',
          icon: 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      })
    }
  }
}
</script>

<style>
  a {
    color:inherit;
    text-decoration: none;
  }

  .nuxt-link-active {
    color: white !important;
    text-decoration: underline;
  }

  /* Swal notification blur */
  body.swal2-shown > [aria-hidden="true"] {
    filter: blur(10px);
  }

  body > * {
    transition: 0.1s filter linear;
  }
</style>
