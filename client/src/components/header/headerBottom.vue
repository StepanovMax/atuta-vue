<template>
  <div class="header-bottom">
    <div class="header-bottom__container">
      <Logo location="header" />
      <searchMain />
    </div>
  </div>
</template>

<script>
import Logo from '../logo.vue'
import searchMain from '../common/searchMain.vue'

export default {
  name: 'HeaderBottom',
  components: {
    Logo,
    searchMain,
  },
};
</script>