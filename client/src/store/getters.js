const getters = {
  getTownsFromRostov: state => {
    const townsRostov = state.federalRegions.filter(
      item => item.slug === 'rostovskaya'
    );
    return townsRostov[0].localities;
  },
  getFlatLocalitiesList: state => {
    let flatLocalitiesList = [];
    state.federalRegions.forEach(
      item => {
        flatLocalitiesList = [...flatLocalitiesList, ...item.localities];
      }
    );
    return flatLocalitiesList;
  },
  getDistanceArray: state => {
    let array = state.filterDataDefault.distance;
    let resultedArray = [];
    resultedArray.push(
      {
        label: 'В черте города',
        slug: 'into-city',
      }
    );
    for (let i = array[0]; i <= array[1]; i++) {
      if (
        (i <= 10)
        || (i > 10 && i <= 35 && i % 5 === 0)
        || (i > 35 && i <= 100 && i % 10 === 0)
      ) {
        resultedArray.push(
          {
            label: i,
            slug: i,
          }
        );
      }
    }
    return resultedArray;
  },
  getUserRoles: state => {
    state.federalRegions.forEach(
      item => {
        flatLocalitiesList = [...flatLocalitiesList, ...item.localities];
      }
    );
    return flatLocalitiesList;
  },
}

export default getters;