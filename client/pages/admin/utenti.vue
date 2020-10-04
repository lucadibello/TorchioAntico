<template>
  <article>
    <h2>Gestione utenti</h2>
    <hr>
    <!-- Create form -->
    <b-form class="mb-5" @submit.prevent="addUser" @reset="resetForm">
      <b-form-group
        id="input-group-1"
        label="Indirizzo email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Es: pinco.pallino@email.ch"
          autocomplete="off"
        />
      </b-form-group>

      <!-- Nome -->
      <b-form-group
        id="input-group-2"
        label="Nome:"
        label-for="input-name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          :formatter="nameFormatter"
          required
          placeholder="Es: Pinco"
          autocomplete="off"
        />
      </b-form-group>

      <!-- Cognome -->
      <b-form-group
        id="input-group-3"
        label="Cognome:"
        label-for="input-surname"
      >
        <b-form-input
          id="input-surname"
          v-model="form.surname"
          type="text"
          :formatter="nameFormatter"
          required
          placeholder="Es: Pallino"
          autocomplete="off"
        />
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="input-group-4"
        label="Password:"
        label-for="input-password"
        description="Non comunicare la password a nessuno tranne che al diretto interessato"
      >
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          :state="isPasswordValid()"
          description="Inserisci nuovamente la password"
          autocomplete="off"
          required
        />
      </b-form-group>

      <!-- Confirm password -->
      <b-form-group
        id="input-group-5"
        label="Conferma password:"
        label-for="input-confirm-password"
      >
        <b-form-input
          id="input-confirm-password"
          v-model="form.confirm_password"
          :state="isPasswordValid()"
          type="password"
          required
          autocomplete="off"
        />

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback id="input-live-feedback">
          Le due password non coincidono
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="primary">
          Aggiungi utente
        </b-button>
        <b-button type="reset" variant="danger">
          Cancella modulo
        </b-button>
      </b-form-group>
    </b-form>

    <h4>Utenti disponibili</h4>
    <section>
      <b-table
        striped
        hover
        :fields="fields"
        :items="users.data"
        :busy.sync="busy"
        :responsive="true"
        show-empty
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
            <h5 class="font-weight-bold">
              Informazioni aggiuntive
            </h5>
            <p>Creato il: {{ $moment(item.createdAt).format('DD.MM.YYYY HH:mm') }}</p>
            <p>Ultima modifica: {{ $moment(item.updatedAt).format('DD.MM.YYYY HH:mm') }}</p>

            <!-- Card footer block -->
            <template v-slot:footer>
              <!-- Text -->
              <small class="text-muted mr-4">Azioni su <b>{{ item.name + ' ' + item.surname }}</b></small>

              <div style="float:right;">
                <!-- Actions -->
                <b-button type="submit" variant="warning" @click="showModal(item)">
                  Modifica utente
                </b-button>

                <b-button type="submit" variant="danger" @click="deleteUser(item)">
                  Elimina utente
                </b-button>
              </div>
            </template>
          </b-card>
        </template>
      </b-table>
    </section>

    <!-- Edit modal -->
    <b-modal ref="modal" hide-footer>
      <!-- Modifica utente -->
      <template v-slot:modal-title>
        Modifica utente
      </template>
      <!-- Form -->
      <b-form class="mb-5" @submit.prevent="updateUser(modal)">
        <!-- Name -->
        <b-form-group
          id="input-group-1"
          label="Nome:"
          label-for="input-name"
        >
          <b-form-input
            id="input-name"
            v-model="modal.name"
            type="text"
            :formatter="nameFormatter"
            required
            placeholder="Es: Pinco"
          />
        </b-form-group>

        <!-- Surname -->
        <b-form-group
          id="input-group-2"
          label="Cognome:"
          label-for="input-surname"
        >
          <b-form-input
            id="input-surname"
            v-model="modal.surname"
            type="text"
            :formatter="nameFormatter"
            required
            placeholder="Es: Pallino"
          />
        </b-form-group>

        <!-- Email -->
        <b-form-group
          id="input-group-3"
          label="E-Mail:"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            v-model="modal.email"
            type="email"
            required
            placeholder="Es: pinco.pallno@esempio.ch"
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

    <!-- Edit modal -->
    <b-modal ref="redirect" hide-footer>
      <!-- Modifica utente -->
      <template v-slot:modal-title>
        Modifica utente
      </template>

      <div class="w-100 text-center">
        <p>
          Per modificare le informazioni del tuo profilo puoi farlo dalla pagina
          <nuxt-link to="/admin/profilo">
            <span class="font-weight-bold text-primary">Il mio profilo</span>
          </nuxt-link>
        </p>
      </div>
    </b-modal>
  </article>
</template>

<script>
export default {
  name: 'UsersManager',
  data () {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      modal: {
        name: '',
        surname: '',
        email: '',
        _identifier: ''
      },
      users: {
        data: []
      },
      busy: false,
      fields: [
        {
          key: 'name',
          label: 'Nome',
          sortable: true
        },
        {
          key: 'surname',
          label: 'Cognome',
          sortable: true
        },
        {
          key: 'email',
          label: 'E-Mail',
          sortable: true
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        }
      ]
    }
  },
  async mounted () {
    // Load rooms
    await this.getUsers()
  },
  methods: {
    addUser () {
      if (this.isPasswordValid()) {
        this.$axios.post('/user', {
          name: this.form.name,
          surname: this.form.surname,
          email: this.form.email,
          password: this.form.password
        }).then(() => {
          // User created successfully
          this.$swal({
            title: `L'utente ${this.form.name} è stato creato correttamente`,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
          // Refresh users
          this.getUsers()
        }).catch((err) => {
          if (err.response && err.response.data.type === 'ER_USER_EXISTS') {
            // Specific error
            this.$swal({
              title: 'Esiste già un utente con l\'indirizzo mail scelto. Scegli un\'altro indirizzo',
              icon: 'error',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
          } else {
            this.$swal({
              title: 'Creazione utente',
              text: 'C\'è stato un errore non conosciuto, riprova più tardi',
              icon: 'error',
              showConfirmButton: true
            })
          }
        })
      } else {
        // Specific error
        this.$swal({
          title: 'Controlla che le password inserite conicidano',
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      }
    },
    async getUsers () {
      try {
        // Set busy flag to true
        this.busy = true
        // Fetch users
        this.users.data = await this.$axios.$get('user')
        // Reset busy flag to false
        this.busy = false
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err)
      }
    },
    deleteUser (user) {
      this.$swal({
        title: 'Eliminazione utente',
        html: `Stai per eliminare l'utente <b>${user.name}</b> <br><br> Eliminandolo gli sarà impossibile accedere al sistema. Vuoi continuare?`,
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Conferma eliminazione',
        cancelButtonText: 'Annulla',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showCancelButton: true
      }).then((status) => {
        if (status.isConfirmed) {
          this.$axios.$delete('user/' + user.email).then((response) => {
            // Success toast
            this.$swal({
              title: 'Utente eliminato con successo',
              icon: 'success',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
            // Update user list
            this.getUsers()
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
                title: 'Eliminazione utente',
                text: 'C\'è stato un errore non conosciuto, riprova più tardi',
                icon: 'warning',
                showConfirmButton: true
              })
            }
          })
        }
      })
    },
    async updateUser (user) {
      await this.$axios.patch(`user/${user._identifier}`, {
        name: user.name,
        email: user.email,
        surname: user.surname
      }).then(async (result) => {
        // Reload table
        await this.getUsers()

        // Hide modal
        this.hideModal()

        // Show notification
        this.$swal({
          title: `Informazioni dell'account di ${user.name} modificate correttamente`,
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })

        // Reset modal inputs
        this.modal.name = ''
        this.modal.surname = ''
        this.modal.email = ''
        this.modal._identifier = ''
      }).catch((err) => {
        if (err.response && err.response.data.type === 'ER_USER_EXISTS') {
          // Show already exists error message
          this.$swal({
            title: 'Esiste già un utente con lo stesso indirizzo mail',
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        } else {
          // Show general error
        }
      })
    },
    showModal (user) {
      if (user.email === this.$store.state.auth.user.email) {
        // Toggle modal
        this.$refs.redirect.show()
      } else {
        // Set data
        this.modal.name = user.name
        this.modal.surname = user.surname
        this.modal.email = user.email
        this.modal._identifier = user.email
        // Toggle modal
        this.$refs.modal.show()
      }
    },
    hideModal () {
      // Hide modal
      this.$refs.modal.hide()
    },
    resetForm () {
      // Reset form to default values
      this.form.name = ''
      this.form.surname = ''
      this.form.email = ''
      this.form.password = ''
      this.form.confirm_password = ''
    },
    isPasswordValid () {
      return Boolean(this.form.password) && Boolean(this.form.confirm_password) &&
        this.form.password === this.form.confirm_password
    },
    nameFormatter (value) {
      // Split letters
      const splitStr = value.toLowerCase().split(' ')
      // Cycle every letter
      for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      // Directly return the joined string
      return splitStr.join(' ')
    },
    toggleActions (item) {
      // Toggle actions
      this.$set(item, '_showDetails', !item._showDetails)
    }
  },
  layout: 'admin'
}
</script>
