const BASE_URL = 'http://localhost:5000'

export default {
  // Environment variables
  env: {
    baseUrl: BASE_URL
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'torchio-antico',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Vue sweet alert
    'vue-sweetalert2/nuxt'
  ],

  // Enable Vuex store
  store: true,

  // Boostrap vue settings
  bootstrapVue: {
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },

  // Auth module settings
  auth: {
    // Options
    redirect: {
      login: '/admin/login',
      logout: '/admin/login',
      home: '/admin/dashboard'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: BASE_URL + '/api/auth/login', method: 'post', propertyName: 'token' },
          user: { url: BASE_URL + '/api/auth/user', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  },
  // Loading bar
  loading: {
    color: 'green',
    height: '5px'
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
