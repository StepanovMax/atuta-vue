<template>
  <div
    id="helpPage"
    class="help-page"
  >

    <adsLeft />

    <div class="help-page__wrap">

      <header class="help-page__header">

        <div class="help-page__header-top">

          <breadcrumbs
            propPageName="helpPage"
          />

        </div>

        <div class="help-page__header-bottom">

          <h1 class="help-page__title">
            Помощь
          </h1>

        </div>

      </header>

      <div class="help-page__content">

        <div
          class="help-page__questions"
          :class="{ 'help-page__questions__mobile': !mobileQuestionState }"
        >
          <ul class="help-page__questions-list">
            <li
              class="help-page__questions-list-item"
              v-for="(item, index) in questionsData"
              :key="index"
            >
              <router-link
                class="help-page__link"
                :to="{
                  name: 'answer',
                  params: {
                    id: index,
                    data: item,
                  }
                }"
              >
                {{ item.question }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="help-page__answers">
          <router-view
            :key="$route.fullPath"
          />
        </div>

      </div>

    </div>

    <adsRight />

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import grid from '../grid.vue';
import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'companyPage',
  components: {
    adsLeft,
    adsRight,
    breadcrumbs,
  },
  data() {
    return {
      mobileQuestionClass: false,
      storedObjects: null,
      questionsData: null,
    }
  },
  computed: {
    ...mapState([
      'mobileQuestionState',
    ]),
    url() {
      const host = this.getHost();
      const url = `${host.api}` + '/help/get-help-all';
      return url;
    },
  },
  methods: {
    changeMobileQuestionState(state) {
      this.$store.commit('changeMobileQuestionState', state);
    },
    changeMobileQuestionStateOnMount() {
      if (this.$router.currentRoute.name === 'answer') {
        this.changeMobileQuestionState(false);
      } else {
        this.changeMobileQuestionState(true);
      }
    },
    // Get the help data when the page has been reload.
    async getHelpAll() {
      const result = await axios.get(this.url)
        .then(function (response) {
          return response;
        })
          .catch(function (error) {
            console.error(error);
          });
      if (result) {
        this.questionsData = result.data;
      }
    },
  },
  async beforeMount() {
    await this.getHelpAll();
  },
  mounted() {
    this.changeMobileQuestionStateOnMount();
  },
};
</script>