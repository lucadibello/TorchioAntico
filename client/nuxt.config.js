export default {
  // Environment variables
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:5000'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Homepage',
    titleTemplate: 'Al Torchio Antico | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/favicons/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'og:site_name', hid: 'og:site_name', content: 'Al Torchio Antico' }
    ],
    link: [
      // Add each favicon
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-icon-180x180.png' },
      { rel: 'icon', sizes: '192x192', href: '/favicons/android-icon-192x192.png' },
      { rel: 'icon', sizes: '144x144', href: '/favicons/android-icon-144x144.png' },
      { rel: 'icon', sizes: '96x96', href: '/favicons/android-icon-96x96.png' },
      { rel: 'icon', sizes: '36x36', href: '/favicons/android-icon-72x72.png' },
      { rel: 'icon', sizes: '48x48', href: '/favicons/android-icon-48x48.png' },
      { rel: 'icon', sizes: '36x36', href: '/favicons/android-icon-36x36.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'msapplication-config', href: '/browserconfig.xml' },
      // Add fonts from fonts.google.com
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'swiper/swiper-bundle.min.css',
    'vue-tel-input/dist/vue-tel-input.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/carousel-3d', mode: 'client' },
    { src: '~/plugins/line-chart', mode: 'client' },
    { src: '~/plugins/vue-tel-input', mode: 'client' },
    { src: '~/plugins/vue-gallery-slideshow', mode: 'client' },
    { src: '~/plugins/vue-cookie-law', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
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
    'vue-sweetalert2/nuxt',
    // Optimized Moment.JS
    '@nuxtjs/moment',
    // Nuxt Leaflet.js
    'nuxt-leaflet'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.baseUrl + '/api'
  },

  // Pwa manifest options: https://pwa.nuxtjs.org/manifest/
  pwa: {
    manifest: {
      name: 'Ristorante Al Torchio Antico',
      short_name: 'Al Torchio Antico',
      lang: 'it',
      theme_color: '#ff9800',
      background_color: '#000000',
      display: 'standalone',
      useWebmanifestExtension: false
    }
  },

  // Router settings (active link)
  router: {
    linkExactActiveClass: 'text-primary'
  },

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
    token: {
      required: true,
      property: 'token',
      type: 'Bearer'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: process.env.baseUrl + '/api/auth/login', method: 'post' },
          user: { url: process.env.baseUrl + '/api/auth/user', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
