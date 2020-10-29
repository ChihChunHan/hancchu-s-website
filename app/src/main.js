import Vue from "vue";
import Vuex from "vuex";
import { config } from "./store/store.js";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store(config);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
