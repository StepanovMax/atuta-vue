import axios from 'axios';

const actions = {
  getTowns: async (context, commit) => {
    const { data } = await axios.get(
      process.env.host_api + '/data/get-towns'
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
  logout: async (context, commit) => {
    const transport = axios.create({
      withCredentials: true
    });
    await transport.get(
      process.env.host_api + '/auth/logout'
    )
      .then(
        response => {
          console.log('logout response ::', response);
          return response;
        }
      )
      .catch(
        error => {
          console.log('Error logout ::', error);
          return false;
        }
      );
  },
}

export default actions;