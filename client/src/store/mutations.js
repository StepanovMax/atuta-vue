const mutations = {
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

export default mutations;