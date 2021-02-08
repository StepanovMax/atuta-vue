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
      'isFilterOpen',
      'isUserMenuMobileOpen',
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
};
</script>