const mutations = {
  updateIs404PageState(state, data) {
    state.is404Page = data;
  },
  updateIsEditObjectPageState(state, data) {
    state.isEditObjectPage = data;
  },
  updateObjectsOnHomeState(state, data) {
    state.objectsOnHome = data;
  },
  updateRoutesHistoryState(state, data) {
    state.routesHistory = data;
  },
  updateFilterDialogsDropdownState(state, data) {
    state.filterDialogsDropdownState = data;
  },
  updateFilterDialogsBlacklistState(state, data) {
    state.filterDialogsBlacklistState = data;
  },
  updateCurrentDialogsListOfUserState(state, data) {
    state.currentDialogsListOfUserState = data;
  },
  updateAllDialogsListOfUserState(state, data) {
    state.allDialogsListOfUserState = data;
  },
  updateFavouriteObjectsState(state, data) {
    state.favouriteObjects = data;
  },
  updateFavouriteObjectsArrayState(state, data) {
    state.favouriteObjectsArray = data;
  },
  updatePreviousPageState(state, data) {
    state.previousPage = data;
  },
  updateMyObjectsState(state, data) {
    // console.log('mutations.js : updateMyObjectsState =>', data);
    state.myObjects = data;
  },
  updateFederalRegionsAlphabeticalState(state, data) {
    state.federalRegionsAlphabetical = data;
  },
  updateFederalRegionsState(state, data) {
    state.federalRegions = data;
  },
  updateUserDataState(state, data) {
    state.userData = data;
  },
  updateUserEmployeesDataState(state, data) {
    state.userEmployees = data;
  },
  updateLoggedInState(state, data) {
    state.isLoggedIn = data;
  },
  changeMobileQuestionState(state, data) {
    state.mobileQuestionState = data;
  },
  switchFilter(state, data) {
    state.isFilterOpen = data;
  },
  switchUserMenuMobile(state, data) {
    state.isUserMenuMobileOpen = data;
  },
  closeMobileMenus(state) {
    state.isFilterOpen = false;
    state.isUserMenuMobileOpen = false;
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

export default mutations;