<template>
  <div
    id="companiesPage"
  >

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
          propSortingTypeGrid="common"
          propGridView="list"
          :propGridItems="companiesList"
          :propGridSorting="false"
          propItemType="company"
        />

      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';

import grid from '../grid.vue';
import filterDesktop from '../filters/filterDesktop.vue';
import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'companiesPage',
  components: {
    grid,
    breadcrumbs,
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
      const result = await axios.get(process.env.host_api + '/companies/get-companies-all')
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