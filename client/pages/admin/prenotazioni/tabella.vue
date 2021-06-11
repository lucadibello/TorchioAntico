<template>
  <section>
    <nuxt-link to="/admin/prenotazioni">
      <p class="text-primary">
        <b-icon-arrow-bar-left /> Torna alla gestione delle prenotazioni
      </p>
    </nuxt-link>
    <h1>Formato tabellare</h1>

    <b-table
      striped
      hover
      :fields="fields"
      :items="bookings"
      show-empty
      :responsive="true"
    >
      <!-- Empty template -->
      <template #empty>
        <h6 class="text-danger">
          Non ci sono prenotazioni disponibili
        </h6>
      </template>

      <!-- Flag template -->
      <template #cell(flag)="{ item }">
        <b-img-lazy :fluid="true" :src="`https://www.countryflags.io/${item.client_address_country}/flat/32.png`" />
      </template>

      <!-- Actions template -->
      <template #cell(actions)="{ item }">
        <b-btn variant="primary" @click="toggleActions(item)">
          Apri
        </b-btn>
      </template>

      <!-- Show more template -->
      <template #row-details="{ item }">
        <b-card class="text-left">
          <!-- Client information -->
          <h6 class="font-weight-bold">
            Informazioni cliente
          </h6>
          <b-list-group vertical="md">
            <b-list-group-item>Nome: {{ item.client_name }}</b-list-group-item>
            <b-list-group-item>Cognome: {{ item.client_surname }}</b-list-group-item>
            <b-list-group-item>Email: <a class="font-weight-bold text-primary" :href="`mailto:${item.client_email}`">{{ item.client_email }}</a></b-list-group-item>
            <b-list-group-item>Numero di telefono: <a class="font-weight-bold text-primary" :href="`tel:${item.client_phone}`">{{ item.client_phone }}</a></b-list-group-item>
          </b-list-group>

          <!-- Client's home information -->
          <h6 class="font-weight-bold mt-3">
            Informazioni domicilio
          </h6>
          <b-list-group horizontal="md">
            <b-list-group-item>Nazione: {{ item.client_address_country }}</b-list-group-item>
            <b-list-group-item>Città: {{ item.client_address_city }}</b-list-group-item>
            <b-list-group-item>Via: {{ item.client_address_street }}</b-list-group-item>
            <b-list-group-item>Numero civico: {{ item.client_address_housenumber }}</b-list-group-item>
          </b-list-group>

          <!-- Booking information -->
          <h6 class="font-weight-bold mt-3">
            Informazioni prenotazione
          </h6>
          <b-list-group vertical="md">
            <b-list-group-item>Data di inizio: {{ $moment(item.booking_start_date).format('DD.MM.YYYY') }}</b-list-group-item>
            <b-list-group-item>Data di fine: {{ $moment(item.booking_end_date).format('DD.MM.YYYY') }}</b-list-group-item>
            <b-list-group-item>Stanza: {{ item._roomInfo.name }}</b-list-group-item>
            <b-list-group-item>Persone: <span class="text-danger">DA FARE</span></b-list-group-item>
          </b-list-group>

          <!-- Extra information -->
          <h6 class="font-weight-bold mt-3">
            Informazioni aggiuntive
          </h6>
          <b-list-group vertical="md">
            <b-list-group-item>Data creazione prenotazione: {{ $moment(item.createdAt).format('DD.MM.YYYY HH:mm') }}</b-list-group-item>
          </b-list-group>

          <!-- Card footer block -->
          <template #footer>
            <!-- Text -->
            <small class="text-muted mr-4">Azioni sulla prenotazione</small>

            <div style="float:right;">
              <!-- Actions -->
              <!--  TODO: Add edit feature
              <b-button type="submit" variant="warning" @click="showModal(item)">
                Modifica prenotazione
              </b-button>
              -->
              <b-button type="submit" variant="danger" @click="deleteBooking(item)">
                Elimina prenotazione
              </b-button>
            </div>
          </template>
        </b-card>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  name: 'BookingTableView',
  layout: 'admin',
  data () {
    return {
      bookings: [],
      fields: [
        // Custom cell
        { key: 'flag', label: 'Nazione', sortable: false },
        // Client name
        { key: 'client_name', label: 'Nome', sortable: true },
        // Client surname
        { key: 'client_surname', label: 'Cognome', sortable: true },
        // Booking start date
        {
          key: 'booking_start_date',
          label: 'Data di inizio',
          sortable: true,
          formatter: (value) => {
            return this.$moment(value).format('DD.MM.YYYY')
          }
        },
        // Booking end date
        {
          key: 'booking_end_date',
          label: 'Data di fine',
          sortable: true,
          formatter: (value) => {
            return this.$moment(value).format('DD.MM.YYYY')
          }
        },
        // Show more button
        { key: 'actions', label: '', sortable: false }
      ]
    }
  },
  mounted () {
    // Load all bookings
    this.loadBookings()
  },
  methods: {
    loadBookings () {
      this.$axios.get('/booking').then((bookings) => {
        this.bookings = bookings.data
      })
    },
    async toggleActions (item) {
      // Is showing + no data fetched
      if (Boolean(item._showDetails) === false && Boolean(item._roomInfo) === false) {
        // Fetch info
        this.$set(item, '_roomInfo', await this.getRoomInformation(item.room_id))
      }
      // Toggle actions
      this.$set(item, '_showDetails', !item._showDetails)
    },
    async getRoomInformation (roomId) {
      return await this.$axios.get(`/room/${roomId}`).then((room) => {
        return room.data
      })
    },
    deleteBooking (booking) {
      // Show generic error
      this.$swal({
        title: 'Rimozione prenotazione',
        html: `Stai per eliminare la prenotazione di <b>${booking.client_name} ${booking.client_surname}</b>. Vuoi continuare?`,
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Conferma eliminazione',
        cancelButtonText: 'Annulla',
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        showCancelButton: true
      }).then((status) => {
        // Check if confirmed
        if (status.isConfirmed) {
          // Confirmed
          this.$axios.delete('/booking/' + booking.id).then((res) => {
            // Show toast success message
            this.$swal({
              title: 'Prenotazione rimossa correttamente',
              icon: 'success',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
            // Deleted successfully: reload table
            this.loadBookings()
          })
        }
      }).catch((err) => {
        if (err.response && err.response.data.type === 'ER_BOOKING_NOT_FOUND') {
          // show toast error
          this.$swal({
            title: 'La prenotazione risulta inesistente. Prova a ricaricare la pagina.',
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        } else {
          // show generic error
          this.$swal({
            title: 'Rimozione prenotazione',
            html: 'C\'è stato un errore non conosciuto, riprova più tardi',
            icon: 'warning',
            showConfirmButton: true
          })
        }
      })
    }
  }
}
</script>
