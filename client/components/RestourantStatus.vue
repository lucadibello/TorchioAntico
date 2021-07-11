<template>
  <b-jumbotron id="status-jumbotron" bg-variant="success" text-variant="white" border-variant="dark">
    <template v-if="Boolean(todaySchedule) && Boolean(todaySchedule.isOpen)" #header>
      Oggi siamo aperti
      <b-iconstack>
        <b-icon stacked icon="circle-fill" variant="light" />
        <b-icon stacked icon="check-all" variant="success" />
      </b-iconstack>
    </template>
    <template v-else #header>
      Oggi siamo chiusi
      <b-iconstack>
        <b-icon stacked icon="circle-fill" variant="light" />
        <b-icon stacked icon="exclamation-diamond" variant="danger" />
      </b-iconstack>
    </template>

    <template v-if="Boolean(todaySchedule) && Boolean(todaySchedule.isOpen) && showHours" #lead>
      <client-only>
        <b-table
          small
          :busy="isBusy"
          class="text-white text-center mt-3 font-weight-bold"
          variant="light"
          :items="[todaySchedule]"
          :fields="hoursField"
        >
          <template #table-busy>
            <div class="text-center text-white my-2">
              <b-spinner class="align-middle" />
              <strong>Carico informazioni</strong>
            </div>
          </template>

          <!-- A custom formatted column -->
          <template #cell(open)="data">
            <span v-if="Array.isArray(data.value)">{{ data.value[0] }} <br> {{ data.value[1] }}</span>
            <span v-else>{{ data.value }}</span>
          </template>

          <template #cell(closes)="data">
            <span v-if="Array.isArray(data.value)">{{ data.value[0] }} <br> {{ data.value[1] }}</span>
            <span v-else>{{ data.value }}</span>
          </template>
        </b-table>
      </client-only>
    </template>

    <span v-if="showButton" class="my-4">
      <!-- View hours -->
      <div class="w-100 text-left">
        <nuxt-link to="/orari" class="mr-2">
          <b-button variant="light" class="text-dark" rounded>
            Guarda gli orari
          </b-button>
        </nuxt-link>
      </div>
    </span>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'RestourantStatus',
  props: {
    showHours: {
      type: Boolean,
      required: false,
      default: () => {
        return true
      }
    },
    showButton: {
      type: Boolean,
      required: false,
      default: () => {
        return true
      }
    },
    hours: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isBusy: true,
    todaySchedule: null,
    hoursField: [
      {
        key: 'open',
        label: 'Orario apertura',
        sortable: false
      },
      {
        key: 'closes',
        label: 'Orario chiusura',
        sortable: false
      }
    ]
  }),
  beforeMount () {
    // Get current day
    const date = new Date()
    this.todaySchedule = this.hours[date.getDay()]
    this.isBusy = false
  }
}
</script>

<style scoped>
  @media only screen and (max-width: 600px) {
    #status-jumbotron h1{
      text-align: center !important;
    }

    #status-jumbotron svg {
      display:block;
      width: 100%;
      margin-top: 3vh;
      margin-bottom: 3vh;
    }
  }
</style>
