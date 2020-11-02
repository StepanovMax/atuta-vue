import axios from 'axios';

const actions = {
  getTowns: async (context, commit) => {
    const { data } = axios({
      method: 'get',
      url: 'http://localhost:9001/data/get-towns',
      responseType: 'stream',
      mode: 'no-cors',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true"
      },
    })
      .then(function (response) {
        console.log('Response ::', error);
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