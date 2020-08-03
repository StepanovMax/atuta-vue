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
import formatNumbers from './plugins/formatNumbers.js'

import './scss/index.scss'


Vue.use(Router)
Vue.use(Vuex)
Vue.use(formatNumbers)

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
    testObjects: [
      {
        price: '1630000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Чехова, 318',
        area: 60,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Западный',
        date: '1596317207',
        agency: '"Тандем" Реэлторская компания',
        id: 7125647174,
        urlPreview: 'objects/8993850241.jpg',
        phoneNumber: '+79612701887',
      },
      {
        price: '2700000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, 7-й Новый пер., 100-2',
        area: 160,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Северный',
        date: '1593638807',
        agency: '«Агентство недвижимости №1»',
        id: 7125647175,
        urlPreview: 'objects/8993850262.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '2090000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Чехова, 346',
        area: 80,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Восточный',
        date: '1588368407',
        agency: 'Гранд Плюс',
        id: 7125647176,
        urlPreview: 'objects/8993850286.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '950000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Свободы, 36-2',
        area: 200,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Центральный',
        date: '1585776407',
        agency: 'АН "ВДОМЕ"',
        id: 7125647177,
        urlPreview: 'objects/8993850262.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '1100000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Свободы, 24-2',
        area: 30,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Центральный',
        date: '1580592407',
        agency: 'АН "ВДОМЕ"',
        id: 7125647178,
        urlPreview: 'objects/8993850286.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '3100000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Маршала Жукова, 1Д',
        area: 60,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Северный',
        date: '1583098007',
        agency: 'Частное лицо',
        id: 7125647179,
        urlPreview: 'objects/8993850241.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '2700000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Ломоносова, 53',
        area: 48,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Западный',
        date: '1577914007',
        agency: 'Частное лицо',
        id: 7125647180,
        urlPreview: 'objects/8993850241.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '1500000',
        dealType: 'buy',
        address: 'Ростовская область, Шахты, Рыночный переулок',
        area: 355,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Северный',
        date: '1546378007',
        agency: 'Регион Бизнес Недвижимость',
        id: 7125647181,
        urlPreview: 'objects/8993850241.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '2720000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Дзержинского, 166',
        area: 54,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Восточный',
        date: '1549052407',
        agency: '«Альфа-Дон центр недвижимости»',
        id: 7125647182,
        urlPreview: 'objects/8993850286.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '1420000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, Мариупольское ш., 27-2к1',
        area: 33,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Западный',
        date: '1049056407',
        agency: '«Перспектива24» - Федеральный оператор недвижимости',
        id: 7125647183,
        urlPreview: 'objects/8993850262.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '1941325',
        dealType: 'buy',
        address: 'Ростовская область, Неклиновский р-н, с. Новобессергеневка, микрорайон Авиатор, ул. Н.П. Овчарова, 5к1',
        area: 64,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Пригород',
        date: '1551475607',
        agency: 'Агентство недвижимости "№1"',
        id: 7125647184,
        urlPreview: 'objects/8993850286.jpg',
        phoneNumber: '+79612699310',
      },
      {
        price: '1499000',
        dealType: 'buy',
        address: 'Ростовская область, Таганрог, ул. Дзержинского, 171-3',
        area: 46,
        rooms: 2,
        floorCurrent: 3,
        floorFull: 5,
        rooms: 2,
        district: 'Восточный',
        date: '1556746007',
        agency: 'Компания «РиКом недвижимость» 2008-2020',
        id: 7125647185,
        urlPreview: 'objects/8993850286.jpg',
        phoneNumber: '+79612699310',
      },
    ],
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
    updateFilterRoomState(state, data) {
      state.filterDataSelected.room = data;
    },
    updateFilterGarageState(state, data) {
      state.filterDataSelected.garage = data;
    },
    updateFilterSectorState(state, data) {
      state.filterDataSelected.sector = data;
    },
    updateFilterCommercialState(state, data) {
      state.filterDataSelected.commercial = data;
    },
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
