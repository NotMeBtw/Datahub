import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VueScrollTo from 'vue-scrollto'
import DatasetsService from "@/services/DatasetsService.js"

import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

Vue.prototype.DatasetsService = DatasetsService

Vue.use(BootstrapVue)
Vue.use(VueScrollTo, {
  offset: -104,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
