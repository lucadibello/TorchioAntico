<template>
  <b-card :bg-variant="variant" :text-variant="textVariant" class="mb-2">
    <div class="row">
      <div class="col">
        <p class="h5 card-title text-uppercase mb-0">
          {{ title }}
        </p>
        <span class="h2 font-weight-bold mb-0">{{ value }}</span>
      </div>
      <div class="col-auto">
        <p class="h1">
          <b-icon :icon="icon" />
        </p>
      </div>
    </div>

    <template v-slot:footer>
      <p class="mt-3 mb-0 text-sm">
        <span class="mr-2">Aggiornato alle</span>
        <span class="text-nowrap text-danger">
          <b-badge v-if="updatedAt" variant="success">{{ updatedAt }}</b-badge>
          <b-badge v-else variant="danger">Mai aggiornato</b-badge>
        </span>
      </p>
    </template>
    <!-- Load animation -->
    <b-overlay :show="!loaded" :opacity=".95" spinner-type="grow" :spinner-variant="variant" no-wrap />
  </b-card>
</template>

<script>
export default {
  name: 'CounterIndicator',
  props: {
    title: {
      type: String,
      default: () => {
        return 'UNKNOWN'
      }
    },
    icon: {
      type: String,
      default: () => {
        return 'code-slash'
      }
    },
    value: {
      type: [String, Number],
      required: true,
      default: () => {
        return 0
      }
    },
    variant: {
      type: String,
      default: () => {
        return 'dark'
      }
    },
    textVariant: {
      type: String,
      default: () => {
        return 'white'
      }
    },
    updatedAt: {
      type: [String, Boolean],
      default: () => {
        return 'Mai aggiornato'
      }
    },
    loaded: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  }
}
</script>
