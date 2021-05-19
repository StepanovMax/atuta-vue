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
      <dsaWrap>
        <router-view></router-view>
      </dsaWrap>
    </div>
    <menuMobile />
    <footerDesktop />
  </div>
</template>

<script>
import dsaWrap from '@cmp/pages/dsaWrap.vue';
import headerDesktop from '@cmp/header/header.vue';
import footerDesktop from '@cmp/footerDesktop.vue';
import searchMobile from '@cmp/search/searchMobile.vue';
import menuMobile from '@cmp/menu/menuMobile.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    dsaWrap,
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