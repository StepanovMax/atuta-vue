import Vue from 'vue';
import 'regenerator-runtime/runtime';
import vClickOutside from 'v-click-outside';

import router from './store/router.js';
import store from './store/store.js';

import App from './App.vue';
// plugins
import login from './plugins/login.js';
import cookie from './plugins/cookie.js';
import common from './plugins/common.js';
import dialogs from './plugins/dialogs.js';
import formatNumbers from './plugins/formatNumbers.js';
import './scss/index.scss';

import Meta from 'vue-meta';

Vue.directive(
  'local',
  el => {
    if (!window.location.hostname.includes('127.0.0.1')) {
      el.style.display = 'none';
    }
  }
);

Vue.directive(
  'hide',
  el => {
    el.style.display = 'none';
  }
);

Vue.use(Meta);
Vue.use(vClickOutside);

Vue.use(login);
Vue.use(cookie);
Vue.use(common);
Vue.use(dialogs);
Vue.use(formatNumbers);

Vue.config.productionTip = false;

Vue.config.errorHandler = (err) => {
  // alert(err);
};

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
