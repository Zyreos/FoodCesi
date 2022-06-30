<template>
  <Bar
    :chart-options="chartOptions"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'NbOrdersPerDayChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'nb-orders-per-day-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
