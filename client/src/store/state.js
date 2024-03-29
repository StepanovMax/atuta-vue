import userRoles from './data/userRoles.js';
import objectDataSelected from './objectDataSelected.js';
import filterDataSelected from './filterDataSelected.js';
import filterDataDefault from './filterDataDefault.js';

const state = {
  isEditObjectPage: false,
  objectsOnHome: null,
  userEmployees: null,
  routesHistory: [],
  filterDialogsDropdownState: {
    label: 'Все',
    slug: 'all',
    checked: false,
  },
  filterDialogsBlacklistState: {
    label: 'Все',
    slug: 'all',
    checked: false,
  },
  pocketSwitcherValue: '',
  currentDialogsListOfUserState: [],
  allDialogsListOfUserState: [],
  favouriteObjects: [],
  favouriteObjectsArray: [],
  previousPage: null,
  is404Page: false,
  count: 11.7,
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