import axios from 'axios';

const actions = {
  getTowns: async (context, commit) => {
    const { data } = await axios.get(
      'http://localhost:9001/help/get-help-all'
    )
    .then(function (response) {
      console.log('Response ::', response);
      return response;
    })
    .catch(function (error) {
      console.log('GetTowns error ::', error);
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