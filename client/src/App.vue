<template>
  <div
    id="app"
    class="app"
    :class="[
      { 'app_hidden': this.isFilterOpen || this.isUserMenuMobileOpen }
    ]"
  >
    <headerDesktop />
    <searchMobile />
    <div class="main-wrap">
      <router-view></router-view>
    </div>
    <menuMobile />
    <footerDesktop />
  </div>
</template>

<script>
import axios from 'axios';
import headerDesktop from './components/header/header.vue';
import footerDesktop from './components/footerDesktop.vue';
import searchMobile from './components/search/searchMobile.vue';
import menuMobile from './components/menu/menuMobile.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    headerDesktop,
    footerDesktop,
    menuMobile,
    searchMobile,
  },
  computed: {
    ...mapState([
      'isLoggedIn',
      'isFilterOpen',
      'mobileQuestionClosed',
      'isUserMenuMobileOpen',
    ]),
    ...mapActions([
      'getTowns',
    ]),
  },
  watch: {
    $route(to, from) {
      this.$store.commit('updatePreviousPageState', from);
      this.closeMobileMenus();
      this.changeMobileQuestionStateOnWatch(to);
    }
  },
  methods: {
    closeMobileMenus() {
      this.$store.commit('closeMobileMenus');
    },
    changeMobileQuestionState(state) {
      this.$store.commit('changeMobileQuestionState', state);
    },
    changeMobileQuestionStateOnWatch(to) {
      if (to.name === 'answer') {
        this.changeMobileQuestionState(false);
      } else {
        this.changeMobileQuestionState(true);
      }
    },
  },
  async created() {
    /*
      In case of page reload.
      Start.
    */
      const transport = axios.create({
        withCredentials: true
      });
      // Check the token.
      const checkTokenResult = await transport.get(
        this.getHost().api + '/auth/checkToken'
      )
        .then(
          response => {
            // console.log('Response checkToken ::', response);
            return response;
          }
        )
          .catch(
            error => {
              console.error('Error :: After page refresh token is outdated', error);
              return false;
            }
          );

      // If the state loggedIn data is TRUE,
      if (checkTokenResult) {
        // If the data has loaded,
        if (checkTokenResult.data) {
          // then fill out to TRUE loggedIn statement.
          this.$store.commit('updateLoggedInState', true);
          // then fill out userData statement.
          this.$store.commit('updateUserDataState', checkTokenResult.data);
          if (checkTokenResult.data.favouriteObjectsListID) {
            // then loading the user's favourite objects.
            this.getFavouritesObjectsByListID(checkTokenResult.data.favouriteObjectsListID);
          }
          // then loading user's dialogs.
          this.getDialogsByUserID(checkTokenResult.data.id);
          // then update cookie with the TRUE value.
          this.setCookie('isLoggedIn', true, {secure: true, 'max-age': 3600});
          // then get towns list.
          await this.$store.dispatch('getTowns');
        }
      } else {
        this.$store.commit('updateLoggedInState', false);
        this.$store.commit('updateUserDataState', null);
        this.setCookie('isLoggedIn', false, {secure: true, 'max-age': 3600});
      }
    /*
      In case of page reload.
      Stop.
    */
  },
};
</script>