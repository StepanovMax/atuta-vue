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
      />
    </div>
    <ads2 />
  </div>
</template>

<script>
// import { mapState } from 'vuex';
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
  data() {
    return {
      storedObjects: null,
    }
  },
  created() {
    // Calling the fetching method.
    this.getObjectsOnLoad();
    alert(this.storedObjects);
  },
  watch: {
    storedObjects: {
      handler(value) {
        alert(value);
      },
      deep: true
    },
  },
  methods: {
    // Fetch objects on the page load.
    getObjectsOnLoad() {
      const url = 'http://localhost:9001/objects/get-objects';
      fetch(
        url,
        {
          method: 'get'
        }
      )
        .then(
          response => {
            if (response.status !== 200) {
              console.error('Looks like there was a problem. :: ' + 'Status Code ' + response.status);
              return;
            }
            response.json()
              .then(
                response => {
                  this.storedObjects = JSON.parse(JSON.stringify(response));
                }
              )
              .catch(
                err => {
                  console.error('Request failed ::', err);
                }
              );
          }
        );
    }
  },
};
</script>