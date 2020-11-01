import axios from 'axios';

const actions = {
  getTowns: async (context) => {
    const { data } = await axios.get(
      'http://localhost:9001/data/get-towns/'
    )
      .then(function (response) {
        return response;
      })
        .catch(function (error) {
          console.log('error ::', error);
          return false;
        });
    context.commit('updateFederalRegionsState', data);
  }
}

export default actions;