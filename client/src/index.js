import Vue from 'vue';
import 'regenerator-runtime/runtime';
import router from './store/router.js';
import store from './store/store.js';

import App from './App.vue';
// plugins
import formatNumbers from './plugins/formatNumbers.js';
import './scss/index.scss';


Vue.use(formatNumbers);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
