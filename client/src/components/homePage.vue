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
import axios from 'axios';

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
  methods: {
    async getLast32Objects() {
      const transport = axios.create({
        withCredentials: true
      });

      try {
        console.log('try getLast32Objects');
        // Get last 32 objects.
        await transport.get(
          process.env.host_api + '/object/getLast32Objects'
        )
          .then(
            response => {
              console.log('getLast32Objects : response.data =>', response.data);
              this.$store.commit('updateObjectsOnHomeState', response.data);
            }
          )
            .catch(
              error => {
                console.error('[axios getLast32Objects error] ::', error);
              }
            );
      } catch(error) {
        console.error('[try/catch getLast32Objects error] ::', error);
      }
    },
  },
  mounted() {
    console.log('home page mounted storedObjects ::');
    // Calling the fetching method.
    this.getLast32Objects();
  },
};
</script>