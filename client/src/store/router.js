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
import notFoundComponent from '../components/pages/notFoundComponent.vue';


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'home',
      component: Home,
      meta: {
        title: 'Атута исклаи?',
      },
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
      component: addObject,
      meta: {
        title: 'Создать объект',
      },
    },
    {
      path: '/:id',
      name:'objectPage',
      component: objectPage
    },
    {
      path: '/get-districts',
      name:'getDistricts',
      component: getDistricts
    },
    {
      path: '*',
      component: notFoundComponent
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Заголовок';
  }
  next();
});

export default router;