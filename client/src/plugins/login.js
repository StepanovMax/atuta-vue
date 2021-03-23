import axios from 'axios';

const login = {
  install(Vue) {
    Vue.mixin({
      methods: {
        // Loading fav objects by the user id.
        // async getFavouritesObjectsByListID(idsArray) {
        //   const url = process.env.host_api + '/objects/get-favourite-objects-by-id';

        //   const result = await axios.post(
        //     url,
        //     {
        //       idsArray: idsArray
        //     }
        //   )
        //     .then(function (response) {
        //       return response;
        //     })
        //       .catch(function (error) {
        //         console.error('[getFavouritesObjectsByListID] Error ::', error);
        //       });
        //   if (result) {
        //     this.$store.commit('updateFavouriteObjectsState', result.data);
        //   }
        // },
      }
    });
  }
}

export default login;