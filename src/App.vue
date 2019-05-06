<template>
  <div id="app">
    <b-navbar id="navbar" toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#">Datahub</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="(comp, index) in componentsNames"
            :key="index"
            v-scroll-to="`#${comp.compName}`"
          >{{comp.displayName}}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div v-for="(comp, index) in componentsNames" :key="index" class="component">
      <component :is="comp.compName" :id="comp.compName"></component>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PolandPopulation from "@/components/PolandPopulation";
import WorldCurrencies from "@/components/WorldCurrencies";
import PopulationTrends from "@/components/PopulationTrends";
import EuropePopulation from "@/components/EuropePopulation";
import SouthAmericanCities from "@/components/SouthAmericanCities";
import Map from "@/components/Map";

export default {
  name: "App",
  components: {
    PolandPopulation,
    WorldCurrencies,
    PopulationTrends,
    EuropePopulation,
    SouthAmericanCities,
    Map
  },
  data() {
    return {
      componentsNames: [
        { compName: "PolandPopulation", displayName: "Population of Poland" },
        { compName: "WorldCurrencies", displayName: "World currencies" },
        { compName: "PopulationTrends", displayName: "Population trends" },
        { compName: "EuropePopulation", displayName: "Population of Europe" },
        {
          compName: "SouthAmericanCities",
          displayName: "South American cities"
        },
        { compName: "Map", displayName: "Map" }
      ]
    };
  }
};
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #343a40;
  font-size: 16px;
  text-align: center;
  padding-top: 3.5rem;

  .component {
    padding: 3rem 0;

    &:nth-child(2n) {
      background-color: #eee;
    }

    &:last-child() {
      margin-bottom: 0;
    }
  }
}
</style>
