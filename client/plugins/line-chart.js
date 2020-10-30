import Vue from 'vue'
import { Line } from 'vue-chartjs'

Vue.component('line-chart', {
  extends: Line,
  props: {
    labels: {
      type: Array,
      required: true
    },
    dataLabel: {
      type: String,
      default: () => {
        return 'UNKNOWN DATASET'
      }
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      gradient: null
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: this.dataLabel,
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: this.gradient,
            data: this.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
})
