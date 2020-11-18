import userRoles from './data/userRoles.js';
import objectDataSelected from './objectDataSelected.js';
import filterDataSelected from './filterDataSelected.js';
import filterDataDefault from './filterDataDefault.js';

const user = {
  id: 1,
  login: 'admin',
  password: '12345678',
  name: {
    slug: 'real-estate-agency-1',
    label: 'Агентство недвижимости №1',
  },
  description: {
    label: 'с 2008 г. на рынке. 1.	Все операции с недвижимостью: купля-продажа, обмен, дарение, рента, аренда  2.	Подбор любого объекта недвижимости в кратчайшие сроки, по вашим требованиям и финансовым возможностям; 3.	Подготовка документов любой сложности: купля-продажа, оформление перепланировок квартир, межевание и размежевание земельных участков и т.д. 4.	Юридическое сопровождение всех сделок. Бесплатная юр. Консультация. 5. Строительство кирпичных домов (строй-вариант 90% готовности) в г. Таганроге (пригород).',
  },
  descriptionShort: {
    label: 'Нас Вам посоветовали!',
  },
  urlPreview: '/src/images/companies/an1.png',
  objectsCount: 416,
  phoneNumbers: [
    '+78634394137',
    '+79287603835',
  ],
  url: {
    value: 'http://an1tag.ru',
  },
  address: 'Таганрог, г. Таганрог, ул.Чехова, 50, Центральный',
};

const state = {
  favouriteObjects: [],
  previousPage: null,
  count: 11.7,
  isLoggedIn2: false,
  isLoggedIn: false,
  userData: null,
  isFilterOpen: false,
  mobileQuestionState: true,
  isUserMenuMobileOpen: false,
  userRoles: userRoles,
  federalRegionsAlphabetical: [],
  federalRegions: [],
  filterDataDefault: filterDataDefault,
  objectDataSelected: objectDataSelected,
  filterDataSelected: filterDataSelected,
  myObjects: [],
  objectsStatuses: [
    {
      number: 0,
      slug: 'onModeration',
      label: 'На модерации',
    },
    {
      number: 1,
      slug: 'active',
      label: 'Активные',
    },
    {
      number: 2,
      slug: 'awaitingForPayment',
      label: 'Ожидают оплаты',
    },
    {
      number: 3,
      slug: 'declined',
      label: 'Отклонено',
    },
    {
      number: 4,
      slug: 'completed',
      label: 'Завершённые',
    },
  ],
}

export default state;