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
        v-if="storedObjects"
        :propGridView="'net'"
        :propGridItems="storedObjects"
        :propGridSorting="true"
        propItemType="object"
      />
    </div>
    <adsRight />
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import adsRight from './adsRight.vue';
import grid from './grid.vue';
import filterDesktop from './filters/filterDesktop.vue';
import axios from 'axios';

export default {
  name: 'home',
  components: {
    adsRight,
    grid,
    filterDesktop,
  },
  data() {
    return {
      storedObjects: null,
      response: '',
      error: '',
      host: '',
    }
  },
  created() {
    // Calling the fetching method.
    this.getObjectsOnLoad();
  },
  computed: {
    url() {
      const host = this.getHost();
      const url = `${host}` + '/objects/get-objects/';
      return url;
    },
  },
  methods: {
    // Fetch objects on the page load.
    getObjectsOnLoad() {
      // const url2 = 'https://jsonplaceholder.typicode.com/posts';

      axios({
        method: 'get',
        url: this.url,
        responseType: 'stream',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true"
        },
      })
        .then(response => {
          this.response = 'Success!';
          this.storedObjects = JSON.parse(JSON.stringify(response.data));
        })
          .catch(error => {
            this.error = error;
          })
            .then(function () {
              // alert('always executed');
            });
    }
  },
  mounted() {
    // console.log('home page mounted storedObjects ::', this.storedObjects);
  },
};
</script>