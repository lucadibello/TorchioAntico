<template>
  <article>
    <h1>Dashboard</h1>

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
      <h2>Statistica prenotazioni globali</h2>
      <!-- Load animation -->
      <b-overlay :show="!charts.bookings.loaded" :opacity=".95" spinner-type="grow" spinner-variant="success">
        <client-only>
          <line-chart v-if="charts.bookings.loaded" :data="Object.values(charts.bookings.data)" :labels="charts.bookings.labels" :data-label="charts.bookings.dataLabel" />
        </client-only>
      </b-overlay>
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
  created () {
    // Update user counter
    this.getUsersCounter()
    // Update room counter
    this.getRoomsCounter()
    // Update booking counter
    this.getBookingsCounter()
    // Load booking chart
    this.getBookingChartData()
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
    getBookingChartData () {
      // fetch data
      this.$axios.get('booking/stats').then((stats) => {
        // Extract response data
        const monthlyStatistics = stats.data
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
