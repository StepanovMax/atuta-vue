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
      <router-view class=""></router-view>
    </div>
    <menuMobile />
    <footerDesktop />
  </div>
</template>

<script>
import headerDesktop from './components/header/header.vue'
import footerDesktop from './components/footerDesktop.vue'
import searchMobile from './components/search/searchMobile.vue'
import menuMobile from './components/menu/menuMobile.vue'
import { mapState } from 'vuex';

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
    $route() {
      this.closeMobileMenus();
    }
  },
  methods: {
    closeMobileMenus() {
      this.$store.commit('closeMobileMenus');
    },
  },
};
</script>