<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand>
      Al Torchio Antico
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- Dashboard -->
        <b-nav-item>
          <nuxt-link to="/admin/dashboard">
            Dashboard
          </nuxt-link>
        </b-nav-item>
        <!-- Bookings -->
        <b-nav-item>
          <nuxt-link to="/admin/prenotazioni">
            Prenotazioni
          </nuxt-link>
        </b-nav-item>
        <!-- Users -->
        <b-nav-item>
          <nuxt-link to="/admin/utenti">
            Utenti
          </nuxt-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{ getName }}</em>
          </template>
          <!-- Edit profile -->
          <b-dropdown-item>
            <nuxt-link to="/admin/profilo">
              <b-icon-box /> Il mio profilo
            </nuxt-link>
          </b-dropdown-item>
          <!-- Logout -->
          <b-dropdown-item @click="emitLogout">
            <b-icon-power /> Esci
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'AdminNav',
  computed: {
    getName () {
      const user = this.$store.state.auth.user
      return user.name + ' ' + user.surname
    }
  },
  methods: {
    emitLogout () {
      this.$emit('logout')
    }
  }
}
</script>
