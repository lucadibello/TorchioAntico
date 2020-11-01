<template>
  <main class="mt-5 center">
    <b-row id="columns-container">
      <b-col>
        <b-img id="image" fluid-grow :src="require('assets/img/404.svg')" />
      </b-col>
      <b-col>
        <!-- Title -->
        <h1 id="title" class="display-3">
          <strong>{{ title }}</strong>
        </h1>
        <p id="text" class="d-4">
          {{ text }}
        </p>
      </b-col>
    </b-row>
    <div class="w-100 text-center">
      <nuxt-link :to="link">
        <b-button pill variant="outline-primary">
          {{ btnText }}
        </b-button>
      </nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    title: {
      type: String,
      default: () => {
        return 'Errore 404!'
      }
    },
    text: {
      type: String,
      default: () => {
        return 'La risorsa richiesta non è presente nel server. Usa il pulsante per tornare alla homepage'
      }
    },
    link: {
      type: String,
      default: () => {
        return '/'
      }
    },
    btnText: {
      type: String,
      default: () => {
        return 'Torna alla homepage'
      }
    }
  },
  middleware: 'auth'
}
</script>

<style scoped>
#image {
  width: 100%;
  max-height: 30vh;
}
#text {
  font-size: 1.5em;
}
.center {
  width: 70%;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
}
#columns-container {
  align-items: center;
  justify-content: space-between;
}
#columns-container > * {
  margin: 5%;
}
@media only screen and (max-width: 900px) {
  .col {
    width: 100% !important;
  }

  #columns-container {
    display: block !important;
  }

  #image, #title, #text {
    text-align: center;
  }

  #image {
    transform: rotate(-30.5deg);
  }

  .center {
    margin-bottom: 5vh;
  }
}
</style>
