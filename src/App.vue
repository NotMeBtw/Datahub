<template>
  <div id="app" class="container">
    <PolandPopulation/>
    <WorldCurrency/>
    <PopulationTrends/>
  </div>
</template>

<script>
import PolandPopulation from "./components/PolandPopulation";
import WorldCurrency from "./components/WorldCurrency";
import PopulationTrends from "./components/PopulationTrends";

export default {
  name: "App",
  components: {
    PolandPopulation,
    WorldCurrency,
    PopulationTrends
  }
};
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
}

section {
  margin: 5rem 0;
}
</style>
