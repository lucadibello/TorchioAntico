<template>
  <!-- Main container -->
  <main>
    <!-- Guest carousel container -->
    <b-container fluid>
      <!-- Guest carousel -->
      <guest-swiper class="mt-2" />
    </b-container>

    <!-- Location info section -->
    <b-container id="locationInfo" class="mt-5" fluid>
      <h1 class="display-4">
        Dove trovarci
      </h1>
      <b-row>
        <b-col style="height:30vh;">
          <p><b>Il Torchio Antico</b> si trova nel cuore del centro storico di Arzo.</p>

          <p>Piazzetta Guido Bustelli 1, 6864 Arzo</p>
          <p>10 minuti da mendrisio - 2 minuti dal confine</p>
        </b-col>
        <b-col>
          <div id="map-container" class="h-100">
            <!--
            <swiss-map :center="[45.87633, 8.94116]" :markers="[[45.87633, 8.94116]]" />
            -->
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.605828361013!2d8.945066260620326!3d45.87523820321747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47842a1fd7bc1c01%3A0x62a2fda1ea865110!2sRistorante%20Al%20Torchio%20Antico!5e0!3m2!1sen!2sch!4v1604240957773!5m2!1sen!2sch"
              width="600"
              height="450"
              frameborder="0"
              style="border:0;"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-container id="story" class="mt-5" fluid>
      <h1 class="display-4">
        Storia
      </h1>
    </b-container>

    <b-container id="story" class="mt-5" fluid>
      <h1 class="display-4">
        Punti di interesse
      </h1>

      <!-- MAP -->
      <div class="w-100 mt-5">
        <swiss-map style="height:30vh;" class="mt-4" :center="[45.87633, 8.94116]" :markers="[[45.87633, 8.94116]]" />
      </div>
      <!-- POI list -->
      <div class="p-4">
        <h3 class="d-inline mr-2">
          Legenda
        </h3>

        <b-icon id="legend-control" :icon="isLegendOpen ? 'caret-up-fill' : 'caret-down-fill'" @click="isLegendOpen = !isLegendOpen" />

        <!-- Collapsible section -->
        <b-collapse v-model="isLegendOpen">
          <div class="text-center mb-5">
            <p class="lead">
              <b-icon-circle-fill variant="primary" /> <b>Al Torchio Antico</b>
            </p>
            <b-button class="w-50 mt-2" variant="light" pill>
              Centra mappa
            </b-button>
          </div>
          <!-- List of POIs -->

          <!-- First row -->
          <b-row>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-success text-white">1</span> Grotta dell'orso
                <b-button class="w-100 mt-2" variant="light" pill>
                  Vai
                </b-button>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-info text-white">2</span> Percorso del cemento
                <b-button class="w-100 mt-2" variant="light" pill>
                  Vai
                </b-button>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-amber text-white">3</span> Rosa di Pietra
                <b-button class="w-100 mt-2" variant="light" pill>
                  Vai
                </b-button>
              </p>
            </b-col>
          </b-row>
          <!-- Second row -->
          <b-row>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-brown text-white">4</span> FoxTown
                <b-button class="w-100 mt-2" variant="light" pill>
                  Vai
                </b-button>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-violet text-white">5</span> Parco archeologico
                <b-button class="w-100 mt-2" variant="light" pill>
                  Vai
                </b-button>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-pink text-white">6</span> Museo dei Fossili
                <b-button class="w-100 mt-2" variant="light" pill>
                  Vai
                </b-button>
              </p>
            </b-col>
          </b-row>

          <!-- Third row -->
          <b-row>
            <p class="lead">
              <span class="marker-legend bg-unique text-white">7</span> Monte San Giorgio
              <b-button class="w-100 mt-2" variant="light" pill>
                Vai
              </b-button>
            </p>
          </b-row>
        </b-collapse>
      </div>
    </b-container>
  </main>
</template>

<script>
export default {
  name: 'Homepage',
  layout: 'default',
  data () {
    return {
      isLegendOpen: false,
      pois: [
        {
          name: 'Grotta dell\'Orso',
          address: false,
          link: 'https://www.ticino.ch/it/commons/details/La-Grotta-dell-Orso/14911.html',
          cords: [45.930283, 9.020226],
          text: 'La grotta, scoperta alcuni anni orsono, è stata aperta al pubblico nel 1999: in essa si possono vedere parecchie ossa ritrovate di orsi delle caverne'
        },
        {
          name: 'Percorso del cemento',
          address: 'Via dei Grotti 3, 6834 Morbio Inferiore',
          link: 'https://percorsodelcemento.ch/',
          cords: [45.85583, 9.0128],
          text: 'Nel cuore del Parco delle Gole della Breggia, i terreni e le imponenti strutture di un cementificio in disuso sono stati riqualificati e ristrutturati nell’ambito di un singolare progetto territoriale e culturale'
        },
        {
          name: 'Fiore di pietra',
          address: false,
          link: 'https://www.ticino.ch/it/commons/details/Fiore-di-pietra-Monte-Generoso/141970.html',
          cords: [45.92818, 9.01871],
          text: 'La nuova struttura turistica "Fiore di pietra" è un\'opera architettonica unica nel suo genere, firmata dall\'architetto Mario Botta'
        },
        {
          name: 'FoxTown',
          address: 'Via Angelo Maspoli 18, 6850 Mendrisio',
          link: 'https://www.foxtown.com/',
          cords: [45.87481, 8.9793],
          text: 'Il tempio dell\'eleganza e del lusso con 160 negozi a prezzi scontati dal 30 al 70% tutto l\'anno, si trova a Mendrisio, a soli 15 minuti da Arzo'
        },
        {
          name: 'Parco Archeologico Tremona-Castello',
          address: 'Via al Castello 10, 6865 Tremona',
          link: 'https://www.parco-archeologico.ch/',
          cords: [45.88466, 8.95958],
          text: 'Archeologi e volontari hanno portato alla luce i resti di un insediamento di collina e migliaia di reperti, che ci consentono di confrontarci con il passato dell’intera regione ed in particolar modo di capire la vita quotidiana di un villaggio medievale'
        },
        {
          name: 'Monte San Giorgio',
          link: 'http://www.montesangiorgio.org/',
          cords: [45.91387, 8.94977],
          text: 'Dalla sommità del San Giorgio, situata a quota 1000 metri nel sud del Ticino, si gode un panorama che spazia tra lago e montagne, regalando scorci indimenticabili sulla regione'
        }
      ]
    }
  }
}
</script>

<style scoped>
.carousel-section {
  max-width: 100%;
  height: 30vh;
}

#map-container {
  height: 100%;
}

/* MAP MARKER LEGEND */
.marker-legend {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: inline-block;
  line-height: 30px;
  text-align: center;
}

#legend-control:hover {
  cursor: pointer;
}
/* CSS CLASSES USED FOR MARKER LEGEND COLORS */
.bg-violet {
  background-color: #673ab7 !important;
}

.bg-amber {
  background-color: #ff6f00 !important;
}

.bg-brown {
  background-color: #4e342e !important;
}

.bg-pink {
  background-color: #ec407a !important;
}

.bg-unique {
  background-color: #2BBBAD !important;
}

/* CSS Responsive query */
@media only screen and (max-width: 600px) {

  /* LOCATION SECTION RULES */
  #locationInfo > *{
    display: block;
  }

  #locationInfo #map-container {
    height: 40vh;
  }
}
</style>
