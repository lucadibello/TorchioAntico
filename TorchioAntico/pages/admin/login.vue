<template>
  <el-container id="container">
    <el-card class="login" shadow="always">
      <div slot="header" class="clearfix">
        <span>Login</span>
      </div>

      <el-form ref="loginForm" :model="login">
        <!-- Email -->
        <el-form-item
          prop="email"
          label="E-mail"
          :rules="[
            { required: true, message: 'Per favore inserisci un indirizzo E-Mail', trigger: 'blur' },
            { type: 'email', message: 'Per favore inserisci un indirizzo E-Mail valido', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="login.email" />
        </el-form-item>

        <!-- Password -->
        <el-form-item
          prop="password"
          label="Password"
          :rules="[
            { required: true, message: 'Per favore inserisci una password', trigger: 'blur' }
          ]"
        >
          <el-input v-model="login.password" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="loginTest()">
            Accedi
          </el-button>
          <el-button @click="reset">
            Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
// import LoginForm from '@/components/LoginForm'
import AuthenticationService from '~/services/AuthenticationService'

export default {
  name: 'Login',
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginTest () {
      // Check if all data was set
      this.$refs.loginForm.validate().then(() => {
        // All data is valid, send request to APIs
        AuthenticationService.login(this.login.email, this.login.password).then((result) => {
          // Recived response
          console.log(result)
        }).catch((err) => {
          this.$notify.error({
            title: 'Errore login',
            message: err
          })
        })
      }).catch(() => {
        // Data not valid
        this.$notify.error({
          title: 'Dati non validi',
          message: 'Controlla di aver un email ed una password valida'
        })
      })
    },
    reset () {
      // Reset inputs
      this.login.email = this.login.password = ''
    }
  },
  middleware: 'auth'
}
</script>

<style scoped>
.login {
  width: 50%;
  position: fixed;
  top: 35%;
  left: 50%;

  /* bring your own prefixes */
  transform: translate(-50%, -35%);
}

</style>
