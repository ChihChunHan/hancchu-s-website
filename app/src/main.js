import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const app = document.getElementById("app")

console.log(app);


new Vue({
  render: h => h(App),
}).$mount(app)
