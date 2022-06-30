<template>
  <Pie
    :chart-options="chartOptions"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
  />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'MostPopularArticlesChart',
  components: { Pie },
  props: {
    chartId: {
      type: String,
      default: 'most-popular-articles-chart'
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
