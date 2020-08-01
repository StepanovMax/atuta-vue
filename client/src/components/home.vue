<template>
  <div id="home">
    <div class="filter">
      <filterDesktop />
    </div>
    <div class="article">
      <grid
        :propGridView="'net'"
        :propGridItems="storedObjects"
      />
    </div>
    <ads />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ads from './ads.vue';
import grid from './grid.vue';
import filterDesktop from './filters/filterDesktop.vue';

export default {
  name: 'home',
  components: {
    ads,
    grid,
    filterDesktop,
  },
  computed: {
    ...mapState([
      'testObjects',
    ]),
    storedObjects() {
      return JSON.parse(JSON.stringify(this.testObjects));
    },
  },
};
</script>