import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import highChartsVue from "highcharts-vue";


Vue.use(highChartsVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
