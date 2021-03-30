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
        // flatLocalitiesList = [...flatLocalitiesList, ...data[key].localities];
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
    // console.log('logout ::');
    await transport.get(
      process.env.host_api + '/auth/logout'
    )
      .then(
        response => {
          console.log('logout response ::', response);
          context.commit('updateLoggedInState', false);
          context.commit('updateUserDataState', null);
          context.commit('updateUserEmployeesDataState', null);
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
      // console.log(' >> checkTokenResult.data ::', checkTokenResult.data);
      // then fill out to TRUE loggedIn statement.
      context.commit('updateLoggedInState', true);
      // then fill out userData statement.
      context.commit('updateUserDataState', checkTokenResult.data);
      await context.dispatch('getEmployeeByUserID');
      console.log('checkTokenResult.data', checkTokenResult.data);
      context.commit('updateFavouriteObjectsState', checkTokenResult.data.favouriteObjects);
      // if (checkTokenResult.data.favouriteObjectsListID) {
      //   // then loading the user's favourite objects.
      //   this.getFavoritesObjectsByListID(checkTokenResult.data.favouriteObjectsListID);
      // }
      // // then loading user's dialogs.
      // this.getDialogsByUserID(checkTokenResult.data.id);
      return true;
    } else {
      await context.dispatch('logout');
      context.commit('updateLoggedInState', false);
      context.commit('updateUserDataState', null);
      context.commit('updateFavouriteObjectsState', null);
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
  getMyObjects: async (context, commit, dispatch) => {
    console.log('getMyObjects ::');
    try {
      // Get user emplyees.
      return await transport.get(
        process.env.host_api + '/object/getAllByUserId'
      )
        .then(
          response => {
            console.log('getMyObjects response.data ::', response.data);
            context.commit('updateMyObjectsState', response.data);
            return response.data;
          }
        )
          .catch(
            error => {
              console.error('[axios getMyObjects error] ::', error);
              return false;
            }
          );
    } catch(error) {
      console.error('[try/catch getMyObjects error] ::', error);
      return false;
    }
  },
  getFavoritesObjectsByListID: async (context, data) => {
    console.log('getFavoritesObjectsByListID ::', data);
    try {
      // Get user fav objects.
      await transport.post(
        process.env.host_api + '/object/get-favourite-objects-by-list-id',
        {
          idsArray: data
        }
      )
        .then(
          response => {
            console.log('getFavoritesObjectsByListID response.data.map ::', response);
            // response.data.map(
            //   item => {
            //     item.fav = true;
            //     if (context.state.userData.role === 'personal') {
            //       item.user = {
            //         name: 'Собственник'
            //       }
            //     } else if (context.state.userData.role === 'agent') {
            //       item.user = {
            //         name: 'Агент'
            //       }
            //     } else {
            //       item.user = {
            //         name: context.state.userData.name
            //       }
            //     }
            //     return item;
            //   }
            // );
            context.commit('updateFavouriteObjectsArrayState', response.data);
            return response.data;
          }
        )
          .catch(
            error => {
              console.error('[axios getFavoritesObjectsByListID error] ::', error);
              return false;
            }
          );
    } catch(error) {
      console.error('[try/catch getFavoritesObjectsByListID error] ::', error);
      return false;
    }
  },
  getLast32Objects: async (context, data) => {
    try {
      console.log('try getLast32Objects');
      // Get last 32 objects.
      await transport.get(
        process.env.host_api + '/object/getLast32Objects'
      )
        .then(
          response => {
            console.log('getLast32Objects : response.data =>', response.data);
            context.commit('updateObjectsOnHomeState', response.data);
          }
        )
          .catch(
            error => {
              console.error('[axios getLast32Objects error] ::', error);
            }
          );
    } catch(error) {
      console.error('[try/catch getLast32Objects error] ::', error);
    }
  },
}

export default actions;