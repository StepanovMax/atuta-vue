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
        v-if="favouriteObjectsArray"
        :propGridView="'net'"
        :propGridItems="favouriteObjectsArray"
        :propGridSorting="true"
        :propIsSelected="true"
        propItemType="object"
      />
    </div>

    <div
      v-local
      v-if="true && favouriteObjectsArray"
      class="local-output-data"
    >
      <h6 class="
        title
        title_h6
        title_bold
      ">
        favouriteObjectsArray
      </h6>
      <pre>
        {{ favouriteObjectsArray }}
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
    async favouriteObjects(value) {
      await this.$store.dispatch('getFavoritesObjectsByListID', value);
    },
  },
  computed: {
    ...mapState([
      'userData',
      'favouriteObjects',
      'favouriteObjectsArray',
    ]),
  },
  async mounted() {
    await this.$store.dispatch('getFavoritesObjectsByListID', this.favouriteObjects);
  },
};
</script>