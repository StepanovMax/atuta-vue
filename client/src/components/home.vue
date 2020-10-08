<template>
  <div
    id="home"
    class="main"
  >
    <div class="filter">
      <filterDesktop />
    </div>
    <p>
      {{ response }}
      {{ error }}
    </p>
    <div class="article">
      <grid
        v-if="storedObjects"
        :propGridView="'net'"
        :propGridItems="storedObjects"
        :propGridSorting="true"
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
import axios from 'axios';

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
      response: '',
      error: '',
    }
  },
  created() {
    // Calling the fetching method.
    this.getObjectsOnLoad();
    // alert(this.storedObjects);
  },
  watch: {
    storedObjects: {
      handler(value) {
        // alert(value);
      },
      deep: true
    },
  },
  methods: {
    // Fetch objects on the page load.
    getObjectsOnLoad() {
      const url1 = 'http://localhost:9001/objects/get-objects';
      const url2 = 'https://jsonplaceholder.typicode.com/posts';
      const url3 = 'http://127.0.0.1:9001/objects/asd';

      axios({
        method: 'get',
        url: url1,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
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


      // fetch(url)
      //   .then(
      //     response => {
      //       alert('then');
      //       if (response.status !== 200) {
      //         alert('error1');
      //         console.error('Looks like there was a problem. :: ' + 'Status Code ' + response.status);
      //         return;
      //       }
      //       response.json()
      //         .then(
      //           response => {
      //             alert('Success');
      //             this.storedObjects = JSON.parse(JSON.stringify(response));
      //           }
      //         )
      //         .catch(
      //           err => {
      //             alert('error2');
      //             console.error('Request failed ::', err);
      //           }
      //         );
      //     }
      //   );
    }
  },
};
</script>