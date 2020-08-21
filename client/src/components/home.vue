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
        :propGridView="'net'"
        :propGridItems="storedObjects"
      />
    </div>
    <ads2 />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ads2 from './ads-2.vue';
import grid from './grid.vue';
import filterDesktop from './filters/filterDesktop.vue';

export default {
  name: 'home',
  components: {
    ads2,
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