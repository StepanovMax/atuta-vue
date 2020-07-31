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
    filterDataSelected: {
      town: null,
      district: null,
      deal: null,
      object: null,
      seller: null,
      app: {
        price: null,
        rent: null,
        rentType: null,
        type: null,
        view: null,
        floor: null,
        floorAll: null,
        floorNot: null,
        roomsCount: null,
        area: null,
      },
      house: {
        roomsCount: null,
        type: null,
        view: null,
        isIntoCity: null,
        distance: null,
        areaHouse: null,
        areaLand: null,
        floorAll: null,
        price: null,
        rent: null,
        rentType: null,
        wall: null,
      },
      room: {
        price: null,
        rent: null,
        rentType: null,
        area: null,
        roomsCount: null,
        floor: null,
        floorAll: null,
        floorNot: null,
      },
      garage: {
        type: null,
        security: null,
        garageType: null,
        parkingType: null,
        area: null,
        rent: null,
        price: null,
      },
      sector: {
        price: null,
        rent: null,
        distance: null,
        area: null,
        category: null,
      },
      commercial: {
        price: null,
        rent: null,
        rentType: null,
        class: null,
        view: null,
        area: null,
        distance: null,
      },
    },
    filterDataDefault: {
      town: [
        {
          slug: 'rostov-on-don',
          label: 'Ростов-на-Дону',
        },
        {
          slug: 'taganrog',
          label: 'Таганрог',
        },
      ],
      district: [
        {
          slug: 'yuzhny',
          label: 'Южный',
        },
        {
          slug: 'center',
          label: 'Центр',
        },
        {
          slug: 'zapadny',
          label: 'Западный',
        },
        {
          slug: 'severo-zapadny',
          label: 'Северо-западный',
        },
        {
          slug: 'severny',
          label: 'Северный',
        },
        {
          slug: 'vostochny',
          label: 'Востоный',
        },
        {
          slug: 'suburb',
          label: 'Пригород',
        },
      ],
      deal: [
        {
          slug: 'buy',
          label: 'Купить',
        },
        {
          slug: 'rent',
          label: 'Аренда',
        },
      ],
      seller: [
        {
          slug: 'personal',
          label: 'Собственник',
        },
        {
          slug: 'agency',
          label: 'Агентство',
        },
        {
          slug: 'builder',
          label: 'Застройщик',
        },
      ],
      buy: [
        {
          slug: 'buy',
          label: 'Купить',
        },
        {
          slug: 'rent',
          label: 'Аренда',
        },
      ],
      object: [
        {
          slug: 'app',
          label: 'Квартира',
        },
        {
          slug: 'house',
          label: 'Дом',
        },
        {
          slug: 'room',
          label: 'Комната',
        },
        {
          slug: 'garage',
          label: 'Гараж / Машиноместо',
        },
        {
          slug: 'sector',
          label: 'Участок',
        },
        {
          slug: 'commercial',
          label: 'Коммерческая недвижимость',
        },
      ],
      garage: [
        {
          slug: 'garage',
          label: 'Гараж',
        },
        {
          slug: 'parking',
          label: 'Машиноместо',
        },
      ],
      garageTypes: [
        {
          slug: 'reinforcedConcrete',
          label: 'Железобетонный',
        },
        {
          slug: 'brick',
          label: 'Кирпичный',
        },
        {
          slug: 'irony',
          label: 'Железный',
        },
      ],
      parkingTypes: [
        {
          slug: 'multilevelParking',
          label: 'Многоуровневый паркинг',
        },
        {
          slug: 'undergroundParking',
          label: 'Подземный паркинг',
        },
        {
          slug: 'сoveredParking',
          label: 'Крытая стоянка',
        },
        {
          slug: 'openParking',
          label: 'Открытая стоянка',
        },
      ],
      security: [
        {
          slug: 'yes',
          label: 'Да',
        },
        {
          slug: 'no',
          label: 'Нет',
        },
      ],
      appRooms: [
        {
          slug: 'studio',
          label: 'Студия',
        },
        {
          slug: 'freePlan',
          label: 'Своб.планировка',
        },
        {
          slug: '1',
          label: '1',
        },
        {
          slug: '2',
          label: '2',
        },
        {
          slug: '3',
          label: '3',
        },
        {
          slug: '4',
          label: '4',
        },
        {
          slug: '5',
          label: '5',
        },
        {
          slug: '6',
          label: '6',
        },
        {
          slug: '7',
          label: '7',
        },
        {
          slug: '8',
          label: '8',
        },
        {
          slug: '9',
          label: '9',
        },
        {
          slug: '9+',
          label: '9+',
        },
      ],
      appTypes: [
        {
          slug: 'secondaryUsing',
          label: 'Вторичка',
        },
        {
          slug: 'newBuilding',
          label: 'Новостройка',
        },
      ],
      appFloorNot: [
        {
          slug: 'first',
          label: 'Не первый этаж',
        },
        {
          slug: 'last',
          label: 'Не последний этаж',
        },
      ],
      appView: [
        {
          slug: 'brick',
          label: 'Кирпичный',
        },
        {
          slug: 'panel',
          label: 'Панельный',
        },
        {
          slug: 'monolit',
          label: 'Монолитный',
        },
        {
          slug: 'wood',
          label: 'Деревянный',
        },
        {
          slug: 'block',
          label: 'Блочный',
        },
      ],
      rentType: [
        {
          slug: 'perDay',
          label: 'Посуточно',
        },
        {
          slug: 'longTerm',
          label: 'На длительный срок',
        },
      ],
      houseRoomsCount: [
        {
          slug: '1',
          label: '1',
        },
        {
          slug: '2',
          label: '2',
        },
        {
          slug: '3',
          label: '3',
        },
        {
          slug: '4',
          label: '4',
        },
        {
          slug: '5',
          label: '5',
        },
        {
          slug: '6',
          label: '6',
        },
        {
          slug: '7',
          label: '7',
        },
        {
          slug: '8',
          label: '8',
        },
        {
          slug: '9',
          label: '9',
        },
        {
          slug: '9+',
          label: '9+',
        },
      ],
      roomRoomsCount: [
        {
          slug: '1',
          label: '1',
        },
        {
          slug: '2',
          label: '2',
        },
        {
          slug: '3',
          label: '3',
        },
        {
          slug: '4',
          label: '4',
        },
        {
          slug: '5',
          label: '5',
        },
        {
          slug: '6',
          label: '6',
        },
        {
          slug: '7',
          label: '7',
        },
        {
          slug: '8',
          label: '8',
        },
        {
          slug: '9',
          label: '9',
        },
        {
          slug: '9+',
          label: '9+',
        },
      ],
      houseTypes: [
        {
          slug: 'house',
          label: 'Дом',
        },
        {
          slug: 'summerCottage',
          label: 'Дача',
        },
        {
          slug: 'cottage',
          label: 'Коттедж',
        },
        {
          slug: 'townhouse',
          label: 'Таунхаус',
        },
      ],
      intoCityType: {
        slug: 'yes',
        label: 'Да',
        checked: false,
      },
      houseWall: [
        {
          slug: 'brick',
          label: 'Кирпичный',
        },
        {
          slug: 'balk',
          label: 'Брус',
        },
        {
          slug: 'timber',
          label: 'Бревно',
        },
        {
          slug: 'gas-blocks',
          label: 'Газоблоки',
        },
        {
          slug: 'metal',
          label: 'Металл',
        },
        {
          slug: 'foam-blocks',
          label: 'Пеноблоки',
        },
        {
          slug: 'reinforced-concrete-panels',
          label: 'Ж/б панели',
        },
        {
          slug: 'sandvich-panels',
          label: 'Сендвич-панели',
        },
        {
          slug: 'others',
          label: 'Прочее',
        },
      ],
      roomFloorNot: [
        {
          slug: 'first',
          label: 'Не первый этаж',
        },
        {
          slug: 'last',
          label: 'Не последний этаж',
        },
      ],
      sectorCategory: [
        {
          slug: 'settlements',
          label: 'Поселений(ИЖС)',
        },
        {
          slug: 'industrial-purpose',
          label: 'Промназначения',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Сельскохозяйственного назначения',
        },
      ],
      commercialClass: [
        {
          slug: 'a',
          label: 'A',
        },
        {
          slug: 'b',
          label: 'B',
        },
        {
          slug: 'c',
          label: 'C',
        },
        {
          slug: 'd',
          label: 'D',
        },
      ],
      commercialView: [
        {
          slug: 'settlements',
          label: 'Офис',
        },
        {
          slug: 'stock',
          label: 'Склад',
        },
        {
          slug: 'public-catering',
          label: 'Общепит',
        },
        {
          slug: 'hotel',
          label: 'Гостиница',
        },
        {
          slug: 'production',
          label: 'Производство',
        },
        {
          slug: 'sector',
          label: 'Участок',
        },
        {
          slug: 'trading-area',
          label: 'Торговая площадь',
        },
        {
          slug: 'industrial-purpose',
          label: 'Свободного назначения',
        },
      ],
      commercialRentType: [
        {
          slug: 'for-all',
          label: 'За всё',
          checked: true,
        },
        {
          slug: 'per-meter',
          label: 'За м²',
          checked: false,
        },
      ],
      garageRangeArea: [0, 100],
      garageRangePrice: [0, 100000000],
      garageRangeRent: [0, 100000000],
      appRangePrice: [0, 100000000],
      appRangeRent: [0, 1000000],
      appRangeArea: [0, 300],
      appFloor: [0, 30],
      appFloorAll: [0, 30],
      houseRangePrice: [0, 100000000],
      houseRangeRent: [0, 100000000],
      houseAreaHouse: [0, 500],
      houseAreaLand: [0, 100],
      houseDistance: [0, 100],
      houseFloorAll: [0, 30],
      roomRangeArea: [0, 100],
      roomFloorRange: [0, 30],
      roomFloorAll: [0, 30],
      sectorRangeArea: [0, 1000],
      sectorDistance: [0, 100],
      commercialRangeArea: [0, 1000],
      commercialDistance: [0, 100],
    },
  },
  mutations: {
    switchFilter(state, data) {
      state.isFilterOpen = data;
    },
    resetFilter(state) {
      let obj = {
        ...state.filterDataDefault
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
      state.filterDataSelected = obj;
    },
    updateFilterState(state, data) {
      state.filterDataSelected = data;
    },
    updateFilterAppState(state, data) {
      state.filterDataSelected.app = data;
    },
    updateFilterHouseState(state, data) {
      state.filterDataSelected.house = data;
    },
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
