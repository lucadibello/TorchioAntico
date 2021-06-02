<template>
  <section>
    <b-container fluid>
      <client-only>
        <restourant-status :hours="hours" :show-button="false" :show-hours="false" />
      </client-only>
      <h2 class="display-5 title">
        Orario settimanale:
      </h2>
      <b-table
        hover
        striped
        responsive
        small
        class="mt-3 text-center"
        variant="dark"
        :items="hours"
        :fields="hoursField"
      />
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'Orari',
  data: () => ({
    hours: [
      { // SUNDAY
        name: 'Domenica',
        isOpen: true,
        open: '09:00',
        closes: '23:00'
      },
      { // MONDAY
        name: 'Lunedì',
        isOpen: false,
        open: 'Chiuso',
        closes: 'Chiuso',
        _rowVariant: 'danger'
      },
      { // TUESDAY
        name: 'Martedì',
        isOpen: true,
        open: '17:00',
        closes: '23:00'
      },
      { // WEDNESDAY
        name: 'Mercoledì',
        isOpen: true,
        open: '17:00',
        closes: '23:00'
      },
      { // THURSDAY
        name: 'Giovedì',
        isOpen: true,
        open: '17:00',
        closes: '23:00'
      },
      { // FRIDAY
        name: 'Venerdì',
        isOpen: true,
        open: '09:00',
        closes: '23:00'
      },
      { // SATURDAY
        name: 'Sabato',
        isOpen: true,
        open: '09:00',
        closes: '23:00'
      }
    ],
    hoursField: [
      {
        key: 'name',
        label: 'Giorno',
        sortable: false
      },
      {
        key: 'open',
        label: 'Orario apertura',
        sortable: true
      },
      {
        key: 'closes',
        label: 'Orario chiusura',
        sortable: true
      }
    ]
  }),
  head: () => ({
    title: 'Orari',
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'Orari settimanali ristorante Al Torchio Antico'
    }, {
      hid: 'og:description',
      name: 'og:description',
      content: 'Orari settimanali ristorante Al Torchio Antico'
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Orari'
    }]
  })
}
</script>
