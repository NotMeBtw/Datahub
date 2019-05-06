<template>
  <section class="container">
    <h3>Distribution of currencies in use in the world</h3>
    <b-spinner class="m-3" v-if="!dataset"/>
    <bar-chart v-else :chart-data="chartData"/>
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
import Colors from "@/components/Colors";

export default {
  name: "WorldCurrency",
  components: { BarChart },
  extends: Colors,
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
      this.dataset = await this.DatasetsService.countryCodes;

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
            label: "Currency quantity",
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
