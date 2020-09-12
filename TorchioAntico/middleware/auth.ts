import { Middleware } from '@nuxt/types'
import AuthService from '@/services/AuthenticationService'

const authMiddleware: Middleware = async function ({ store, redirect, req }) {
  // Make Vuex persistent
  if (!store.state.auth && req.headers.cookie) {
    // Get saved token
    const token = req.headers.cookie.split('=')[1]
    if (token) {
      // console.log('🔐 Restoring Vuex session state from Cookie')
      // Save token inside Vuex store
      store.commit('setAuth', token)
    }
  }

  // Check if a new token has been set
  if (store.state.auth) {
    // Check if token is valid or not
    await AuthService.isAlive(store.state.auth).then(() => {
      // Token is valid, check if the user is inside the login page
      if (req.url === '/admin/login') {
        // Redirect to login page
        redirect('/admin/dashboard')
      }
    }).catch((err) => {
      // Trigger notification
      if (err.response) {
        // Server responded

        // TODO: show notification
        console.warn(err)
      } else {
        // Server does not respond

        // TODO: Show notification
        console.warn(err)

        // eslint-disable-next-line no-lonely-if
        if (req.url !== '/admin/login') {
          // Redirect to login page
          redirect('/admin/login')
        }
      }
    })
  } else {
    // Check current URL
    // eslint-disable-next-line no-lonely-if
    if (req.url !== '/admin/login') {
      // Redirect to login page
      redirect('/admin/login')
    }
  }
}

export default authMiddleware
