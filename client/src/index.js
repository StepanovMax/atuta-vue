import Vue from 'vue';
import 'regenerator-runtime/runtime';
import vClickOutside from 'v-click-outside';

import router from './store/router.js';
import store from './store/store.js';

import App from './App.vue';
// plugins
import getHost from './plugins/getHost.js';
import formatNumbers from './plugins/formatNumbers.js';
import './scss/index.scss';

import Meta from 'vue-meta';

Vue.directive(
  'local',
  el => {
    if (!window.location.hostname.includes('localhost')) {
      el.style.display = 'none';
    }
  }
);

Vue.use(Meta);
Vue.use(vClickOutside);
Vue.use(formatNumbers);
Vue.use(getHost);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
