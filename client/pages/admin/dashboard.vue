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
    <div>
      <h1>Chart here</h1>
    </div>

    <ul>
      <li>Counter prenotazioni (mensili) </li>
      <li>Counter utenti con accesso</li>
      <li>Shortcuts per servizi del sito (gestione prenotazioni, visualizzazione)</li>
      <li>Grafici (?)</li>
    </ul>
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
      // TODO: Finish this montly booking counter
      this.counters.bookings.loaded = true
    }
  }
}
</script>
