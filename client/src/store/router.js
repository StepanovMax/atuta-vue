import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

Vue.use(Router);

// Pages
import HomePage from '../components/homePage.vue';
import answer from '../components/common/answer.vue';
import helpPage from '../components/pages/helpPage.vue';
import addObject from '../components/pages/addObject.vue';
import styleGuide from '../components/pages/styleGuide.vue';
import objectPage from '../components/pages/objectPage.vue';
import profilePage from '../components/pages/profilePage.vue';
import companyPage from '../components/pages/companyPage.vue';
import getDistricts from '../components/pages/getDistricts.vue';
import companiesPage from '../components/pages/companiesPage.vue';
// Profile sub pages
import pocket from '../components/pages/profile/pocket.vue';
import settings from '../components/pages/profile/settings.vue';
import messages from '../components/pages/profile/messages.vue';
import myObjects from '../components/pages/profile/myObjects.vue';
import favorites from '../components/pages/profile/favorites.vue';
// Reg section
import loginPage from '../components/pages/loginPage.vue';
import forgotPasswordPage from '../components/pages/forgotPasswordPage.vue';
import registrationPage from '../components/pages/registrationPage.vue';
// 404
import notFoundComponent from '../components/pages/errors/notFoundComponent.vue';
import userNotLoggedInComponent from '../components/pages/errors/userNotLoggedInComponent.vue';


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
      component: styleGuide
    },
    {
      path: '/registration',
      name:'registrationPage',
      component: registrationPage
    },
    {
      path: '/login',
      name:'loginPage',
      component: loginPage
    },
    {
      path: '/forgot-password',
      name:'forgotPasswordPage',
      component: forgotPasswordPage
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
      path: '/profile',
      name:'profilePage',
      component: profilePage,
      children: [
        {
          path: '/profile/settings',
          name:'settingsSubPage',
          component: settings,
        },
        {
          path: '/profile/messages',
          name:'messagesSubPage',
          component: messages,
        },
        {
          path: '/profile/pocket',
          name:'pocketSubPage',
          component: pocket,
        },
        {
          path: '/profile/favorites',
          name:'favoritesSubPage',
          component: favorites,
        },
        {
          path: '/profile/my-objects',
          name:'myObjectsSubPage',
          component: myObjects,
        },
      ],
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
      path: '/404',
      name:'404',
      component: notFoundComponent
    },
    {
      path: '/403',
      name:'403',
      component: userNotLoggedInComponent
    },
    {
      path: '*',
      component: notFoundComponent
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Redirect to 403 for profile pages if not logged in
  if (to.matched[0].name === 'profilePage' && store.state.isLoggedIn === false) {
    router.push({
      name: '403'
    });
  }

  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Заголовок';
  }
  next();
});

export default router;