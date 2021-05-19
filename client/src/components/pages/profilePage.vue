<template>
  <div
    id="profilePage"
    class="
      profile-page
    "
  >

    <errorPage403
      v-if="!isLoggedIn"
    />

    <div
      class="template-page__wrap"
      v-if="isLoggedIn && userData"
    >

      <header class="template-page__header">

        <div class="template-page__header-top">

          <breadcrumbs
            :propPageName="pageName"
          />

        </div>

        <div class="template-page__header-bottom">

          <h1 class="template-page__title">
            Профиль
          </h1>

        </div>

      </header>

      <div class="template-page__content">

        <router-view />

      </div>

    </div>

  </div>
</template>

<script>
import breadcrumbs from '@cmp/common/breadcrumbs.vue';
import filterDesktop from '@cmp/filters/filterDesktop.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';

import { mapState } from 'vuex';

export default {
  name: 'profilePage',
  components: {
    breadcrumbs,
    filterDesktop,
    errorPage403,
  },
  data() {
    return {
      pageName: '',
      hostFront: process.env.host_front,
    }
  },
  watch: { 
    '$route': {
      handler: function(value) {
        this.checkPageName(value.name);
      },
      deep: true,
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
  },
  methods: {
    async logout(e) {
      this.$router.push({
        name: 'homePage'
      });
      e.preventDefault();
      this.$store.commit('updateLoggedInState', false);
      this.$store.commit('updateUserDataState', null);
      await this.$store.dispatch('logout');
    },
    closeUserMenuMobile() {
      this.$store.commit('closeMobileMenus');
    },
    clickOnLink() {
      this.closeUserMenuMobile();
    },
    checkPageName(name) {
      if (name === 'dialogSubPageSingle') {
        this.pageName = 'dialogsSubPage';
      } else {
        this.pageName = '';
      }
    },
  },
  mounted() {
    this.checkPageName(this.$route.name);
  },
};
</script>