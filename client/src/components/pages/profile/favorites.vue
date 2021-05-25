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
        propSortingTypeGrid="common"
        :propGridView="'net'"
        :propGridItems="favouriteObjectsArray"
        :propGridSorting="true"
        :propIsSelected="true"
        propItemType="object"
      />
    </div>

    <local-output-data
      :object="favouriteObjectsArray"
      name="favouriteObjectsArray"
    />

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import grid from '../../grid.vue';
import localOutputData from '@cmp/common/localOutputData.vue';

export default {
  name: 'favorites',
  components: {
    grid,
    localOutputData,
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