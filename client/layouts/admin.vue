<template>
  <main>
    <admin-nav @logout="logoutUser" />
    <b-container class="mt-5">
      <!-- Load page here -->
      <Nuxt />
    </b-container>
  </main>
</template>

<script>
// Import navbar from components
export default {
  name: 'AdminLayout',
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
  },
  middleware: 'auth'
}
</script>

<style>
  a {
    color:inherit;
    text-decoration: none;
  }
</style>
