<template>
  <section class="container">
    <h3>Comparison of population of United States, European Union Countries and Arab Countries</h3>
    <line-chart :chart-data="chartData"/>
  </section>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/charts/LineChart";
import Colors from "@/components/Colors";

export default {
  name: "PopulationTrends",
  components: { LineChart },
  extends: Colors,
  data() {
    return {
      dataset: null,
      usaPopulation: null,
      euPopulation: null,
      arabPopulation: null,
      dates: null,
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

      this.usaPopulation = this.dataset
        .filter(d => d["Country Name"] === "United States")
        .map(record => record.Value);

      this.euPopulation = this.dataset
        .filter(d => d["Country Name"] === "European Union")
        .map(record => record.Value);

      this.arabPopulation = this.dataset
        .filter(d => d["Country Name"] === "Arab World")
        .map(record => record.Value);

      this.dates = this.dataset
        .map(p => p.Year)
        .filter((v, i, arr) => arr.indexOf(v) === i);

      this.chartData = {
        labels: this.dates,
        datasets: [
          {
            label: "United States",
            borderColor: this.colors.red,
            data: this.usaPopulation
          },
          {
            label: "European Union",
            borderColor: this.colors.blue,
            data: this.euPopulation
          },
          {
            label: "Arab Countries",
            borderColor: this.colors.green,
            data: this.arabPopulation
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
</style>
