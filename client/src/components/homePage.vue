<template>
  <div
    id="home"
    class="main"
  >
    <div class="filter">
      <filterDesktop />
    </div>
    <div class="article">
      <grid
        v-if="objectsOnHome"
        propSortingTypeGrid="common"
        :propGridView="'net'"
        :propGridItems="objectsOnHome"
        :propGridSorting="true"
        propItemType="object"
      />
    </div>
    <adsRight />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import adsRight from './adsRight.vue';
import grid from './grid.vue';
import filterDesktop from './filters/filterDesktop.vue';

export default {
  name: 'homePage',
  components: {
    adsRight,
    grid,
    filterDesktop,
  },
  data() {
    return {
      response: '',
      error: '',
      host: '',
    }
  },
  computed: {
    ...mapState([
      'objectsOnHome',
    ]),
  },
  async mounted() {
    // Calling the fetching method.
    await this.$store.dispatch('getLast32Objects');
  },
};
</script>