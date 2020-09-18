import federalRegions from './federalRegions.js';

const state = {
  count: 11.7,
  isFilterOpen: false,
  objectDataSelected: {
    id: 71628571265,
    object: {
      value: null,
      required: true,
    },
    deal: {
      value: null,
      required: true,
    },
    address: {
      value: null,
      coords: null,
      town: null,
      required: true,
    },
    district: {
      value: null,
      required: true,
    },
    onlineShow: {
      value: null,
      required: false,
    },
    photoGallery: {
      value: null,
      required: false,
    },
    description: {
      value: null,
      required: false,
    },
    phone: {
      value: null,
      required: false,
    },
    connectionWay: {
      value: null,
      required: true,
    },
    comfortType: {
      value: null,
      required: false,
    },
    bedCount: {
      value: null,
      required: false,
    },
    sleepingPlacesCount: {
      value: null,
      required: false,
    },
    roomMultimedia: {
      value: null,
      required: false,
    },
    roomEquipment: {
      value: null,
      required: false,
    },
    roomComfort: {
      value: null,
      required: false,
    },
    roomAdditional: {
      value: null,
      required: false,
    },
    app: {
      type: {
        value: null,
        required: true,
      },
      view: {
        value: null,
        required: true,
      },
      roomsCount: {
        value: null,
        required: true,
      },
      floor: {
        value: null,
        required: true,
      },
      floorAll: {
        value: null,
        required: true,
      },
      area: {
        value: null,
        required: true,
      },
      areaKitchen: {
        value: null,
        required: false,
      },
      areaLiving: {
        value: null,
        required: false,
      },
      year: {
        value: null,
        required: false,
      },
      floorNot: {
        value: null,
        required: false,
      },
    },
    house: {
      type: {
        value: null,
        required: true,
      },
      roomsCount: {
        value: null,
        required: true,
      },
      view: {
        value: null,
        required: false,
      },
      wall: {
        value: null,
        required: false,
      },
      year: {
        value: null,
        required: false,
      },
      distance: {
        value: null,
        required: false,
      },
      areaLand: {
        value: null,
        required: true,
      },
      areaHouse: {
        value: null,
        required: true,
      },
      floorAll: {
        value: null,
        required: true,
      },
      isIntoCity: {
        value: null,
        required: false,
      },
    },
    room: {
      area: {
        value: null,
        required: true,
      },
      year: {
        value: null,
        required: false,
      },
      floor: {
        value: null,
        required: true,
      },
      floorAll: {
        value: null,
        required: true,
      },
      floorNot: {
        value: null,
        required: false,
      },
      roomsCount: {
        value: null,
        required: true,
      },
      view: {
        value: null,
        required: false,
      },
      comfort: {
        value: null,
        required: false,
      },
    },
    garage: {
      type: {
        value: null,
        required: true,
      },
      area: {
        value: null,
        required: true,
      },
      year: {
        value: null,
        required: false,
      },
      distance: {
        value: null,
        required: false,
      },
      security: {
        value: null,
        required: false,
      },
      garageType: {
        value: null,
        required: true,
      },
      parkingType: {
        value: null,
        required: true,
      },
    },
    sector: {
      area: {
        value: null,
        required: true,
      },
      distance: {
        value: null,
        required: false,
      },
      type: {
        value: null,
        required: true,
      },
      facade: {
        value: null,
        required: false,
      },
      availabilityOfVuildings: {
        value: null,
        required: false,
      }
    },
    commercial: {
      type: {
        value: null,
        required: true,
      },
      area: {
        value: null,
        required: true,
      },
      year: {
        value: null,
        required: false,
      },
      class: {
        value: null,
        required: true,
      },
      distance: {
        value: null,
        required: false,
      },
      floor: {
        value: null,
        required: true,
      },
      floorAll: {
        value: null,
        required: true,
      },
      tenant: {
        value: null,
        required: true,
      },
      facade: {
        value: null,
        required: false,
      },
    },
    rentType: {
      value: null,
      required: true,
    },
    price: {
      value: null,
      required: true,
    },
    deposit: {
      value: null,
      required: true,
    },
    tarif: {
      value: null,
      required: false,
    },
    agency: {
      name: null,
      type: null,
      required: false,
    },
  },
  filterDataSelected: {
    searchInTitle: null,
    searchWithImages: null,
    town: null,
    district: null,
    deal: null,
    object: null,
    seller: null,
    tarif: null,
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
      areaKitchen: null,
      areaLiving: null,
      onlineShow: null,
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
    tenant: [
      {
        label: 'Да',
        slug: 'yes',
      },
      {
        label: 'Нет',
        slug: 'no',
      },
    ],
    searchInTitle: {
      slug: 'only-in-title',
      label: 'Только в названиях',
      checked: false,
    },
    searchWithImages: {
      slug: 'only-with-photos',
      label: 'Только с фото',
      checked: false,
    },
    sectorType: [
      {
        label: 'Поселений(ИЖС)',
        slug: 'settlements',
      },
      {
        label: 'Сельсхозназначения(СНТ, ДНП)',
        slug: 'agricultural',
        labelShort: 'С/х (СНТ, ДНП)',
      },
      {
        label: 'Промназначения',
        slug: 'industrial',
      },
    ],
    district: [],
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
        label: 'Своб. планировка',
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
    roomRooms: [1, 9],
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
        label: 'Посуточно',
        slug: 'per-day',
      },
      {
        label: 'На длительный срок',
        slug: 'long-term',
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
    appFloorAllList: [
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
        slug: '10',
        label: '10',
      },
      {
        slug: '11',
        label: '11',
      },
      {
        slug: '12',
        label: '12',
      },
      {
        slug: '13',
        label: '13',
      },
      {
        slug: '14',
        label: '14',
      },
      {
        slug: '15',
        label: '15',
      },
      {
        slug: '16',
        label: '16',
      },
      {
        slug: '17',
        label: '17',
      },
      {
        slug: '18',
        label: '18',
      },
      {
        slug: '19',
        label: '19',
      },
      {
        slug: '20',
        label: '20',
      },
      {
        slug: '21',
        label: '21',
      },
      {
        slug: '22',
        label: '22',
      },
      {
        slug: '23',
        label: '23',
      },
      {
        slug: '24',
        label: '24',
      },
      {
        slug: '25',
        label: '25',
      },
      {
        slug: '26',
        label: '26',
      },
      {
        slug: '27',
        label: '27',
      },
      {
        slug: '28',
        label: '28',
      },
      {
        slug: '29',
        label: '29',
      },
      {
        slug: '30',
        label: '30',
      },
      {
        slug: '31',
        label: '30+',
      },
    ],
    appFloorAllListCurrent: [
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
        slug: '10',
        label: '10',
      },
      {
        slug: '11',
        label: '11',
      },
      {
        slug: '12',
        label: '12',
      },
      {
        slug: '13',
        label: '13',
      },
      {
        slug: '14',
        label: '14',
      },
      {
        slug: '15',
        label: '15',
      },
      {
        slug: '16',
        label: '16',
      },
      {
        slug: '17',
        label: '17',
      },
      {
        slug: '18',
        label: '18',
      },
      {
        slug: '19',
        label: '19',
      },
      {
        slug: '20',
        label: '20',
      },
      {
        slug: '21',
        label: '21',
      },
      {
        slug: '22',
        label: '22',
      },
      {
        slug: '23',
        label: '23',
      },
      {
        slug: '24',
        label: '24',
      },
      {
        slug: '25',
        label: '25',
      },
      {
        slug: '26',
        label: '26',
      },
      {
        slug: '27',
        label: '27',
      },
      {
        slug: '28',
        label: '28',
      },
      {
        slug: '29',
        label: '29',
      },
      {
        slug: '30',
        label: '30',
      },
      {
        slug: '31',
        label: '30+',
      },
    ],
    appOnlineShow: [
      {
        slug: 'yes',
        label: 'Да',
      },
      {
        slug: 'no',
        label: 'Нет',
      },
    ],
    connectionWay: [
      {
        label: 'Телефон',
        slug: 'phone',
        checked: true,
      },
      {
        label: 'Сообщения',
        slug: 'messages',
        checked: true,
      },
    ],
    comfortType: [
      {
        label: 'Общие',
        slug: 'common',
      },
      {
        label: 'Свои',
        slug: 'personal',
      },
    ],
    roomMultimedia: [
      {
        label: 'Wi-fi',
        slug: 'wi-fi',
      },
      {
        label: 'Телевизор',
        slug: 'tv',
      },
      {
        label: 'Кабельное/цифровое ТВ',
        slug: 'cable',
      },
    ],
    roomEquipment: [
      {
        label: 'Плита',
        slug: 'stove',
      },
      {
        label: 'Микроволновка',
        slug: 'microwave',
      },
      {
        label: 'Холодильник',
        slug: 'fridge',
      },
      {
        label: 'Стиральная машина',
        slug: 'washing-machine',
      },
      {
        label: 'Фен',
        slug: 'hair-dryer',
      },
      {
        label: 'Утюг',
        slug: 'iron',
      },
      {
        label: 'Посудомойка',
        slug: 'dishwasher',
      },
    ],
    roomComfort: [
      {
        label: 'Кондиционер',
        slug: 'air-conditioner',
      },
      {
        label: 'Камин',
        slug: 'fireplace',
      },
      {
        label: 'Балкон/лоджия',
        slug: 'balcony',
      },
      {
        label: 'Парковочное место',
        slug: 'parking-place',
      },
    ],
    roomAdditional: [
      {
        label: 'Можно с животными',
        slug: 'available-with-animals',
      },
      {
        label: 'Можно с детьми',
        slug: 'available-with-kids',
      },
      {
        label: 'Можно для мероприятий',
        slug: 'available-for-events',
      },
      {
        label: 'Можно курить',
        slug: 'available-for-smoking',
      },
    ],
    appYearsStartPosition: 1800,
    garageRangeArea: [0, 100],
    garageRangePrice: [0, 100000000],
    garageRangeRent: [0, 100000000],
    appRangePrice: [0, 100000000],
    appRangeRent: [0, 1000000],
    appRangeArea: [0, 300],
    appFloor: [0, 30],
    appFloorAll: [1, 30],
    houseRangePrice: [0, 100000000],
    houseRangeRent: [0, 100000000],
    houseAreaHouse: [0, 500],
    houseAreaLand: [0, 100],
    distance: [1, 100],
    houseDistance: [0, 100],
    houseFloorAll: [1, 30],
    roomRangeArea: [0, 100],
    roomBedCount: [1, 10],
    roomSleepingPlacesCount: [1, 15],
    roomFloorRange: [1, 30],
    roomFloorAll: [1, 30],
    commercialFloorAll: [1, 30],
    sectorRangeArea: [0, 1000],
    sectorDistance: [0, 100],
    commercialRangeArea: [0, 1000],
    commercialDistance: [0, 100],
  },
  testObjects: [
    {
      type: 'app',
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
      phoneNumber: '79612701887',
    },
    {
      type: 'house',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'room',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'garage',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'commercial',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'sector',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'app',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'app',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'app',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'app',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'app',
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
      phoneNumber: '79612699310',
    },
    {
      type: 'app',
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
      phoneNumber: '79612699310',
    },
  ],
  federalRegions: federalRegions,
}

export default state;