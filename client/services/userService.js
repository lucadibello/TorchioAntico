// Import Api base functionalities
import Api from '~/plugins/api'

// Export service features
export default {
  update (email, data) {
    return Api().patch('user/' + email, data)
  }
}
