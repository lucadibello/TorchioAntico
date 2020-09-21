// Import Api base functionalities
import Api from '~/plugins/api'

// Export service features
export default {
  login (email, password) {
    return Api().post('auth', { email, password })
  },
  isAlive (jwtToken) {
    return Api().post('auth/alive', { token: jwtToken })
  },
  setToken (token) {
    sessionStorage.setItem('token', token)
  },
  getToken () {
    return sessionStorage.getItem('token')
  }
}
