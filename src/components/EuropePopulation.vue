<template>
  <section class="container">
    <h3>Minimum and maximum size of the population in European countries</h3>
    <b-spinner class="m-3" v-if="!dataset"/>
    <line-chart v-else :chart-data="chartData"/>
  </section>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/charts/LineChart";
import Colors from "@/components/Colors";

export default {
  name: "EuropePopulation",
  components: { LineChart },
  extends: Colors,
  data() {
    return {
      dataset: null,
      population: null,
      europeanCountries: null,
      countries: null,
      chartData: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.dataset = await this.DatasetsService.population;
      this.countries = await this.DatasetsService.countryCodes;

      this.europeanCountries = this.countries
        .filter(r => r.Continent === "EU")
        .map(r => r["CLDR display name"]);

      this.population = this.europeanCountries.map(c => {
        const filteredCountry = this.dataset
          .filter(d => d["Country Name"] === c)
          .map(r => r.Value);

        return {
          country: c,
          max: Math.max(...filteredCountry),
          min: Math.min(...filteredCountry)
        };
      });

      this.chartData = {
        labels: this.europeanCountries,
        datasets: [
          {
            label: "Min",
            backgroundColor: this.colors.blue,
            showLine: false,
            data: this.population.map(p => p.min)
          },
          {
            label: "Max",
            backgroundColor: this.colors.red,
            showLine: false,
            data: this.population.map(p => p.max)
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
</style>
