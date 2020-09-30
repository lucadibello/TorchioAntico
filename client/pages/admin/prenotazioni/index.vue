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
        <!-- First step: Fill user information -->
        <div id="client-step" :v-show="false">
          <b-form @submit.prevent="registerBooking">
            <h4>
              <b-badge pill variant="primary">
                <b-icon-person-lines-fill />
              </b-badge> Informazioni cliente
            </h4>
            <!-- Client information -->
            <section>
              <!-- Name & Surname -->
              <h4 class="text-center mb-3">
                Dati anagrafici
              </h4>

              <b-row>
                <b-col>
                  <!-- Name -->
                  <b-form-group
                    id="input-group-1"
                    label="Nome"
                    label-for="input-name"
                  >
                    <b-form-input
                      id="input-name"
                      v-model="form.client_name"
                      type="text"
                      required
                      placeholder="Es: Pinco"
                    />
                  </b-form-group>
                </b-col>
                <b-col>
                  <!-- Surname -->
                  <b-form-group
                    id="input-group-2"
                    label="Cognome"
                    label-for="input-surname"
                  >
                    <b-form-input
                      id="input-surname"
                      v-model="form.client_surname"
                      type="text"
                      required
                      placeholder="Es: Pallino"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- Email -->
              <b-form-group
                id="input-group-3"
                label="E-Mail"
                label-for="input-email"
              >
                <b-form-input
                  id="input-email"
                  v-model="form.client_email"
                  type="email"
                  required
                  placeholder="Es: pinco.pallino@esempio.ch"
                />
              </b-form-group>

              <!-- Phone number -->
              <b-form-group
                id="input-group-3"
                label="Numero di telefono"
                label-for="input-phone"
              >
                <vue-tel-input v-model="form.client_phone" v-bind="telProps" />
              </b-form-group>

              <!-- Full Address -->
              <h4 class="text-center mb-3">
                Indirizzo domicilio
              </h4>
              <!-- Country + City -->
              <b-row>
                <b-col>
                  <!-- Country -->
                  <b-form-group
                    id="input-group-7"
                    label="Nazione"
                    label-for="input-country"
                  >
                    <!-- Select -->
                    <b-form-select id="input-country" v-model="form.client.address.country" :options="countries" required />
                  </b-form-group>
                </b-col>
                <b-col>
                  <!-- City -->
                  <b-form-group
                    id="input-group-10"
                    label="Città"
                    label-for="input-city"
                  >
                    <b-form-input id="input-city" v-model="form.client.address.city" type="text" placeholder="Es: Cave di Marmo" required />
                  </b-form-group>
                </b-col>
              </b-row>
              <!-- Address + Home number -->
              <b-row>
                <b-col>
                  <!-- Address -->
                  <b-form-group
                    id="input-group-5"
                    label="Via"
                    label-for="input-address"
                  >
                    <b-form-input
                      id="input-address"
                      v-model="form.client_address"
                      type="text"
                      required
                      placeholder="Es: Cave di Marmo"
                    />
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-6"
                    label="Numero casa"
                    label-for="input-home-number"
                  >
                    <b-form-input
                      id="input-home-number"
                      v-model="form.client_home_number"
                      type="text"
                      required
                      placeholder="Es: 4"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </section>

            <h4>
              <b-badge pill variant="primary">
                <b-icon-calendar2-week />
              </b-badge> Prenotazione
            </h4>
            <!-- Booking information -->
            <section>
              <b-row>
                <b-col>
                  <!-- Start date -->
                  <b-form-datepicker
                    id="datepicker-start"
                    v-model="form.booking.start_date"
                    class="mb-2"
                    :min="today"
                    required
                    @input="genEndDate"
                  />
                </b-col>
                <b-col>
                  <!-- End date -->
                  <b-form-datepicker
                    id="datepicker-end"
                    v-model="form.booking.end_date"
                    :min="today"
                    class="mb-2"
                    required
                    :disabled="!isStartDateValid()"
                    @input="loadAvailableRooms"
                  />
                </b-col>
              </b-row>

              <!-- Show message -->
              <div v-if="isStartDateValid() && isEndDateValid()">
                Totale notti:  <b-badge pill variant="info">
                  {{ calculateNights }}
                </b-badge>

                <!-- Select available rooms -->
                <b-form-group
                  id="input-group-7"
                  class="mt-3"
                  text="Camere disponbili"
                  label-for="input-rooms"
                >
                  <!-- Select -->
                  <b-form-select id="input-rooms" v-model="form.booking.room" :options="availableRooms" required />
                </b-form-group>
              </div>
              <div v-else>
                <p class="text-danger">
                  Le date devono rispettare i seguenti canoni:
                </p>
                <ul>
                  <li>La data di inizio del pernottamento deve corrispondere alla data odierna oppure ad una nel futuro</li>
                  <li>La data di inizio e di fine pernottamento <u>non possono coincidere</u></li>
                </ul>
              </div>
            </section>
            <!-- Submit button -->
            <b-form-group class="mt-5">
              <b-button type="submit" variant="primary">
                Procedi <b-icon-arrow-right-circle />
              </b-button>
            </b-form-group>
          </b-form>
        </div>
        <hr>
      </b-tab>
    </b-tabs>
  </article>
</template>

<style scoped>
.action-thumbnail img {
  max-height: 30vh;
}
.flag img {
  height: 15px;
  width: auto;
}
</style>

<script>
export default {
  name: 'Prenotazioni',
  data () {
    return {
      form: {
        client: {
          name: '',
          surname: '',
          email: '',
          phone: '',
          address: {
            country: 'CH',
            city: '',
            houseNumber: ''
          }
        },
        booking: {
          start_date: '',
          end_date: '',
          room: false
        }
      },
      availableRooms: [],
      stepper: {
        clientDone: false,
        bookingDone: false
      },
      countries: [],
      telProps: {
        defaultCountry: 'CH',
        mode: 'international',
        placeholder: 'Es: 0765969984',
        required: true,
        inputId: 'input-phone'
      },
      today: this.$moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    calculateNights () {
      if (this.form.booking.start_date && this.form.booking.start_date) {
        const startDate = this.$moment(this.form.booking.start_date)
        const endDate = this.$moment(this.form.booking.end_date)
        return endDate.diff(startDate, 'days')
      } else {
        return 0
      }
    }
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    'form.booking.start_date': function (val, oldVal) {
      if (this.isStartDateValid() && this.form.booking.end_date !== '' && oldVal !== '') {
        // Init moment objects
        const oldStartDate = this.$moment(oldVal)
        const startDate = this.$moment(val)
        const endDate = this.$moment(this.form.booking.end_date)
        // Calculate days diff
        const daysDiff = endDate.diff(oldStartDate, 'days')
        // Calculate end date using old days difference
        this.form.booking.end_date = startDate.add(daysDiff, 'days').format('YYYY-MM-DD')
      }
    }
  },
  mounted () {
    // Set date picker to today's date
    // this.form.booking.start_date = this.today

    // Load countries using restcounties APIs
    this.loadCountries()
  },
  methods: {
    registerBooking () {
      // eslint-disable-next-line no-console
      console.log(this.form)
    },
    async loadCountries () {
      // Check if fetch is needed
      // eslint-disable-next-line no-console
      console.info('Total cached countries: ' + this.$store.state.countries.data.length)
      // Check if there is data saved inside Vuex Store
      if (this.$store.state.countries.data.length === 0) {
        // Fetch data
        const response = await fetch('https://restcountries.eu/rest/v2/all')
          .then(response => response.json())

        const temp = []
        // Assign data to countries
        for (const country of response) {
          temp.push({ value: country.alpha2Code, text: country.name, flag: country.flag })
        }
        // Set vuex store
        this.$store.commit('countries/setCountries', temp)
      }
      // Set data using Vuex store
      this.countries = this.$store.state.countries.data
    },
    loadAvailableRooms () {
      if (this.isStartDateValid() && this.isEndDateValid()) {
        // If valid: load available rooms

        // Send request to rooms api
        this.$axios.get(`/booking/available/${this.form.booking.start_date}/${this.form.booking.end_date}`)
          .then((availableRooms) => {
            // Map data
            this.availableRooms = availableRooms.data.map((room) => {
              return { value: room.id, text: room.name }
            })
          }).catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(err)
          })
      }
    },
    isStartDateValid () {
      // Check if a date was set
      if (this.form.booking.start_date) {
        // Create moment object with only Date (trucate time)
        const today = this.$moment(this.today)
        // Parse selected dates
        const startDate = this.$moment(this.form.booking.start_date)

        // Check if start date is same or after today & set flag
        return today.isSameOrBefore(startDate)
      } else {
        // Set flag to false -> Start date not set
        return false
      }
    },
    isEndDateValid () {
      if (this.form.booking.start_date && this.form.booking.end_date) {
        // Create moment object with only Date (trucate time)
        const today = this.$moment(this.today)
        // Parse selected dates
        const startDate = this.$moment(this.form.booking.start_date)
        const endDate = this.$moment(this.form.booking.end_date)
        return today.isBefore(endDate) && startDate.isBefore(endDate)
      } else {
        return false
      }
    },
    genEndDate () {
      // start date = set, end date not set
      if (this.isStartDateValid() && this.form.booking.end_date === '') {
        // Start date + 1 day

        // Parse start date
        const startDate = this.$moment(this.form.booking.start_date)
        // Calculate end date (date + 1 day)
        const endDateFormatted = startDate.add(1, 'days').format('YYYY-MM-DD')
        // Generate date
        this.form.booking.end_date = endDateFormatted
      }
      // Get available rooms
      this.loadAvailableRooms()
    }
  },
  layout: 'admin'
}
</script>
