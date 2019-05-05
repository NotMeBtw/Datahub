<template>
  <section class="container">
    <h3>Minimum and maximum size of the population in European Countries</h3>
    <line-chart :chart-data="chartData"/>
  </section>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/charts/LineChart";
import Colors from "@/components/Colors";

export default {
  name: "EuropeTrends",
  components: { LineChart },
  extends: Colors,
  data() {
    return {
      dataset: null,
      population: null,
      europeanCountries: null,
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

      const countries = await axios
        .get(
          "https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json"
        )
        .then(res => res.data);

      this.europeanCountries = countries
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
