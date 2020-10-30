<template>
  <section>
    <nuxt-link to="/admin/prenotazioni">
      <p class="text-primary">
        <b-icon-arrow-bar-left /> Torna alla gestione delle prenotazioni
      </p>
    </nuxt-link>
    <h1>Formato calendario</h1>
    <h4>Questa funzionalità è ancora in fase di sviluppo <b-icon-calendar-x /></h4>
  </section>
</template>

<script>
export default {
  name: 'BookingCalendar',
  layout: 'admin'
}
</script>
