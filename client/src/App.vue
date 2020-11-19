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
  data() {
    return {
      loginData: {
        login: 'admin',
        password: '12345678',
      },
    }
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
    urlLogin() {
      const host = this.getHost();
      const url = `${host.api}` + '/auth/login';
      return url;
    },
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
    async getUserData() {
      const getUserDataResult = await axios.post(
        this.urlLogin,
        this.loginData
      )
        .then(
          response => {
            return response.data;
          }
        )
        .catch(
          error => {
            console.log('Error [Login] ::', error);
            return false;
          }
        );
      return getUserDataResult;
    },
  },
  async created() {
    // TEMP
    // If user has cookie with the TRUE loggedIn data,
    if (this.getCookie('isLoggedIn') === 'true') {
      // then update state to true.
      this.$store.commit('updateLoggedInState', true);
    // If not,
    } else {
      // then update state to false.
      this.$store.commit('updateLoggedInState', false);
    }

    // If the state loggedIn data is TRUE,
    if (this.isLoggedIn) {
      // then loading data from the server.
      const loginResult = await axios.post(
        this.urlLogin,
        this.loginData
      )
        .then(
          response => {
            return response;
          }
        )
          .catch(
            error => {
              console.log('Error [Login] ::', error);
              return false;
            }
          );
      // If the data has loaded,
      if (loginResult.data) {
        // then fill out to TRUE loggedIn statement.
        this.$store.commit('updateLoggedInState', true);
        // then fill out userData statement.
        this.$store.commit('updateUserDataState', loginResult.data);
        // then loading the user's favourite objects.
        this.getFavouritesObjectsByListID(loginResult.data.favouriteObjectsListID);
        // then loading the user's dialogs.
        this.getDialogsByUserID(loginResult.data.id);
        // then update cookie with the TRUE value.
        this.setCookie('isLoggedIn', true, {secure: true, 'max-age': 3600});
        // then get towns list.
        await this.$store.dispatch('getTowns');
      }
    }
  },
};
</script>