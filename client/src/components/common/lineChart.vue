<script>
import VueChartJs from 'vue-chartjs';
import { Bar, Line } from 'vue-chartjs';

export default {
  name: 'lineChart',
  extends: Bar,
  mounted () {
    this.renderChart(
      {
        labels: ['22, Пн', '23, Вт', '24, Ср', '25, Чт', '26, Пт'],
        datasets: [
          {
            label: 'Просмотры',
            backgroundColor: '#0096C7',
            data: [10, 20, 12, 39, 10]
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    )
  },
}
</script> 