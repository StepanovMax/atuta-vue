import Vue from 'vue';
import Router from 'vue-router';

import App from './App.vue';
import Home from './components/home.vue'
import StyleGuide from './components/styleGuide.vue'

import './scss/index.scss'

Vue.use(Router)

Vue.config.productionTip = false;

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'home',
      component: Home
    },
    {
      path: '/styleGuide',
      name:'styleGuide',
      component: StyleGuide
    }
  ]
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
