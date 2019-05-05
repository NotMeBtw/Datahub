<template>
  <section class="container">
    <h3>The trend of the Polish population in the years 1960 - 2016</h3>
    <line-chart :chart-data="chartData"/>
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
      date: null,
      chartData: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.dataset = await axios
        .get(
          "https://pkgstore.datahub.io/core/population/population_json/data/43d34c2353cbd16a0aa8cadfb193af05/population_json.json"
        )
        .then(res => res.data);

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
