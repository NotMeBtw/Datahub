<template>
  <section>
    <line-chart :chart-data="chartData"/>
  </section>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/charts/LineChart";

export default {
  name: "PopulationTrends",
  components: { LineChart },
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
            label: "Population of United States",
            borderColor: "#f87979",
            data: this.usaPopulation
          },
          {
            label: "Population of European Union",
            borderColor: "#79f879",
            data: this.euPopulation
          },
          {
            label: "Population of Arab Countries",
            borderColor: "#7979f8",
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
