import axios from 'axios';

const transport = axios.create({
  withCredentials: true
});

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
    console.log('logout ::');
    await transport.get(
      process.env.host_api + '/auth/logout'
    )
      .then(
        response => {
          console.log('logout response ::', response);
          context.commit('updateLoggedInState', false);
          context.commit('updateUserDataState', null);
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
  checkAuth: async (context, commit, dispatch) => {
    // Get towns list.
    await context.dispatch('getTowns');
    // Check the token.
    const checkTokenResult = await transport.get(
      process.env.host_api + '/auth/checkToken'
    )
      .then(
        response => {
          return response;
        }
      )
        .catch(
          error => {
            console.error('Error :: After page refresh token is outdated', error);
            return false;
          }
        );
    // If the state loggedIn data is TRUE,
    if (checkTokenResult.data) {
      // then fill out to TRUE loggedIn statement.
      context.commit('updateLoggedInState', true);
      // then fill out userData statement.
      context.commit('updateUserDataState', checkTokenResult.data);
      // if (checkTokenResult.data.favouriteObjectsListID) {
      //   // then loading the user's favourite objects.
      //   this.getFavouritesObjectsByListID(checkTokenResult.data.favouriteObjectsListID);
      // }
      // // then loading user's dialogs.
      // this.getDialogsByUserID(checkTokenResult.data.id);
      return true;
    } else {
      console.log('checkToken else ::');
      await context.dispatch('logout');
      context.commit('updateLoggedInState', false);
      context.commit('updateUserDataState', null);
      return false;
    }
  },
  getUserByID: async (context, commit, dispatch) => {
    try {
      // get user info.
      return await transport.get(
        process.env.host_api + '/auth/getUser'
      )
        .then(
          response => {
            // console.log('getUserInfo response ::', response.data);
            context.commit('updateUserDataState', response.data);
            return response;
          }
        )
          .catch(
            error => {
              console.error('getUserInfo :: error', error);
              return false;
            }
          );
    } catch(error) {
      console.log('[getUserByID error] ::', error);
      return false;
    }
  },
  getEmployeeByUserID: async (context, commit, dispatch) => {
    try {
      // Get user emplyees.
      return await transport.get(
        process.env.host_api + '/employee/getAll'
      )
        .then(
          response => {
            context.commit('updateUserEmployeesDataState', response.data);
            return response.data;
          }
        )
          .catch(
            error => {
              console.error('[axios getAllByUserID error] ::', error);
              return false;
            }
          );
    } catch(error) {
      console.error('[try/catch getAllByUserID error] ::', error);
      return false;
    }
  },
}

export default actions;