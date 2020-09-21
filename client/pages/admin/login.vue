<template>
  <b-container>
    <b-form @submit.prevent="login">
      <h1>Accedi</h1>
      <b-form-group
        id="input-group-1"
      >
        <b-form-input
          id="email-input"
          v-model="form.email"
          type="email"
          autocomplete="email"
          required
          placeholder="Inserisci E-Mail"
        />

        <b-form-input
          id="password-input"
          v-model="form.password"
          class="mt-3"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Inserisci password"
        />
      </b-form-group>

      <b-button type="submit" variant="primary">
        Accedi
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
/* Import Auth service */
// import AuthService from '../../services/authService'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        password: '',
        email: ''
      }
    }
  },
  methods: {
    login () {
      // Try new login
      this.$auth.loginWith('local', { data: this.form }).then((result) => {
        // Show swal notification
        const user = this.$store.state.auth.user
        // Show notification
        this.$swal({
          title: 'Benvenuto ' + user.name + '!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      }).catch((err) => {
        if (err.response && err.response.data.type === 'ER_LOGIN_FAILED') {
          // Specific error
          this.$swal({
            title: 'Email o password errati',
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        } else {
          this.$swal({
            title: 'Accesso al sistema',
            text: 'C\'è stato un errore non conosciuto, riprova più tardi',
            icon: 'error',
            showConfirmButton: true
          })
        }
      })
    }
  },
  middleware: 'auth',
  auth: 'guest'
}
</script>
