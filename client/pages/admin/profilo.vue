<template>
  <section>
    <h1>Il mio profilo</h1>
    <hr>
    <!-- Update form -->
    <b-form @submit.prevent="updateProfile" @reset="resetForm">
      <b-form-group
        id="input-group-1"
        label="Indirizzo email:"
        label-for="input-1"
        description="Il tuo indirizzo mail non sarà condiviso con nessun servizio o piattaforma esterna."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Inserisci il tuo indirizzo mail"
        />
      </b-form-group>

      <!-- Nome -->
      <b-form-group
        id="input-group-2"
        label="Nome:"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          required
          placeholder="Inserisci il tuo nome"
        />
      </b-form-group>

      <!-- Cognome -->
      <b-form-group
        id="input-group-3"
        label="Cognome:"
        label-for="input-surname"
      >
        <b-form-input
          id="input-surname"
          v-model="form.surname"
          type="text"
          required
          placeholder="Inserisci il tuo cognome"
        />
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="primary">
          Conferma modifiche
        </b-button>
        <b-button type="reset" variant="danger">
          Reset
        </b-button>
      </b-form-group>
    </b-form>
  </section>
</template>

<script>
// Import UserModel
import userService from '../../services/userService'

// Define component
export default {
  name: 'ProfileManager',
  data () {
    return {
      form: {
        name: '',
        surname: '',
        email: ''
      }
    }
  },
  mounted () {
    // Read data from Vuex store
    const user = this.$store.state.auth.user
    this.form.name = user.name
    this.form.surname = user.surname
    this.form.email = user.email
  },
  methods: {
    updateProfile () {
      // Send put request to User API
      // Show Swal modal
      this.$swal({
        title: 'Modifica profilo',
        text: 'Per completare la modifica del tuo account sarà necessario eseguire nuovamente il login. Vuoi continuare?',
        confirmButtonText: 'Continua',
        cancelButtonText: 'Annulla',
        showCancelButton: true,
        focusConfirm: true,
        icon: 'question'
      }).then((state) => {
        if (state) {
          // Login accepted

          // Send request to APIs
          userService.update(this.$store.state.auth.user.email, this.form).then((result) => {
            // Logout user
            this.$auth.logout()

            // Show notification
            this.$swal({
              title: 'Informazioni modificate correttamente. Necessario autenticarsi',
              icon: 'success',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
          }).catch((err) => {
            this.$swal({
              title: err,
              icon: 'error',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
          })
        }
      })
    },
    resetForm () {
      // Read data from Vuex store
      const user = this.$store.state.auth.user
      this.form.name = user.name
      this.form.surname = user.surname
      this.form.email = user.email
    }
  },
  layout: 'admin'
}
</script>
