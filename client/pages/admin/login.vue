<template>
  <b-container id="main-container" fluid>
    <b-form id="form" @submit.prevent="login">
      <div id="form-content" class="mb-3">
        <!-- Logo here -->
        <b-img id="logo" :src="logo" alt="Al Torchio Antico logo" />

        <h2 class="text-left p-2">
          Esegui l'accesso
        </h2>
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
      </div>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  middleware: 'auth',
  data () {
    return {
      form: {
        password: '',
        email: ''
      },
      logo: require('~/assets/img/logos/logo-white.png')
    }
  },
  methods: {
    login () {
      if (this.isEmailValid()) {
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
          // eslint-disable-next-line no-console
          console.warn(err)
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
          } else if (err.response) {
            // Print error
            this.$swal({
              title: err.response.data.error,
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
      } else {
        // Show email error
        this.$swal({
          title: "L'email inserita non è valida. Controlla l'email e riprova.",
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      }
    },
    isEmailValid () {
      // Check if email is valid
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.form.email)
    }
  },
  auth: 'guest'
}
</script>

<style scoped>
#main-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: column;
}

#form {
  border-radius: 25px;
  background: #fff;
  padding: 20px;
  text-align: center !important;
}

form {
  width: 700px;
  margin: auto
}

#logo {
  max-height: 330px;
  max-width: auto;
}

#main-container {
  background-color: #007bff !important;
}

@media only screen and (max-width: 750px) {
  form {
    width: 100%;
  }

  #logo {
    max-height: 200px;
    max-width: auto;
  }
}
</style>
