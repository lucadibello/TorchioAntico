<template>
  <main>
    <admin-nav @logout="logoutUser" />
    <b-container class="mt-5">
      <transition name="fade">
        <!-- Load page here -->
        <Nuxt v-if="onLine" />
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
  data: () => ({
    onLine: navigator.onLine,
    showBackOnline: false
  }),
  watch: {
    onLine (v) {
      if (v) {
        this.showBackOnline = true
        setTimeout(() => { this.showBackOnline = false }, 1000)
      }
    }
  },
  mounted () {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  },
  beforeDestroy () {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },
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
    },
    updateOnlineStatus (e) {
      const { type } = e
      this.onLine = type === 'online'
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
