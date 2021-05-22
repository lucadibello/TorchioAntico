<template>
  <div class="d-flex flex-column text-white">
    <footer class="p-4">
      <div id="footer-content" class="bg-white text-dark">
        <!-- Footer columns -->
        <b-row>
          <b-col class="mt-3">
            <h5 class="text-uppercase">
              Web Master
            </h5>
            <p>
              <a href="https://lucadibello.ch/" target="_blank" rel="noreferrer" class="text-dark">
                lucadibello.ch
              </a>
            </p>
          </b-col>
          <b-col class="mt-3">
            <h5 class="text-uppercase">
              Naviga
            </h5>

            <p>
              <nuxt-link to="/" tag="a" class="text-dark">
                Home
              </nuxt-link>
            </p>
          </b-col>
          <b-col class="mt-3">
            <h5 class="text-uppercase">
              Altro
            </h5>

            <p>
              <router-link to="/condizioni" tag="a" class="text-dark">
                Condizioni d'utilizzo
              </router-link>
            </p>
            <p>
              <router-link to="/contatti" tag="a" class="text-dark">
                Contatti
              </router-link>
            </p>
          </b-col>
        </b-row>
      </div>
      <div id="footer-copyright" class="bg-white text-dark text-center">
        <nuxt-link v-slot="{ href, navigate }" to="/condizioni">
          <span>
            <a class="font-weight-bold text-dark" :href="href" @click="navigate">
              Al Torchio Antico
            </a>
            &copy; Copyright {{ currentYear }}
          </span>
        </nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
a,
a:hover,
a:active,
a:visited {
  color: white;
}

.bg-cyan {
  background-color: #0077b6;
}

#footer-content p {
  margin-bottom: 2px !important;
}

#footer-content {
  text-align: left !important;
}

@media only screen and (max-width: 700px) {
  .row {
    display: block !important;
    text-align: center;
  }

  #footer-content h5 {
    margin-bottom: 2vh;
  }
}
</style>
