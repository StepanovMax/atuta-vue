import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

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
import pocketSubPage from '../components/pages/profile/pocketSubPage.vue';
import pocketAddMoneySubPage from '../components/pages/profile/pocketAddMoneySubPage.vue';
import pocketHistorySubPage from '../components/pages/profile/pocketHistorySubPage.vue';
import test from '../components/pages/profile/test.vue';
import pocketSubscriptionSubPage from '../components/pages/profile/pocketSubscriptionSubPage.vue';
import settings from '../components/pages/profile/settings.vue';
import dialogsSubPage from '../components/pages/profile/dialogsSubPage.vue';
import dialogSubPageSingle from '../components/pages/profile/dialogSubPageSingle.vue';
import myObjects from '../components/pages/profile/myObjects.vue';
import favorites from '../components/pages/profile/favorites.vue';
// Reg section
import loginPage from '../components/pages/loginPage.vue';
import forgotPasswordPage from '../components/pages/forgotPasswordPage.vue';
import registrationPage from '../components/pages/registrationPage.vue';
import verifyPage from '../components/pages/verifyPage.vue';
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
      path: '/verify/:userId/:secretCode',
      name:'verifyPage',
      component: verifyPage
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
          children: [
            {
              path: '/profile/settings/test',
              name:'test',
              component: test,
            },
          ],
        },
        {
          path: '/profile/dialogs',
          name:'dialogsSubPage',
          component: dialogsSubPage,
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
        {
          path: '/profile/dialog/:id',
          name:'dialogSubPageSingle',
          component: dialogSubPageSingle,
        },
        {
          path: '/profile/pocket',
          name:'pocketSubPage',
          component: pocketSubPage,
          redirect: {
            name: 'pocketHistorySubPage'
          },
          children: [
            {
              path: '/profile/pocket/history',
              name:'pocketHistorySubPage',
              component: pocketHistorySubPage,
            },
            {
              path: '/profile/pocket/subscription',
              name:'pocketSubscriptionSubPage',
              component: pocketSubscriptionSubPage,
            },
            {
              path: '/profile/pocket/add-money',
              name:'pocketAddMoneySubPage',
              component: pocketAddMoneySubPage,
            },
          ],
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
      children: [
        {
          path: '/help/:id',
          name:'answer',
          component: answer,
        },
      ],
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

const isTokenExpired = async function(to, from, next) {
  console.log(' >> isTokenExpired', store.state);
  if (store.state.userData && store.state.userData.expireDate) {
    const timestampNow = new Date().getTime() / 1000 | 0;
    // Token is expired
    if (store.state.userData.expireDate < timestampNow) {
      // console.log('expired ::');
      try {
        console.log(' >> try');
        const hasPermission = await store.dispatch("checkAuth");
        if (hasPermission) {
          console.log(' >> hasPermission true');
          // return true;
        } else {
          console.log(' >> hasPermission false');
          await store.dispatch('logout');
          console.log(' >> dispatch logout');
          // return false;
        }
      } catch(error) {
        console.log('Guard error ::', timestampNow, error);
      }
    // Token is OK.
    } else {
      console.log(' >> Token is OK.');
      return true;
    }
  }
};

const collectRoutesHistory = (from) => {
  let routesArray;
  const arrayLength = 10;
  if (!store.state.routesHistory.length) {
    routesArray = [];
  } else {
    routesArray = store.state.routesHistory;
  }
  if (routesArray.length >= arrayLength) {
    routesArray.pop();
  }
  if (from.name) {
    routesArray.unshift(from.name);
  }
  store.commit('updateRoutesHistoryState', routesArray);
};

router.beforeEach(
  async (to, from, next) => {
    const parentPageName = to.matched[0].name;
    // Each route we should to check expired token.
    await isTokenExpired();
    collectRoutesHistory(from);

    // if (to.meta.title) {
    //   document.title = to.meta.title;
    // } else {
    //   document.title = 'Заголовок';
    // }

    next();
  }
);

export default router;