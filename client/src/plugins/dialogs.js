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
            console.log('[Plugin] Getting dialogs result ::', result.data);
            this.$store.commit('updateDialogsState', result.data);
          }
        },
      }
    });
  }
}

export default dialogs;