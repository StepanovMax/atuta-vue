import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Pages
import HomePage from '../components/homePage.vue';
import addObject from '../components/pages/addObject.vue';
import StyleGuide from '../components/pages/styleGuide.vue';
import objectPage from '../components/pages/objectPage.vue';
import profilePage from '../components/pages/profilePage.vue';
import messagesPage from '../components/pages/messagesPage.vue';
import getDistricts from '../components/pages/getDistricts.vue';
import favoritesPage from '../components/pages/favoritesPage.vue';
import companyPage from '../components/pages/companyPage.vue';
import companiesPage from '../components/pages/companiesPage.vue';
import helpPage from '../components/pages/helpPage.vue';
import answer from '../components/common/answer.vue';
import notFoundComponent from '../components/pages/notFoundComponent.vue';


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'homePage',
      component: HomePage,
      meta: {
        title: 'Атута смотрели?',
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
      path: '/get-districts',
      name:'getDistricts',
      component: getDistricts
    },
    {
      path: '/companies',
      name:'companiesPage',
      component: companiesPage,
      meta: {
        title: 'Список компаний',
      },
    },
    {
      path: '/help',
      name:'helpPage',
      component: helpPage,
      meta: {
        title: 'Помощь',
      },
      children: [{
        path: '/help/:id',
        name:'answer',
        component: answer,
      }],
    },
    {
      path: '/objects/:id',
      name:'objectPage',
      component: objectPage,
      meta: {
        title: 'Страница объекта',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      },
    },
    {
      path: '/companies/:id',
      name:'companyPage',
      component: companyPage,
      meta: {
        title: 'Страница компании',
        metaTags: [
          {
            name: 'description',
            content: 'metaTags name Страница компании'
          },
          {
            property: 'og:description',
            content: 'metaTags property Страница компании'
          }
        ]
      },
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