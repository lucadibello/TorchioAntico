<template>
  <article>
    <h1>Prenotazioni</h1>
    <hr>
    <b-jumbotron header="Gestione stanze" lead="Gestisci semplicemente le stanze disponibili per le prenotazioni">
      <nuxt-link to="/admin/prenotazioni/stanze">
        <b-button variant="success">
          <b-icon-arrow-return-right /> Gestisci stanze
        </b-button>
      </nuxt-link>
    </b-jumbotron>
    <!-- Tabs -->
    <b-tabs content-class="mt-3 mb-5">
      <!-- View tab -->
      <b-tab title="Visualizzazione" active>
        <h4>Visualizzazioni disponbili</h4>
        <b-card-group deck>
          <b-card
            class="action-thumbnail"
            :img-src="require('~/assets/img/isometric-clipboard.svg')"
            img-alt="Visualizza prenotazioni"
            img-top
          >
            <b-card-text>
              Visualizza tutte le prenotazioni effettuate nel sistema. Esse possono essere ordinate, filtrate e suddivise su più
              pagine per permetterne una facile visualizzazione
            </b-card-text>
            <nuxt-link to="/admin/prenotazioni/tabella">
              <b-button variant="primary">
                Visualizza prenotazioni in formato tabellare
              </b-button>
            </nuxt-link>
          </b-card>

          <b-card
            class="action-thumbnail"
            :img-src="require('~/assets/img/isometric-calendar.svg')"
            img-alt="Modifica prenotazioni"
            img-top
          >
            <b-card-text>
              Visualizza tutte le prenotazioni in un calendario che permette al gestore di vedere i dati all'interno di una linea temporale specifica. Non adatto per statistiche.
            </b-card-text>
            <nuxt-link to="/admin/prenotazioni/calendario">
              <b-button variant="primary">
                Visualizza prenotazioni in un calendario
              </b-button>
            </nuxt-link>
          </b-card>
        </b-card-group>
      </b-tab>
      <!-- Create booking -->
      <b-tab title="Prenota">
        <h4>Aggiungi prenotazione</h4>
      </b-tab>
    </b-tabs>
  </article>
</template>

<style scoped>
.action-thumbnail img {
  max-height: 30vh;
}
</style>

<script>
export default {
  name: 'Prenotazioni',
  layout: 'admin'
}
</script>
