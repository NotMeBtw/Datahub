<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "LineChart",
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        elements: {
          line: {
            fill: false
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    Chart.defaults.global.defaultFontColor = "#343a40";
    this.renderChart(this.chartData, this.options);
  }
};
</script>