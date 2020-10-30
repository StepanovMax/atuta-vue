import userRoles from './data/userRoles.js';
import federalRegions from './federalRegions.js';
import objectDataSelected from './objectDataSelected.js';
import filterDataSelected from './filterDataSelected.js';
import filterDataDefault from './filterDataDefault.js';

const state = {
  count: 11.7,
  isLoggedIn: false,
  userData: null,
  isFilterOpen: false,
  mobileQuestionState: true,
  isUserMenuMobileOpen: false,
  userRoles: userRoles,
  federalRegions: federalRegions,
  filterDataDefault: filterDataDefault,
  objectDataSelected: objectDataSelected,
  filterDataSelected: filterDataSelected,
}

export default state;