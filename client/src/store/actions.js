import axios from 'axios';

const actions = {
  getTowns: async (context, commit) => {
    const { data } = await axios.get(
      'http://dev-api.atyta.ru:9001/data/get-towns'
    )
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log('Error getTowns ::', error);
        return false;
      });

    let flatLocalitiesList = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        flatLocalitiesList = [...flatLocalitiesList, ...data[key].localities];
      }
    }

    if (flatLocalitiesList.length) {
      // get towns alphabetical
      const alphabeticalArray = flatLocalitiesList.sort(
        (a, b) => {
          return a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1;
        }
      );
      if (alphabeticalArray) {
        context.commit('updateFederalRegionsAlphabeticalState', alphabeticalArray);
      }
    }
  },
}

export default actions;