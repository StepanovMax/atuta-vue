import axios from 'axios';

const dialogs = {
  install(Vue) {
    Vue.mixin({
      methods: {
        // Loading dialogs by the user id.
        async getDialogsByUserID(userID) {
          const host = this.getHost();
          const url = `${host.api}` + '/dialogs/get-dialogs-by-user-id';

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
          const host = this.getHost();
          const url = `${host.api}` + '/dialogs/get-dialog-by-id';

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
      }
    });
  }
}

export default dialogs;