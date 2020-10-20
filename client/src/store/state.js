import federalRegions from './federalRegions.js';
import objectDataSelected from './objectDataSelected.js';
import filterDataSelected from './filterDataSelected.js';
import filterDataDefault from './filterDataDefault.js';

const state = {
  count: 11.7,
  isFilterOpen: false,
  mobileQuestionState: true,
  isUserMenuMobileOpen: false,
  federalRegions: federalRegions,
  filterDataDefault: filterDataDefault,
  objectDataSelected: objectDataSelected,
  filterDataSelected: filterDataSelected,
}

export default state;