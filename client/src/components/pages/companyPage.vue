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
              :src="host.front + companyData.urlPreview" 
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

          </div>

        </div>

      </header>

      <div class="company-page__content">

        <div class="company-page__description">
          <p class="paragraph">
            {{ companyData.description.label }}
          </p>
          <p class="paragraph">
            <span class="">
              Сайт компании:
            </span>
            <span class="">
              <a
                target="_blank"
                href="companyData.url.value"
                class=""
              >
                {{ companyData.url.value }}
              </a>
            </span>
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
      host: this.getHost(),
      storedObjects: null,
      companyData: null,
      companyID: this.$route.params.id,
    }
  },
  computed: {
    urlGetCompanyById() {
      const url = this.host.api + '/companies/get-company-by-id';
      return url;
    },
    urlGetObjectsOnLoad() {
      const url = this.host.api + '/objects/get-objects/';
      return url;
    },
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
        this.urlGetCompanyById,
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
        url: this.urlGetObjectsOnLoad,
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