<template>
  <div
    id="app"
    class="app"
  >
    <headerDesktop />
    <searchMobile />
    <router-view class="content"></router-view>
    <menuMobile />
    <footerDesktop />
  </div>
</template>

<script>
import headerDesktop from './components/header/header.vue'
import footerDesktop from './components/footerDesktop.vue'
import searchMobile from './components/search/searchMobile.vue'
import menuMobile from './components/menu/menuMobile.vue'

export default {
  name: 'App',
  components: {
    headerDesktop,
    footerDesktop,
    menuMobile,
    searchMobile,
  }
};
</script>