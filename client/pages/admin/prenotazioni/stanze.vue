<template>
  <article>
    <nuxt-link to="/admin/prenotazioni">
      <p class="text-primary">
        <b-icon-arrow-bar-left /> Torna alla gestione delle prenotazioni
      </p>
    </nuxt-link>
    <h2>Gestione stanze</h2>
    <hr>
    <h4>Aggiungi una nuova stanza</h4>
    <b-form class="mb-5" @submit.prevent="addRoom">
      <!-- Name -->
      <b-form-group
        id="input-group-1"
        label="Nome della stanza:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Inserisci un nome"
        />
      </b-form-group>

      <!-- People -->
      <label for="sb-inline">Posti letto</label>
      <b-form-spinbutton id="sb-inline" v-model="form.nPeople" min="1" max="25" placeholder="--" />

      <!-- Price-->
      <b-form-group
        id="input-group-3"
        label="Prezzo per persona"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.price"
          type="number"
          lazy-formatter
          :formatter="priceFormatter"
          step="0.25"
          min="0"
          required
          placeholder="Inserisci il prezzo per persona"
        />
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Descrizione"
        label-for="textarea"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.description"
          placeholder="(Facoltativo)"
          rows="3"
          max-rows="6"
        />
      </b-form-group>

      <b-button type="submit" variant="primary">
        Aggiungi la stanza
      </b-button>
    </b-form>

    <h4>Camere presenti nel sistema</h4>
    <section>
      <b-table
        striped
        hover
        :fields="fields"
        :items="data.rooms"
        :busy.sync="isBusy"
        show-empty
        :responsive="true"
      >
        <!-- Show more button -->
        <template v-slot:cell(actions)="{ item }">
          <b-btn variant="primary" @click="toggleActions(item)">
            Mostra azioni
          </b-btn>
        </template>

        <!-- Empty table message -->
        <template v-slot:empty>
          <h6 class="text-danger">
            Non sono disponibili stanze. Puoi usare il modulo sovrastante per crearle
          </h6>
        </template>

        <!-- Show more section -->
        <template v-slot:row-details="{ item }">
          <b-card class="text-left">
            <b-row>
              <b-col>Nome stanza: {{ item.name }} </b-col>
              <b-col>
                <div class="w-100">
                  <p>Creata il: {{ $moment(item.createdAt).format('DD.MM.YYYY HH:mm') }}</p>
                  <p>Ultima modifica: {{ $moment(item.updatedAt).format('DD.MM.YYYY HH:mm') }}</p>
                </div>
              </b-col>
            </b-row>

            <!-- Description -->
            <h4>Descrizione ed osservazioni</h4>
            <!-- Text area -->
            <b-form-textarea
              v-if="item.description"
              id="textarea"
              v-model="item.description"
              rows="3"
              max-rows="6"
              readonly
            />

            <!-- No description -->
            <p v-else class="text-danger">
              Dato non disponibile
            </p>

            <template v-slot:footer>
              <!-- Text -->
              <small class="text-muted mr-4">Azioni sulla stanza</small>

              <div style="float:right;">
                <!-- Actions -->
                <b-button type="submit" variant="warning" @click="showModal(item)">
                  Modifica la stanza
                </b-button>

                <b-button type="submit" variant="danger" @click="deleteRoom(item)">
                  Rimuovi la stanza
                </b-button>
              </div>
            </template>
          </b-card>
        </template>
      </b-table>
    </section>

    <!-- Edit modal -->
    <b-modal ref="modal" hide-footer>
      <template v-slot:modal-title>
        Modifica stanza
      </template>
      <b-form class="mb-5" @submit.prevent="updateRoom(modal)">
        <b-form-group
          id="input-group-1"
          label="Nome della stanza:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="modal.name"
            type="text"
            required
            placeholder="Inserisci un nome"
          />
        </b-form-group>

        <!-- People -->
        <label for="sb-inline">Posti letto</label>
        <b-form-spinbutton id="sb-inline" v-model="modal.nPeople" min="1" max="25" placeholder="--" />

        <!-- Price-->
        <b-form-group
          id="input-group-3"
          label="Prezzo per persona"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="modal.price"
            type="number"
            lazy-formatter
            :formatter="priceFormatter"
            step="0.25"
            min="0"
            required
            placeholder="Inserisci il prezzo per persona"
          />
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Descrizione"
          label-for="textarea"
        >
          <b-form-textarea
            id="textarea"
            v-model="modal.description"
            placeholder="(Facoltativo)"
            rows="3"
            max-rows="6"
          />
        </b-form-group>

        <b-button type="submit" variant="primary">
          Conferma modifiche
        </b-button>
      </b-form>
      <b-button class="mt-3" block @click="hideModal">
        Chiudi
      </b-button>
    </b-modal>
  </article>
</template>

<script>
export default {
  name: 'RoomManager',
  data () {
    return {
      form: {
        name: '',
        description: '',
        nPeople: 1,
        price: 0
      },
      modal: {
        id: null,
        name: '',
        description: '',
        nPeople: 1,
        price: 0
      },
      data: {
        rooms: [],
        loaded: false
      },
      fields: [
        {
          key: 'name',
          label: 'Stanza',
          sortable: true
        },
        {
          key: 'nPeople',
          label: 'Posti letto',
          sortable: true
        },
        {
          key: 'price',
          label: 'Prezzo (a persona)',
          sortable: true,
          formatter: (value) => {
            return value + ' CHF'
          }
        },
        {
          key: 'createdAt',
          label: 'Data creazione',
          formatter: (value) => {
            return this.$moment(value).format('DD.MM.YYYY HH:mm')
          }
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        }
      ],
      isBusy: false
    }
  },
  async mounted () {
    // Load rooms
    await this.getRooms()
  },
  methods: {
    async getRooms () {
      // Set busy flag to true
      this.isBusy = true
      // Read data from APIs
      const rooms = await this.$axios.$get('room')
      // Set data in Vuex store
      this.data.rooms = rooms
      // Set busy flag to false
      this.isBusy = false
    },
    async addRoom () {
      await this.$axios.post('room', this.form).then(async () => {
        // Show message
        this.$swal({
          title: 'Camera aggiunta con successo',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })

        // Reload table
        await this.getRooms()

        // Clear form
        this.form.name = this.form.description = ''
      }).catch((err) => {
        if (err.response) {
          // Specific error
          this.$swal({
            title: err.response.data.error,
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        } else {
          this.$swal({
            title: 'Creazione stanza',
            text: 'C\'è stato un errore non conosciuto, riprova più tardi',
            icon: 'error',
            showConfirmButton: true
          })
        }
      })
    },
    async updateRoom (room) {
      await this.$axios.patch('room/' + room.id, { name: room.name, description: room.description, price: room.price, nPeople: room.nPeople }).then(async () => {
        // Close modal
        this.hideModal()

        // Show message
        this.$swal({
          title: 'Camera modificata con successo',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })

        // Reload table
        await this.getRooms()

        // Clear modal data
        this.modal.name = this.modal.description = ''
        this.modal.id = null
      }).catch((err) => {
        if (err.response) {
          // Show error toast
          this.$swal({
            title: err.response.data.error,
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        } else {
          this.$swal({
            title: 'Modifica stanza',
            text: 'C\'è stato un errore non conosciuto, riprova più tardi',
            icon: 'warning',
            showConfirmButton: true
          })
        }
      })
    },
    deleteRoom (room) {
      this.$swal({
        title: 'Elimina stanza',
        html: `Sei sicuro di voler eliminare la stanza <b>${room.name}</b>? <br><br> Eliminando la stanza essa non sarà più disponibile e tutte le prenotazioni legate ad essa verranno eliminate. Vuoi continuare?`,
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Conferma eliminazione',
        cancelButtonText: 'Annulla',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showCancelButton: true
      }).then((status) => {
        if (status.isConfirmed) {
          this.$axios.$delete('room/' + room.id).then((response) => {
            // Success toast
            this.$swal({
              title: 'Stanza eliminata con successo',
              icon: 'success',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
            // Update room list
            this.getRooms()
          }).catch((err) => {
            if (err.response) {
              // Show error toast
              this.$swal({
                title: err.response.data.error,
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              })
            } else {
              this.$swal({
                title: 'Elimina stanza',
                text: 'C\'è stato un errore non conosciuto, riprova più tardi',
                icon: 'warning',
                showConfirmButton: true
              })
            }
          })
        }
      })
    },
    toggleActions (item) {
      this.$set(item, '_showDetails', !item._showDetails)
    },
    showModal (room) {
      // Set data
      this.modal.id = room.id
      this.modal.name = room.name
      this.modal.description = room.description
      this.modal.nPeople = room.nPeople
      this.modal.price = room.price
      // Toggle modal
      this.$refs.modal.show()
    },
    hideModal () {
      this.$refs.modal.hide()
    },
    priceFormatter (value) {
      const newValue = parseFloat(value.replace(/[A-Za-z]/g, ''))
      // Ensure that it is not NaN
      if (isNaN(newValue)) {
        return 0
      } else {
        return newValue
      }
    }
  },
  layout: 'admin'
}
</script>
