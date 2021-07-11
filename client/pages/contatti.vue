<template>
  <b-container style="height:70vh;">
    <h1 class="title">
      Contatti
    </h1>
    <hr>
    <!-- Torchio contact -->
    <b-row>
      <b-col id="torchioContact">
        <h2 class="h4">
          Al Torchio Antico, <span class="text-primary">Staff</span>
        </h2>
        <a
          href="tel:+41916464994"
          rel="author"
          title="Chiama Il Torchio Antico"
          alt="Chiama Il Torchio Antico"
          class="contact"
        >
          <b-icon-telephone-forward /> +41 91 646 49 94
        </a>
        <!-- Email -->
        <a
          href="mailto:rema.2018.restourant@gmail.com"
          rel="author"
          title="Scrivi al Torchio Antico"
          alt="Scrivi al Torchio Antico"
          class="contact"
        >
          <b-icon-mailbox /> rema.2018.restourant@gmail.com
        </a>
      </b-col>
    </b-row>
    <!-- My contact -->
    <b-row class="mt-5">
      <b-col>
        <h2 class="h4">
          Luca Di Bello - <span class="text-primary">Web Master</span>
        </h2>
        <!-- Email -->
        <a
          href="mailto:info@lucadibello.ch"
          rel="author"
          title="Contatta Luca Di Bello"
          alt="Contatta Luca Di Bello"
          class="contact"
        >
          <b-icon-mailbox /> info@lucadibello.ch
        </a>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Contatti',
  layout: 'default',
  head: () => ({
    title: 'Contatti',
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'Contatta Il Torchio Antico, sia tramite telefono che tramite mail'
    }, {
      hid: 'og:description',
      name: 'og:description',
      content: 'Contatta Il Torchio Antico, sia tramite telefono che tramite mail'
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Contatti'
    }]
  })
}
</script>

<style scoped>
  .contact {
    margin-top: .3rem;
  }

  .container {
    height: 65vh;
  }

  /* CSS Responsive query */
  @media only screen and (max-width: 600px) {
    h2 {
      text-align: center;
    }
    .contact {
      display: block;
      text-align: center;
    }

    .spacer {
      height: 40vh;
    }

    .container {
      margin-bottom: 4rem;
    }
  }
</style>
