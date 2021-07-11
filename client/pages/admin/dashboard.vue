<template>
  <article>
    <h1 class="display-4">
      Dashboard
    </h1>

    <!-- Counter -->
    <b-card-group deck>
      <!-- User counter -->
      <counter
        title="Utenti"
        icon="person"
        variant="primary"
        :value="counters.users.data"
        :updated-at="counters.users.lastUpdate"
        :loaded="counters.users.loaded"
      />

      <!-- User counter -->
      <counter
        title="Camere"
        icon="door-open"
        variant="danger"
        :value="counters.rooms.data"
        :updated-at="counters.rooms.lastUpdate"
        :loaded="counters.rooms.loaded"
      />

      <!-- User counter -->
      <counter
        title="Prenotazioni mensili"
        icon="graph-up"
        variant="info"
        :value="counters.bookings.data"
        :updated-at="counters.bookings.lastUpdate"
        :loaded="counters.bookings.loaded"
      />
    </b-card-group>

    <!-- Chart box -->
    <div class="w-100 mt-5">
      <h2 class="display-4 mb-0">
        Statistica prenotazioni
      </h2>
      <small>Visualizza il numero di prenotazioni di ogni mese, per ogni anno registrato nella banca dati</small>
      <hr>
      <!-- Show alert if any year selected -->
      <transition name="fade">
        <b-alert :show="!Boolean(selectedYear)" variant="warning">
          Devi prima selezionare un anno tramite il menù qui sotto!
        </b-alert>
      </transition>

      <!-- Year drop down menu -->
      <small>Seleziona anno</small>
      <section v-if="charts.select.years.length > 0" class="mb-5">
        <b-form-select v-model="selectedYear" :options="charts.select.years" />

        <!-- Load animation -->
        <b-overlay v-if="Boolean(selectedYear)" :show="!charts.bookings.loaded" :opacity=".95" spinner-type="grow" spinner-variant="success">
          <client-only>
            <line-chart v-if="charts.bookings.loaded" :data="Object.values(charts.bookings.data)" :labels="charts.bookings.labels" :data-label="charts.bookings.dataLabel" />
          </client-only>
        </b-overlay>
      </section>
      <section v-else class="text-center">
        <small class="text-danger">Non ci sono ancora prenotazioni nel sistema. Questa funzione non è disponibile</small>
      </section>
    </div>
  </article>
</template>

<script>
/* Import ApexChart component */
export default {
  name: 'Dashboard',
  layout: 'admin',
  data () {
    return {
      selectedYear: false,
      counters: {
        users: {
          data: 0,
          lastUpdate: false,
          loaded: false
        },
        rooms: {
          data: 0,
          lastUpdate: false,
          loaded: false
        },
        bookings: {
          data: 0,
          lastUpdate: false,
          loaded: false
        }
      },
      charts: {
        select: {
          years: []
        },
        bookings: {
          dataLabel: 'Prenotazioni mensili',
          data: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0
          },
          labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
          loaded: false
        }
      }
    }
  },
  watch: {
    selectedYear (year) {
      // Reload graph data from APIs
      this.getBookingChartData(year)
    }
  },
  created () {
    // Update user counter
    this.getUsersCounter()
    // Update room counter
    this.getRoomsCounter()
    // Update booking counter
    this.getBookingsCounter()
    // Load years select
    this.getAvailableYears()
  },
  methods: {
    getUsersCounter () {
      this.$axios.get('user').then((users) => {
        // Update user counter
        this.counters.users.data = users.data.length
        this.counters.users.lastUpdate = this.$moment().format('HH:mm:ss')
      }).finally(() => {
        this.counters.users.loaded = true
      })
    },
    getRoomsCounter () {
      this.$axios.get('room').then((rooms) => {
        // Update user counter
        this.counters.rooms.data = rooms.data.length
        this.counters.rooms.lastUpdate = this.$moment().format('HH:mm:ss')
      }).finally(() => {
        this.counters.rooms.loaded = true
      })
    },
    getBookingsCounter () {
      this.$axios.get('booking/monthly').then((bookings) => {
        // Update user counter
        this.counters.bookings.data = bookings.data.length
        this.counters.bookings.lastUpdate = this.$moment().format('HH:mm:ss')
      }).finally(() => {
        this.counters.bookings.loaded = true
      })
    },
    getAvailableYears () {
      // fetch data from APIs
      this.$axios.get('booking/available/years').then((years) => {
        // Extract response data
        this.charts.select.years = years.data
      })
    },
    getBookingChartData (year) {
      this.charts.bookings.loaded = false
      // fetch data
      this.$axios.get('booking/stats/' + year).then((stats) => {
        // Extract response data
        const monthlyStatistics = stats.data

        // Clear all month data
        for (let i = 1; i <= 12; i++) {
          this.charts.bookings.data[i] = 0
        }

        // Cycle every month's data
        monthlyStatistics.forEach((monthData) => {
          // Set data for month
          this.charts.bookings.data[monthData.month] = monthData.count
        })
      }).finally(() => {
        this.charts.bookings.loaded = true
      })
    }
  }
}
</script>
