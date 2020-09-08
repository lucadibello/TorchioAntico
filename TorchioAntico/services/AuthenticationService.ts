import Api from '~/plugins/api'

export default {
  login (username: String, password: String) {
    return Api().post('login', { username, password })
  },
  isAlive (token: String) {
    return Api().post('login/alive', { jwt: token })
  }
}
