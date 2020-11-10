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
    if (this.getCookie('isLoggedIn') === 'true') {
      this.$store.commit('updateLoggedInState', true);
    } else {
      this.$store.commit('updateLoggedInState', false);
    }

    if (this.isLoggedIn) {
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
      if (loginResult.data) {
        this.$store.commit('updateLoggedInState', true);
        this.$store.commit('updateUserDataState', loginResult.data);
        this.setCookie('isLoggedIn', true, {secure: true, 'max-age': 3600});
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('getTowns');
  },
};
</script>