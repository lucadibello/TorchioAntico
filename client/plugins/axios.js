export default function ({ $axios, $swal, app }) {
  $axios.onError((err) => {
    if (app.store.state.auth.loggedIn) {
      const statusCode = err.response.status
      switch (statusCode) {
        case 401:
          // Show notification with SWAL
          $swal({
            title: 'Errore codice d\'accesso',
            text: 'Una o più richieste sono fallite a causa di un problema con il codice di sicurezza assegnato alla tua sessione. Esegui nuovamente l\'accesso per risolvere il problema',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'Torna al login',
            showCloseButton: false
          }).then(() => {
            // Logout user
            app.$auth.logout()
          })

          break
        case 403:
          // Show notification with SWAL
          $swal({
            title: 'Sessione scaduta',
            text: 'La tua sessione è scaduta. Esegui nuovamente l\'accesso per continuare ad utilizzare il pannello di amministrazione',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'Torna al login',
            showCloseButton: false
          }).then(() => {
            /// Logout user
            app.$auth.logout()
          })
          break
      }
    }
  })
}
