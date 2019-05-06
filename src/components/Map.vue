<template>
  <section class="container">
    <h3>World map with population</h3>
    <b-spinner class="m-3" v-if="!dataset"/>
    <div v-else ref="map" id="map"></div>
  </section>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import axios from "axios";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      map: null,
      geoJson: null,
      tileLayer: null,
      population: null,
      dataset: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.dataset = await this.DatasetsService.geo;
      this.population = await this.DatasetsService.population.then(res =>
        res
          .filter(d => d.Year === 2016)
          .map(d => ({ country: d["Country Code"], value: d.Value }))
      );

      this.map = L.map("map").setView([53, 23], 3);
      this.tileLayer = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
      );
      this.tileLayer.addTo(this.map);

      const self = this;
      this.geoJson = L.geoJson(this.dataset, {
        onEachFeature: function(feature, layer) {
          layer.on("mouseover", e => {
            var popup = L.popup({ closeButton: false })
              .setLatLng(layer.getBounds().getCenter())
              .setContent(
                "<h5>" +
                  feature.properties.ADMIN +
                  "</h5><div>Population: " +
                  self.getPop(feature.properties.ISO_A3) +
                  "</div>"
              )
              .openOn(self.map);
          });
        }
      }).addTo(this.map);
    },
    getPop(country) {
      const pop = this.population.find(p => p.country === country);
      return pop ? pop.value : 0;
    }
  }
};
</script>

<style>
#map {
  height: 30rem;
}
</style>
