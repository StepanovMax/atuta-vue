import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Pages
import Home from '../components/home.vue';
import addObject from '../components/pages/addObject.vue';
import StyleGuide from '../components/pages/styleGuide.vue';
import objectPage from '../components/pages/objectPage.vue';
import profilePage from '../components/pages/profilePage.vue';
import messagesPage from '../components/pages/messagesPage.vue';
import getDistricts from '../components/pages/getDistricts.vue';
import favoritesPage from '../components/pages/favoritesPage.vue';


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
    },
    {
      path: '/object-page',
      name:'objectPage',
      component: objectPage
    },
    {
      path: '/get-districts',
      name:'getDistricts',
      component: getDistricts
    },
  ]
});

export default router;