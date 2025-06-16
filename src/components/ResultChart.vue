<template>
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
  
</template>


<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'ResultChart',

  props: {

  },
  components: { Pie },
  computed: {
    chartData(){
      return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12], backgroundColor: ['blue', '#0f0', '#00f']} ],
        
      },
      chartOptions: {
        responsive: true
      }
    }
    }
  
  }
}
</script>