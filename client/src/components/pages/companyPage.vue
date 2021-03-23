<template>
  <div
    id="companyPage"
    class="company-page"
    v-if="companyData"
  >

    <adsLeft />

    <div class="company-page__wrap">

      <header class="company-page__header">

        <div class="company-page__header-top">

          <breadcrumbs
            propPageName="companiesPage"
          />

        </div>

        <div class="company-page__header-bottom">

          <div class="company-page__image-wrap">
            <img
              class="company-page__image"
              :src="hostFront + companyData.urlPreview" 
              alt=""
            >
          </div>

          <div class="company-page__image-description">

            <h1 class="company-page__header-title">
              {{ companyData.name.label }}
            </h1>

            <p class="paragraph">
              {{ companyData.descriptionShort.label }}
            </p>

            <div class="company-page__contacts">

              <h4 class="company-page__contacts-title">
                Контакты
              </h4>

              <ul class="list company-page__phones">
                <li
                  class="list__item company-page__phones-item"
                  v-for="(item, index) in companyData.phoneNumbers"
                  :key="index"
                >
                  <a
                    :href="'tel:' + item"
                    class="company-page__phones-link"
                  >
                    {{ item }}
                  </a>
                </li>
              </ul>

              <p class="company-page__website">
                <span class="">
                  <a
                    target="_blank"
                    href="companyData.url.value"
                    class="company-page__phones-link"
                  >
                    {{ companyData.url.value }}
                  </a>
                </span>
              </p>

              <div class="company-page__address">
                <p class="company-page__paragraph">
                  {{ companyData.address }}
                </p>
              </div>

            </div>

          </div>

        </div>

      </header>

      <div class="company-page__content">

        <div class="company-page__description">
          <p class="paragraph">
            {{ companyData.description.label }}
          </p>
        </div>

        <div class="company-page__same-objects">
          <div class="company-page__same-objects-header">
            <h4 class="company-page__same-objects-title">
              <span class="">
                Объявления
              </span>
              <span
                v-if="storedObjects"
                class=""
              >
                {{ storedObjects.length }}
              </span>
            </h4>
          </div>
          <grid
            v-if="storedObjects"
            class="company-page__same-objects-grid"
            propSortingTypeGrid="common"
            :propGridView="'net'"
            :propGridItems="storedObjects"
            :propGridSorting="false"
            propItemType="object"
          />
        </div>

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
import breadcrumbs from '../common/breadcrumbs.vue';
import filterDesktop from '../filters/filterDesktop.vue';

export default {
  name: 'companyPage',
  components: {
    grid,
    adsLeft,
    adsRight,
    breadcrumbs,
  },
  data() {
    return {
      hostFront: process.env.host_front,
      storedObjects: null,
      companyData: null,
      companyID: this.$route.params.id,
    }
  },
  beforeMount(){
    this.getObjectsOnLoad();
    // If it's a route transition then load an object through params.
    if (this.$route.params.companyData) {
      this.companyData = this.$route.params.companyData;
    } else {
      this.getCompanyOnPageReload();
    }
  },
  methods: {
    // Get a company when the page has been reload.
    async getCompanyOnPageReload() {
      const result = await axios.post(
        process.env.host_api + '/companies/get-company-by-id',
        {
          id: this.companyID
        }
      )
        .then(function (response) {
          return response;
        })
          .catch(function (error) {
            console.error(error);
          });
      if (result) {
        this.companyData = result.data;
      }
    },
    // Fetch objects on the page load.
    getObjectsOnLoad() {
      axios({
        method: 'get',
        url: process.env.host_api + '/objects/get-objects/',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true"
        },
      })
        .then(response => {
          this.storedObjects = JSON.parse(JSON.stringify(response.data));
        })
          .catch(error => {
            this.error = error;
          });
    }
  },
};
</script>