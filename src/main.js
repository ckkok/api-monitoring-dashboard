import Vue from 'vue';
import VueWorker from 'vue-worker';
import App from './App.vue';
import router from './router/router';


Vue.config.productionTip = false;

Vue.use(VueWorker);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
