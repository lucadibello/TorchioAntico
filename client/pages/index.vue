<template>
  <!-- Main container -->
  <section>
    <section>
      <!-- Guest carousel container -->
      <b-container fluid>
        <!-- Guest carousel -->
        <!--
        <client-only>
          <guest-swiper id="homepage-swiper" class="mt-2" />
        </client-only>
        -->
        <client-only>
          <guest-carousel class="mt-2" />
        </client-only>
      </b-container>

      <!-- Introduction -->
      <b-container fluid>
        <div class="text-center">
          <h1 id="page-title" class="display-4 title">
            Al Torchio Antico
          </h1>
          <b-row id="intro-block" class="d-flex justify-content-center">
            <p id="into-phrase">
              Situato nel centro storico di <span :class="hoverHightlight ? 'hightlightOver' : 'hightlighted'" @mouseover="hoverHightlight = true" @mouseleave="hoverHightlight = false">Arzo</span>, il Ristorante Al Torchio Antico sorge in un
              <span :class="hoverHightlight ? 'hightlightOver' : 'hightlighted'" @mouseover="hoverHightlight = true" @mouseleave="hoverHightlight = false">
                monastero del 18° secolo
              </span>
              e offre piatti della <span :class="hoverHightlight ? 'hightlightOver' : 'hightlighted'" @mouseover="hoverHightlight = true" @mouseleave="hoverHightlight = false">cucina nostrana</span> e <span :class="hoverHightlight ? 'hightlightOver' : 'hightlighted'" @mouseover="hoverHightlight = true" @mouseleave="hoverHightlight = false">vini pregiati</span> per avvalorare al meglio le risorse locali
            </p>
          </b-row>
        </div>
      </b-container>
    </section>

    <!-- Find Us sectin -->
    <b-container class="mt-5" fluid>
      <h2 class="display-5 title">
        Dove trovarci
      </h2>
      <h6 class="text-secondary">
        <a
          href="https://goo.gl/maps/cBxBk73U4W6kQLnNA"
          target="_blank"
          rel="noopener"
          title="Apri su Google Maps"
          alt="Apri su Google Maps"
        >
          <b-icon-bullseye /> Piazzetta Guido Bustelli 1, 6864 Arzo
        </a>
      </h6>
      <b-row id="dove-trovarci-block">
        <b-col class="p-4">
          <!-- Counters -->
          <h4 class="d-inline">
            Da Mendrisio <small class="text-muted">7 km</small> <b-img alt="Swiss flag" class="inline-flag" :src="flags.switzerland" />
          </h4>
          <!-- Progress Bar -->
          <b-progress
            :max="10"
            show-value
            height="2rem"
            class="mt-2 mb-3"
            animated
          >
            <b-progress-bar :value="9" variant="success" aria-label="Tempo da mendrisio in auto">
              <span><strong>10 - 15 minuti</strong></span>
            </b-progress-bar>
          </b-progress>

          <!-- Counters -->
          <h4 class="d-inline mt-3">
            Da dogana di Arzo <small class="text-muted">750 metri</small> <b-img alt="Italian flag" class="inline-flag" :src="flags.italy" />
          </h4>
          <!-- Progress Bar -->
          <b-progress
            :max="8"
            show-value
            height="2rem"
            class="mt-2"
            animated
          >
            <b-progress-bar :value="3.5" variant="success" aria-label="Tempo dal confine di Arzo in auto">
              <span><strong>3 - 5 minuti</strong></span>
            </b-progress-bar>
          </b-progress>

          <!-- Contacts -->
          <section class="text-center mt-5">
            <p class="text-uppercase font-weight-bold mb-0">
              Contatti
            </p>
            <!-- Telephone -->
            <hr class="col-4">
            <a
              href="tel:+41916464994"
              rel="author"
              title="Chiama Il Torchio Antico"
              alt="Chiama Il Torchio Antico"
              class="d-block"
            >
              <b-icon-telephone-forward /> +41 91 646 49 94
            </a>
            <!-- Email -->
            <a
              href="mailto:rema.2018.restourant@gmail.com"
              rel="author"
              title="Scrivi al Torchio Antico"
              alt="Scrivi al Torchio Antico"
              class="d-block my-3"
            >
              <b-icon-mailbox /> rema.2018.restourant@gmail.com
            </a>
          </section>
        </b-col>
        <b-col class="p-0">
          <!-- Google Maps Embedded -->
          <div id="map-container" class="h-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.605828361013!2d8.945066260620326!3d45.87523820321747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47842a1fd7bc1c01%3A0x62a2fda1ea865110!2sRistorante%20Al%20Torchio%20Antico!5e0!3m2!1sen!2sch!4v1604240957773!5m2!1sen!2sch"
              width="auto"
              title="Al Torchio Antico mostrato tramite Google Maps"
              height="450"
              frameborder="0"
              style="border:0;width:100% !important"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-container id="status-container" class="mt-5 text-center shadow-lg p-0" fluid>
      <client-only>
        <restourant-status :hours="hours" />
      </client-only>
    </b-container>

    <!-- Services -->
    <b-container id="services" class="mt-5" fluid>
      <h2 class="display-5 title">
        Servizi
      </h2>
      <b-row>
        <b-col>
          <ul id="services-table">
            <li>Bar e ristorante <b-icon-handbag variant="success" /></li>
            <li>Parcheggi gratuiti <b-icon-truck variant="success" /></li>
            <li>Cortile esterno con giochi per bambini <b-icon-person-check-fill variant="success" /></li>
            <li>Connessione Wi-Fi gratis <b-icon-wifi variant="success" /></li>
            <li>Accessibile con sedia a rotelle <b-icon-life-preserver variant="success" /></li>
            <li>Animali ammessi <b-icon-bug variant="success" /></li>
            <li>POS per carte di credito <b-icon-credit-card2-back variant="success" /></li>
          </ul>
        </b-col>
      </b-row>
    </b-container>

    <!-- Photo gallery -->
    <b-container id="gallery" class="mt-5" fluid>
      <h2 class="display-5 title">
        Galleria
      </h2>
      <!-- Show only a row -->
      <p>Clicca su una foto per ingrandirla</p>

      <!-- Show gallery -->
      <gallery :images="galleryImages" @update:gallery="index = $event" />
      <client-only>
        <!-- Show lightbox if clicked -->
        <VGS :images="galleryImages" :index="index" @close="index = null" />
      </client-only>

      <!-- View all images button -->
      <div class="w-100 text-center mt-5">
        <nuxt-link to="/galleria" class="mr-2">
          <b-button variant="outline-warning" class="text-dark" pill>
            Guarda tutte le foto
          </b-button>
        </nuxt-link>
      </div>
    </b-container>

    <!-- Phone operators -->
    <b-container id="phoneOperators" class="mt-5" fluid>
      <b-jumbotron id="phoneOperators" class="mt-5">
        <template #header>
          Operatori telefonici
        </template>

        <template #lead>
          Lista degli operatori telefonici accessibili nell'area <sup><small class="muted" style="color:grey;">1)</small></sup>
        </template>

        <hr class="my-4">

        <b-row>
          <b-col>
            <!-- Swiss Operators -->
            <p class="text-center text-dark font-weight-bold">
              Operatori Svizzeri <b-badge>3</b-badge>
            </p>
            <b-list-group vertical>
              <b-list-group-item v-for="operator in operators.switzerland" :key="operator" class="d-flex justify-content-between align-items-center">
                {{ operator }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col>
            <!-- Italian Operators -->
            <p class="text-center text-dark font-weight-bold">
              Operatori Italiani <b-badge>4</b-badge>
            </p>
            <b-list-group v-for="operator in operators.italy" :key="operator" vertical>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                {{ operator }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>

        <b-button
          variant="outline-primary"
          href="https://www.gsma.com/coverage/"
          target="_blank"
          rel="noopener"
          rounded
        >
          Controlla copertura online
        </b-button>

        <div id="dataAlert" class="w-100 text-right m-0">
          <p style="color:grey;font-size:.7em">
            <small class="muted">1)</small> dati risalenti al 22.05.2021
          </p>
        </div>
      </b-jumbotron>
    </b-container>
    <!-- POI Map -->
    <b-container id="story" class="mt-5" fluid>
      <h2 class="display-4 title">
        Punti di interesse
      </h2>
      <p>Clicca su un punto di interesse per visualizzare ulteriori informazioni</p>

      <!-- MAP -->
      <div id="mappa" class="w-100 mt-5">
        <swiss-map
          ref="poiMap"
          style="height:30vh;"
          class="mt-4"
          :center="[45.87633, 8.94116]"
          :markers="[[45.87633, 8.94116]]"
          :pois="pois"
        />
      </div>
      <!-- POI list -->
      <div class="p-4">
        <h3 class="d-inline mr-2">
          Legenda
        </h3>

        <b-icon id="legend-control" :icon="isLegendOpen ? 'caret-up-fill' : 'caret-down-fill'" @click="isLegendOpen = !isLegendOpen" />

        <!-- Collapsible section -->
        <b-collapse v-model="isLegendOpen">
          <div class="text-center mb-5 mt-3">
            <p class="lead">
              <b-icon-circle-fill variant="primary" /> <b>Al Torchio Antico</b>
            </p>
          </div>
          <!-- List of POIs -->

          <!-- First row -->
          <b-row id="legendData" align-h="center">
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-success text-white">1</span> Grotta dell'orso
                <nuxt-link :to="{ path: '/',hash:'#mappa'}">
                  <b-button class="w-100 mt-2" variant="light" pill @click="centerPoi(pois[0])">
                    Vai
                  </b-button>
                </nuxt-link>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-warning text-white">2</span> Percorso del cemento
                <b-button class="w-100 mt-2" variant="light" pill @click="centerPoi(pois[1])">
                  Vai
                </b-button>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-amber text-white">3</span> Fiore di Pietra
                <b-button class="w-100 mt-2" variant="light" pill @click="centerPoi(pois[2])">
                  Vai
                </b-button>
              </p>
            </b-col>
            <!-- SECOND ROW -->
            <div class="w-100" />
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-dark text-white">4</span> FoxTown
                <b-button class="w-100 mt-2" variant="light" pill @click="centerPoi(pois[3])">
                  Vai
                </b-button>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-violet text-white">5</span> Parco archeologico
                <b-button class="w-100 mt-2" variant="light" pill @click="centerPoi(pois[4])">
                  Vai
                </b-button>
              </p>
            </b-col>
            <b-col>
              <p class="lead">
                <span class="marker-legend bg-pink text-white">6</span> Museo dei fossili del Monte San Giorgio
                <b-button class="w-100 mt-2" variant="light" pill @click="centerPoi(pois[5])">
                  Vai
                </b-button>
              </p>
            </b-col>
            <!-- THIRD ROW -->
            <div class="w-100" />
            <b-col md="auto">
              <p class="lead">
                <span class="marker-legend bg-secondary text-white">7</span> Monte San Giorgio
                <b-button class="w-100 mt-2" variant="light" pill @click="centerPoi(pois[6])">
                  Vai
                </b-button>
              </p>
            </b-col>
          </b-row>
        </b-collapse>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'Homepage',
  layout: 'default',
  data () {
    return {
      isLegendOpen: false,
      hoverHightlight: false,
      hoverReadMore: false,
      flags: {
        italy: require('assets/img/flags/italy-flag-round-250.png'),
        switzerland: require('assets/img/flags/swiss-flag-round-250.png')
      },
      index: null,
      galleryImages: [
        { url: require('assets/img/gallery/foto1.jpg'), alt: 'Entrata ristorante' },
        { url: require('assets/img/gallery/foto2.jpg'), alt: 'Ristorante all\' interno' },
        { url: require('assets/img/gallery/foto3.jpg'), alt: 'Cortile esterno' },
        { url: require('assets/img/gallery/foto4.jpg'), alt: 'Tavolo apparecchiato' }
      ],
      timing: {
        isItaly: false
      },
      operators: {
        switzerland: ['Sunrise', 'SwissCom', 'Salt'],
        italy: ['ILIAD', 'Vodafone IT', 'WindTre', '3 ITA']
      },
      pois: [
        {
          name: 'Grotta dell\'Orso',
          address: false,
          link: 'https://www.ticino.ch/it/commons/details/La-Grotta-dell-Orso/14911.html',
          cords: [45.930283, 9.020226],
          text: 'La grotta, scoperta alcuni anni orsono, è stata aperta al pubblico nel 1999: in essa si possono vedere parecchie ossa ritrovate di orsi delle caverne',
          iconUrl: 'marker-icon-2x-green.png'
        },
        {
          name: 'Percorso del cemento',
          address: 'Via dei Grotti 3, 6834 Morbio Inferiore',
          link: 'https://percorsodelcemento.ch/',
          cords: [45.85583, 9.0128],
          text: 'Nel cuore del Parco delle Gole della Breggia, i terreni e le imponenti strutture di un cementificio in disuso sono stati riqualificati e ristrutturati nell’ambito di un singolare progetto territoriale e culturale',
          iconUrl: 'marker-icon-2x-gold.png'
        },
        {
          name: 'Fiore di pietra',
          address: false,
          link: 'https://www.ticino.ch/it/commons/details/Fiore-di-pietra-Monte-Generoso/141970.html',
          cords: [45.92818, 9.01871],
          text: 'La nuova struttura turistica "Fiore di pietra" è un\'opera architettonica unica nel suo genere, firmata dall\'architetto Mario Botta',
          iconUrl: 'marker-icon-2x-orange.png'
        },
        {
          name: 'FoxTown',
          address: 'Via Angelo Maspoli 18, 6850 Mendrisio',
          link: 'https://www.foxtown.com/',
          cords: [45.87481, 8.9793],
          text: 'Il tempio dell\'eleganza e del lusso con 160 negozi a prezzi scontati dal 30 al 70% tutto l\'anno, si trova a Mendrisio, a soli 15 minuti da Arzo',
          iconUrl: 'marker-icon-2x-black.png'
        },
        {
          name: 'Parco Archeologico Tremona-Castello',
          address: 'Via al Castello 10, 6865 Tremona',
          link: 'https://www.parco-archeologico.ch/',
          cords: [45.88466, 8.95958],
          text: 'Archeologi e volontari hanno portato alla luce i resti di un insediamento di collina e migliaia di reperti, che ci consentono di confrontarci con il passato dell’intera regione ed in particolar modo di capire la vita quotidiana di un villaggio medievale',
          iconUrl: 'marker-icon-2x-violet.png'
        },
        {
          name: 'Museo dei fossili del Monte San Giorgio',
          address: 'Via Bernardo Peyer 9, 6866 Meride',
          link: 'http://www.montesangiorgio.org/Musei/Museo-dei-Fossili-di-Meride.html',
          cords: [45.8905471, 8.9528985],
          text: 'Il Museo dei fossili del Monte San Giorgio, ristrutturato e ampliato dall’architetto ticinese Mario Botta, è stato inaugurato il 13 ottobre 2012. La struttura mostra una raccolta di fossili di animali e piante provenienti dagli eccezionali giacimenti del Monte San Giorgio, oggi iscritto nel Patrimonio mondiale dell’UNESCO',
          iconUrl: 'marker-icon-2x-red.png'
        },
        {
          name: 'Monte San Giorgio',
          address: false,
          link: 'http://www.montesangiorgio.org/',
          cords: [45.91387, 8.94977],
          text: 'Dalla sommità del San Giorgio, situata a quota 1000 metri nel sud del Ticino, si gode un panorama che spazia tra lago e montagne, regalando scorci indimenticabili sulla regione',
          iconUrl: 'marker-icon-2x-grey.png'
        }
      ],
      hours: [
        {
          // SUNDAY
          isOpen: true,
          open: ['10:00', '14:00'],
          closes: ['17:00', '23:00']
        },
        {
          // MONDAY
          isOpen: false,
          open: null,
          closes: null
        },
        { // TUESDAY
          isOpen: true,
          open: '17:00',
          closes: '22:00'
        },
        { // WEDNESDAY
          isOpen: true,
          open: '17:00',
          closes: '22:00'
        },
        { // THURSDAY
          isOpen: true,
          open: '17:00',
          closes: '22:00'
        },
        { // FRIDAY
          isOpen: true,
          open: '17:00',
          closes: '22:00'
        },
        { // SATURDAY
          isOpen: true,
          open: ['10:00', '14:00'],
          closes: ['17:00', '23:00']
        }
      ]
    }
  },
  head: () => ({
    title: 'Homepage',
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'Homepage ristorante Al Torchio Antico'
    }, {
      hid: 'og:description',
      name: 'og:description',
      content: 'Homepage ristorante Al Torchio Antico'
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Homepage'
    }]
  }),
  methods: {
    centerPoi (poi) {
      this.$refs.poiMap.flyTo(poi.cords)
    },
    scrollToElement (el) {
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
#page-title {
  margin-top: 2rem;
}

.read-more {
  transition: all .2s linear;
  margin-top: 2rem;
  line-height: 0;
  animation: shake-animation 4.72s ease infinite;
  transform-origin: 50% 50%;
  cursor: pointer;
}

.read-more-hover {
  transition: all .2s linear;
  margin-top: 2rem;
  line-height: 0;
  background-color:  #ff9800 !important;
  color: black !important;
  cursor: pointer;
}

.hightlighted {
  transition: all .2s;
  background: linear-gradient( to bottom, #ff9800 0%, #ff9800 100% );
    background-position-x: 0%;
    background-position-y: 0%;
    background-repeat: repeat;
    background-size: auto;
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 4px 4px;
  color: black;
  text-decoration: none;
}

.hightlightOver {
  background: linear-gradient( to bottom, #ff9800 0%, #ff9800 100% );
    background-position-x: 0%;
    background-position-y: 0%;
    background-repeat: repeat;
  background-position: 0 100%;
  text-decoration: none;
  color: black;
  background-size: 4px 50px;
}

#into-phrase {
  font-family: 'Libre Baskerville', serif;
  max-width: 50%;
  font-size: 1.5rem;
}

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

.inline-flag {
  display: inline;
  height: 30px;
  width: 30px;
}
#services-table {
  padding-left: 0 !important;
  text-align: center;
}
#services-table li {
  display: inline;
}
#services-table li:before {
  content: '\2022';
  margin-right: 0.5em;
}
#status .row {
  justify-content: center;
}

#status svg {
  font-size: 3em;
}

#status-container {
  width: 70%;
}

.vgs {
  display: flex !important;
  justify-content: center;
  flex-direction: column;
}
/* CSS Responsive query */
@media only screen and (max-width: 600px) {

  /* LOCATION SECTION RULES */
  #locationInfo > *{
    display: block;
  }

  #locationInfo #map-container {
    height: 40vh;
    width: auto;
  }

  #timingControls {
    margin-bottom: 2rem !important;
  }

  section h5 {
    text-align: center;
  }

  #contacts-section {
    display:block;
    margin-bottom: 2rem;
  }

  #contacts-section > div {
    margin-bottom: 2rem;
  }

  #intro-block {
    display:block !important;
    padding: 20px;
  }

  #into-phrase {
    max-width: 100% !important;
  }

  #dove-trovarci-block {
    display: block !important;
  }

  #map-container {
    padding: 20px;
  }

  #phoneOperators {
    display: block !important;
  }

  #phoneOperators .display-3 {
    font-size: 2.5rem;
  }

  #phoneOperators .row .col {
    margin-bottom: 2vh;
  }

  #dataAlert {
    margin-top: 2vh !important;
    text-align: left !important;
  }

  #legendData {
    display: block;
  }

  #status-container {
    width: 100%;
    padding: 20px !important;
  }
}
</style>
