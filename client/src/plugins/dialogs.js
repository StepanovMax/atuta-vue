import axios from 'axios';

const dialogs = {
  install(Vue) {
    Vue.mixin({
      methods: {
        // Loading dialogs by the user id.
        async getDialogsByUserID(userID) {
          const url = process.env.host_api + '/dialogs/get-dialogs-by-user-id';

          const result = await axios.post(
            url,
            {
              userID: userID
            }
          )
            .then(function (response) {
              return response;
            })
            .catch(function (error) {
              console.error('[MS] Getting dialogs error ::', error);
            });
          if (result) {
            // console.log('[MS] result.data ::', result.data);
            this.$store.commit('updateAllDialogsListOfUserState', result.data);
          }
        },
        // Loading dialog by its id.
        async getDialogByID(dialogID) {
          const url = process.env.host_api + '/dialogs/get-dialog-by-id';

          const result = await axios.post(
            url,
            {
              dialogID: dialogID
            }
          )
            .then(function (response) {
              // console.log('[MS] Getting dialog response ::', response);
              return response;
            })
            .catch(function (error) {
              console.error('[MS] Getting dialog error ::', error);
            });
          if (result) {
            // this.$store.commit('updateAllDialogsListOfUserState', result.data);
          }
        },
        // Loading all dialogs length.
        async getAllDialogsLength() {
          const url = process.env.host_api + '/dialogs/get-all-dialogs-length';

          const result = await axios.get(
            url
          )
            .then(function (response) {
              // console.log('[MS] Getting all dialogs length response ::', response);
              return response;
            })
            .catch(function (error) {
              console.error('[MS] Getting all dialogs length error ::', error);
            });
          return result;
          // if (result) {
          //   this.$store.commit('updateAllDialogsListOfUserState', result.data);
          // }
        },
      }
    });
  }
}

export default dialogs;