<template>
  <div
    id="companiesPage"
    class="companies-page"
  >

    <ads1 />

    <div class="companies-page__wrap">

      <header class="companies-page__header">
        <h1 class="companies-page__header-title">
          Компании
        </h1>
        <p class="companies-page__header-title-count">
          &nbsp;{{ this.companiesCount }}
        </p>
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

    <ads2 />

  </div>
</template>

<script>
import axios from 'axios';

import grid from '../grid.vue';
import ads1 from '../ads-1.vue';
import ads2 from '../ads-2.vue';
import filterDesktop from '../filters/filterDesktop.vue';

export default {
  name: 'favoritesPage',
  components: {
    ads1,
    ads2,
    grid,
    filterDesktop,
  },
  data() {
    return {
      companiesCount: null,
      companiesList: null,
    }
  },
  methods: {
    // Get an object when the page has been reload.
    async getCompaniesAll() {
      const url = '//localhost:9001/companies/get-companies-all';
      const result = await axios.get(url)
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