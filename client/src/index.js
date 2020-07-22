import Vue from 'vue';
import Vuex from 'vuex'
import Router from 'vue-router';

import App from './App.vue';
import Home from './components/home.vue'
import StyleGuide from './components/styleGuide.vue'
import favoritesPage from './components/favoritesPage.vue'
import messagesPage from './components/messagesPage.vue'
import profilePage from './components/profilePage.vue'
import addObject from './components/addObject.vue'

import './scss/index.scss'

Vue.use(Router)
Vue.use(Vuex)

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
    },
    {
      path: '/favorites',
      name:'favorites',
      component: favoritesPage
    },
    {
      path: '/messages',
      name:'messages',
      component: messagesPage
    },
    {
      path: '/profile',
      name:'profile',
      component: profilePage
    },
    {
      path: '/add-object',
      name:'addObject',
      component: addObject
    }
  ]
});

const store = new Vuex.Store({
  state: {
    count: 11.7,
    filterData: {
      isBuyOrRent: null,
      objectType: null,
      garageOrParkingData: {
        isGarageOrParking: null,
        garageType: [],
        parkingType: [],
        security: null,
      },
      areaRange: [],
    },
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
