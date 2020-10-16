<template>
  <div
    id="companiesPage"
    class="companies-page"
  >

    <adsLeft />

    <div class="companies-page__wrap">

      <header class="companies-page__header">

        <div class="companies-page__header-top">

          <breadcrumbs />

        </div>

        <div class="companies-page__header-bottom">

          <h1 class="companies-page__header-title">
            Компании
          </h1>

          <p class="companies-page__header-title-count">
            &nbsp;{{ this.companiesCount }}
          </p>

        </div>

      </header>

      <div class="companies-page__content">

        <grid
          v-if="companiesList"
          propGridView="list"
          :propGridItems="companiesList"
          :propGridSorting="false"
          propItemType="company"
        />

      </div>

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
import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'favoritesPage',
  components: {
    grid,
    adsLeft,
    adsRight,
    breadcrumbs,
    filterDesktop,
  },
  data() {
    return {
      companiesCount: null,
      companiesList: null,
      host: this.getHost(),
    }
  },
  computed: {
    url() {
      const host = this.getHost();
      const url = `${host.api}` + '/companies/get-companies-all';
      return url;
    },
  },
  methods: {
    // Get an object when the page has been reload.
    async getCompaniesAll() {
      // const url = '//localhost:9001/companies/get-companies-all';
      const result = await axios.get(this.url)
        .then(function (response) {
          return response;
        })
          .catch(function (error) {
            console.error(error);
          });
      if (result) {
        this.companiesList = result.data;
        this.companiesCount = result.data.length;
      }
    },
  },
  async beforeMount() {
    await this.getCompaniesAll();
  },
};
</script>