'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var testData = [{
  id: 873589,
  object: {
    slug: 'app',
    label: 'Квартира'
  },
  deal: {
    slug: 'rent',
    label: 'Аренда'
  },
  address: 'Ростовская область, Таганрог, ул. Чехова, 318',
  district: {
    label: 'Северный',
    slug: 'severniy'
  },
  roomsCount: {
    label: '9+',
    slug: '9+'
  },
  area: {
    label: '40',
    slug: '40'
  },
  floor: {
    label: '3',
    slug: '3'
  },
  floorAll: {
    label: '5',
    slug: '5'
  },
  urlPreview: 'objects/8993850262.jpg',
  phoneNumber: '79612701887',
  tarif: {
    label: 'Premium',
    slug: 'premium'
  },
  price: '26000',
  date: '1596317207',
  agency: '"Агентство недвижимости №1"',
  description: 'с.Приморка. Продается дом на двух частках! Стройвариант, свет, вода в доме. Скважина во дворе, газ помеже. Площадь участков 18 соток, дом 160 кв.м. на первом этаже зал, кухня, санузел.Второй этаж свободная планировка. Дом расположен в природоохранной зоне. . Курортное село на берегу Таганрогского залива .В селе есть школа(автобус), садик, клуб, рестораны, базы отдыха! До Таганрога 15 км, до Ростова 45 км. Ходит электричка, автобус. торг уместен. Если вы не дозвонились, пишите в Вацап. Я перезвоню!!!',
  metaTitle: "Продам квартиру 3 000 000₽ [3комн., 100м², этаж 3/13]"
}, {
  id: 873590,
  object: {
    slug: 'house',
    label: 'Дом'
  },
  deal: {
    slug: 'buy',
    label: 'Купить'
  },
  address: 'Ростовская область, Таганрог, ул. Чехова, 218',
  district: {
    label: 'Северный',
    slug: 'severniy'
  },
  roomsCount: {
    label: '9+',
    slug: '9+'
  },
  area: {
    label: '60',
    slug: '60'
  },
  areaHouse: {
    label: '32',
    slug: '32'
  },
  areaSector: {
    label: '4',
    slug: '4'
  },
  floor: {
    label: '3',
    slug: '3'
  },
  urlPreview: 'objects/8993850286.jpg',
  phoneNumber: '79612701887',
  tarif: {
    label: 'Vip',
    slug: 'vip'
  },
  price: '1126000',
  date: '1596317207',
  agency: 'АН "Талисман"',
  description: 'Продам домовладение на 18 сот. ВАРЕНОВКА- пригород Таганрога! Два чисто кирпичных дома на участке (58+27м кв. + летняя кухня 20 м.) Газ, свет, вода, дом благоустроен, газ.котел, отопление на два дома, подвал,посажен молодой сад,виноград. Дом и земля оформлены в собственность, участок чистый.Пригород Таганрога 9 км. Вареновка. ( школа,детсады, храм, магазины и пр.) Хорошее транспортное сообщение с Таганрогом и Ростовом-на-Дону (электрички и автобусы,такси) Улица- Асфальт Пишите на АВИТО,подробности по тел. Хозяин.',
  metaTitle: "Продам дом 2 750 000₽ [3комн., 100м², 4сот.]"
}, {
  id: 873591,
  object: {
    slug: 'room',
    label: 'Комната'
  },
  deal: {
    slug: 'buy',
    label: 'Купить'
  },
  address: 'Ростовская область, Таганрог, ул. Чехова, 218',
  district: {
    label: 'Северный',
    slug: 'severniy'
  },
  roomsCount: {
    label: '9+',
    slug: '9+'
  },
  area: {
    label: '60',
    slug: '60'
  },
  floor: {
    label: '3',
    slug: '3'
  },
  floorAll: {
    label: '5',
    slug: '5'
  },
  urlPreview: 'objects/8993850241.jpg',
  phoneNumber: '79612701887',
  tarif: {
    label: 'Up',
    slug: 'up'
  },
  price: '26000',
  date: '1596317207',
  agency: 'АН "Гармония"',
  metaTitle: "Продам комнату 1 100 000₽ [3комн., 100м², этаж 3/13]"
}, {
  id: 873592,
  object: {
    slug: 'garage',
    label: 'Гараж'
  },
  deal: {
    slug: 'buy',
    label: 'Купить'
  },
  address: 'Ростовская область, Таганрог, ул. Чехова, 218',
  district: {
    label: 'Северный',
    slug: 'severniy'
  },
  type: {
    label: 'Гараж',
    slug: 'garage'
  },
  garageType: {
    label: 'Железобетонный',
    labelShort: 'Ж/б',
    slug: 'reinforcedConcrete'
  },
  area: {
    label: '30',
    slug: '30'
  },
  urlPreview: 'objects/8993850241.jpg',
  phoneNumber: '79612701887',
  tarif: null,
  price: '320000',
  date: '1596317207',
  agency: '"Тандем" Риелторская компания',
  metaTitle: "Продам гараж 580 000₽ [ж/б, 100м²]"
}, {
  id: 873593,
  object: {
    slug: 'sector',
    label: 'Участок'
  },
  deal: {
    slug: 'buy',
    label: 'Купить'
  },
  address: 'Ростовская область, Таганрог, ул. Чехова, 218',
  district: {
    label: 'Северный',
    slug: 'severniy'
  },
  type: {
    slug: 'settlements',
    label: 'Поселений (ИЖС)',
    labelShort: 'ИЖС'
  },
  area: {
    label: '30',
    slug: '30'
  },
  urlPreview: 'objects/8993850241.jpg',
  phoneNumber: '79612701887',
  tarif: null,
  price: '1100000',
  date: '1596317207',
  agency: '"Тандем" Риелторская компания',
  metaTitle: "Продам участок 1 230 000₽ [ИЖС, 20сот.]"
}, {
  id: 873594,
  object: {
    slug: 'commercial',
    label: 'Коммерция'
  },
  deal: {
    slug: 'buy',
    label: 'Купить'
  },
  address: 'Ростовская область, Таганрог, ул. Чехова, 218',
  district: {
    label: 'Северный',
    slug: 'severniy'
  },
  type: {
    slug: 'sector',
    label: 'Участок'
  },
  area: {
    label: '30',
    slug: '30'
  },
  tenant: {
    label: 'Да',
    slug: 'yes'
  },
  urlPreview: 'objects/8993850241.jpg',
  phoneNumber: '79612701887',
  tarif: null,
  price: '2300000',
  date: '1596317207',
  agency: '"Тандем" Риелторская компания',
  metaTitle: "Продам участок под коммерцию 1 230 000₽ [30сот., Арендатор: да]"
}, {
  id: 873595,
  object: {
    slug: 'commercial',
    label: 'Коммерция'
  },
  deal: {
    slug: 'buy',
    label: 'Купить'
  },
  address: 'Ростовская область, Таганрог, ул. Чехова, 218',
  district: {
    label: 'Северный',
    slug: 'severniy'
  },
  type: {
    "slug": "stock",
    "label": "Склад"
  },
  floor: {
    label: '4',
    slug: '4'
  },
  floorAll: {
    label: '6',
    slug: '6'
  },
  area: {
    label: '30',
    slug: '30'
  },
  tenant: {
    label: 'Да',
    slug: 'yes'
  },
  urlPreview: 'objects/8993850241.jpg',
  phoneNumber: '79612701887',
  tarif: null,
  price: '2300000',
  date: '1596317207',
  agency: '"Тандем" Риелторская компания'
}];

exports.default = testData;