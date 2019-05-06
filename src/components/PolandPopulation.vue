<template>
  <section class="container">
    <h3>The trend of the Polish population in the years 1960 - 2016</h3>
    <b-spinner class="m-3" v-if="!dataset"/>
    <line-chart v-else :chart-data="chartData"/>
  </section>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/charts/LineChart";
import Colors from "@/components/Colors";

export default {
  name: "PolandPopulation",
  components: { LineChart },
  extends: Colors,
  data() {
    return {
      dataset: null,
      population: null,
      dates: null,
      chartData: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.dataset = await this.DatasetsService.population;

      const polandPopulation = this.dataset.filter(
        d => d["Country Name"] === "Poland"
      );

      this.population = polandPopulation.map(p => p.Value);
      this.dates = polandPopulation.map(p => p.Year);

      this.chartData = {
        labels: this.dates,
        datasets: [
          {
            label: "Population of Poland",
            borderColor: this.colors.red,
            data: this.population
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
</style>
