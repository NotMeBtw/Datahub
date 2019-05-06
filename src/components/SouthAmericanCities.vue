<template>
  <section class="container">
    <h3>Amount of cities in South American countries</h3>
    <b-spinner class="m-3" v-if="!countries || !cities"/>
    <bar-chart v-else :chart-data="chartData"/>
  </section>
</template>

<script>
import axios from "axios";
import BarChart from "@/components/charts/BarChart";
import Colors from "@/components/Colors";

export default {
  name: "SouthAmericanCities",
  components: { BarChart },
  extends: Colors,
  data() {
    return {
      cities: null,
      southAmericanCities: null,
      southAmericanCountries: null,
      countries: null,
      quantity: null,
      chartData: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.cities = await this.DatasetsService.worldCities;
      this.countries = await this.DatasetsService.countryCodes;

      this.southAmericanCountries = this.countries
        .filter(r => r.Continent === "SA")
        .map(r => r["CLDR display name"]);

      this.southAmericanCities = this.cities.filter(c =>
        this.southAmericanCountries.includes(c.country)
      );

      this.quantity = this.southAmericanCountries.map(
        country =>
          this.southAmericanCities.filter(city => city.country === country)
            .length
      );

      this.chartData = {
        labels: this.southAmericanCountries,
        datasets: [
          {
            label: "Cities of South American Countries",
            backgroundColor: this.colors.green,
            data: this.quantity
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
</style>
