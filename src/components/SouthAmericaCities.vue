<template>
  <section class="container">
    <h3>Amount of cities in South American Countries</h3>
    <bar-chart :chart-data="chartData"/>
  </section>
</template>

<script>
import axios from "axios";
import BarChart from "@/components/charts/BarChart";
import Colors from "@/components/Colors";

export default {
  name: "SouthAmericaCities",
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
      this.cities = await axios
        .get(
          "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
        )
        .then(res => res.data);

      this.countries = await axios
        .get(
          "https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json"
        )
        .then(res => res.data);

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
