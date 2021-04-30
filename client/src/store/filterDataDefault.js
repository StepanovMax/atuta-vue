const filterDataDefault = {
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
      labelShort: 'ИЖС',
    },
    {
      label: 'Сельхозназначения(СНТ, ДНП)',
      slug: 'agricultural',
      labelShort: 'С/х',
    },
    {
      label: 'Промназначения',
      slug: 'industrial',
      labelShort: 'Пром',
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
      labelShort: 'Коммерция',
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
      labelShort: 'Машино- место',
    },
  ],
  garageTypes: [
    {
      slug: 'reinforcedConcrete',
      label: 'Железобетонный',
      labelShort: 'Ж/б',
    },
    {
      slug: 'brick',
      label: 'Кирпичный',
      labelShort: 'Кирпич',
    },
    {
      slug: 'irony',
      label: 'Железный',
      labelShort: 'Железо',
    },
  ],
  parkingTypes: [
    {
      slug: 'multilevelParking',
      label: 'Многоуровневый паркинг',
      labelShort: 'Мн-ур. паркинг',
    },
    {
      slug: 'undergroundParking',
      label: 'Подземный паркинг',
      labelShort: 'Под. паркинг',
    },
    {
      slug: 'сoveredParking',
      label: 'Крытая стоянка',
      labelShort: 'Кр. стоянка',
    },
    {
      slug: 'openParking',
      label: 'Открытая стоянка',
      labelShort: 'Отк.стоянка',
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
      labelShort: 'ИЖС',
    },
    {
      slug: 'industrial-purpose',
      label: 'Промназначения',
      labelShort: 'Пром.',
    },
    {
      slug: 'agricultural-purpose',
      label: 'Сельскохозяйственного назначения',
      labelShort: 'С/х',
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
      slug: 'free-purpose',
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
};

export default filterDataDefault;