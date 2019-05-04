<template>
  <section>
    <bar-chart :chart-data="chartData"/>
    <b-list-group class="w-50 m-auto">
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        Countries:
        <b-badge variant="primary">{{countries}}</b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        Countries with Euro:
        <b-badge variant="primary">{{euroQuantity}}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </section>
</template>

<script>
import axios from "axios";
import BarChart from "@/components/charts/BarChart";

export default {
  name: "WorldCurrency",
  components: { BarChart },
  data() {
    return {
      dataset: null,
      countries: null,
      currenciesArray: null,
      quantity: null,
      euroQuantity: null,
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
          "https://pkgstore.datahub.io/core/country-codes/country-codes_json/data/471a2e653140ecdd7243cdcacfd66608/country-codes_json.json"
        )
        .then(res => res.data);

      const countryCurrencyArray = this.dataset.map(d => ({
        country: d["ISO4217-currency_country_name"],
        currency: d["ISO4217-currency_name"]
      }));

      this.currenciesArray = countryCurrencyArray
        .map(wc => wc.currency)
        .filter((v, i, arr) => arr.indexOf(v) === i);

      this.quantity = this.currenciesArray.map(
        c => countryCurrencyArray.filter(cc => cc.currency === c).length
      );

      this.euroQuantity = countryCurrencyArray.filter(
        cc => cc.currency == "Euro"
      ).length;

      this.countries = countryCurrencyArray.length;

      this.chartData = {
        labels: this.currenciesArray,
        datasets: [
          {
            label: "World Currencies' Quantity",
            backgroundColor: "#f87979",
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
