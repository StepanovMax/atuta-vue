<template>
  <div
    id="companyPage"
    class="companies-page"
  >

    <adsLeft />

    <div class="companies-page__wrap">

      <header class="companies-page__header">
        <h1 class="companies-page__header-title">
          {{ companyData.name.label }}
        </h1>
      </header>

      {{ companyData }}

    </div>

    <adsRight />

  </div>
</template>

<script>
import axios from 'axios';

import grid from '../grid.vue';
import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import filterDesktop from '../filters/filterDesktop.vue';

export default {
  name: 'companyPage',
  components: {
    adsLeft,
    adsRight,
  },
  // props: {
  //   companyData: {
  //     type: Object,
  //     default: {},
  //     required: true,
  //   },
  // },
  data() {
    return {
      companyData: null,
    }
  },
  beforeMount(){
    // this.getSameObjects();
    // If it's a route transition then load an object through params.
    if (this.$route.params.companyData) {
      this.companyData = this.$route.params.companyData;
    } else {
      // this.getObjectOnPageReload();
    }
  },
};
</script>