<template>
  <div
    id="home"
    class="article"
  >
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import grid from './grid.vue';

export default {
  name: 'homePage',
  components: {
    grid,
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