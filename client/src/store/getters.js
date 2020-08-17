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
}

export default getters;