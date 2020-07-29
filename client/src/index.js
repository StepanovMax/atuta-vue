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
    isFilterOpen: false,
    filterData: {
      town: null,
      district: null,
      deal: null,
      object: null,
      seller: null,
      garage: {
        type: null,
        security: null,
        garageType: null,
        parkingType: null,
        area: null,
        rent: null,
        price: null,
      },
      app: {
        type: null,
        view: null,
        floor: null,
        floorAll: null,
        floorNot: null,
        roomsCount: null,
        area: null,
        price: null,
        rent: null,
        rentType: null,
      },
    },
  },
  mutations: {
    switchFilter(state, data) {
      state.isFilterOpen = data;
    },
    resetFilter(state) {
      let obj = {
        ...state.filterData
      };
      Object.keys(obj).forEach(function(key1) {
        obj[key1] = null;
        if (obj[key1] !== null && typeof obj[key1] === 'object') {
          Object.keys(obj[key1]).forEach(function(key2) {
            obj[key1][key2] = null;
          });
        }
        return obj;
      });
      state.filterData = obj;
    },
    updateFilterState(state, data) {
      state.filterData = data;
    },
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
