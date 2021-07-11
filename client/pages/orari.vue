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
      >
        <!-- A custom formatted column -->
        <template #cell(open)="data">
          <span v-if="Array.isArray(data.value)">{{ data.value[0] }} <br> {{ data.value[1] }}</span>
          <span v-else>{{ data.value }}</span>
        </template>

        <!-- A custom formatted column -->
        <template #cell(closes)="data">
          <span v-if="Array.isArray(data.value)">{{ data.value[0] }} <br> {{ data.value[1] }}</span>
          <span v-else>{{ data.value }}</span>
        </template>
      </b-table>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'Orari',
  data: () => ({
    hours: [
      {
        // SUNDAY
        isOpen: true,
        name: 'Domenica',
        open: ['10:00', '14:00'],
        closes: ['17:00', '23:00']
      },
      {
        // MONDAY
        isOpen: false,
        name: 'Lunedì',
        _rowVariant: 'danger',
        open: 'Chiuso',
        closes: 'Chiuso'
      },
      { // TUESDAY
        isOpen: true,
        name: 'Martedì',
        open: '17:00',
        closes: '22:00'
      },
      { // WEDNESDAY
        isOpen: true,
        name: 'Mercoledì',
        open: '17:00',
        closes: '22:00'
      },
      { // THURSDAY
        isOpen: true,
        name: 'Giovedì',
        open: '17:00',
        closes: '22:00'
      },
      { // FRIDAY
        isOpen: true,
        name: 'Venerdì',
        open: '17:00',
        closes: '22:00'
      },
      { // SATURDAY
        isOpen: true,
        name: 'Sabato',
        open: ['10:00', '14:00'],
        closes: ['17:00', '23:00']
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
