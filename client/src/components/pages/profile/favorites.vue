<template>
  <div
    id="favoritesSubPage"
    class=""
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        Избранное
      </h3>
    </header>

    <div class="template-page__content">
      <grid
        v-if="favouriteObjects"
        :propGridView="'net'"
        :propGridItems="favouriteObjects"
        :propGridSorting="true"
        :propIsSelected="true"
        propItemType="object"
      />
    </div>

    <div
      v-local
      v-if="userData"
      class="local-output-data"
    >
      <h6 class="
        title
        title_h6
        title_bold
      ">
        userData
      </h6>
      <pre>
        {{ userData }}
      </pre>
    </div>

    <div
      v-local
      v-if="favouriteObjects"
      class="local-output-data"
    >
      <h6 class="
        title
        title_h6
        title_bold
      ">
        favouriteObjects
      </h6>
      <pre>
        {{ favouriteObjects }}
      </pre>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import grid from '../../grid.vue';

export default {
  name: 'favorites',
  components: {
    grid,
  },
  watch: {
    // We are using Watcher for UserData because we waiting while this data has been loaded from the server.
    userData(newValue, oldValue) {
      this.getFavouritesObjectsByListID(newValue.favouriteObjectsListID);
    },
  },
  computed: {
    ...mapState([
      'userData',
      'favouriteObjects',
    ]),
  },
  mounted() {
    // If we got fav objects already.
    if (this.favouriteObjects) {
    // If we don't get fav objects yet.
    } else {
      if (this.userData) {
        this.getFavouritesObjectsByListID(this.userData.favouriteObjects);
      } else {
        // console.log(' - there no userData');
      }
    }
  },
};
</script>