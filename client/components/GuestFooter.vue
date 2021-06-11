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
              <nuxt-link to="/" class="text-dark" exact>
                Home
              </nuxt-link>
            </p>

            <p class="my-3">
              <nuxt-link to="/orari" class="text-dark" exact>
                Orari
              </nuxt-link>
            </p>
            <p class="my-3">
              <nuxt-link to="/galleria" class="text-dark" exact>
                Galleria
              </nuxt-link>
            </p>
          </b-col>
          <b-col class="mt-3">
            <h5 class="text-uppercase">
              Altro
            </h5>

            <p>
              <nuxt-link to="/condizioni" class="text-dark" exact>
                Condizioni d'utilizzo
              </nuxt-link>
            </p>
            <p class="my-3">
              <nuxt-link to="/contatti" class="text-dark" exact>
                Contatti
              </nuxt-link>
            </p>
          </b-col>
        </b-row>
      </div>
      <div id="footer-copyright" class="bg-white text-dark text-center">
        <nuxt-link v-slot="{ href, navigate }" to="/condizioni" exact>
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
  name: 'GuestFooter',
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

#footer-copyright {
  margin-top: 3vh;
}

/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-active {
  color: #007bff !important;
  text-underline-offset: 2px;
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
