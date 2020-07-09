<template>
  <header
    id="header"
    class="header"
  >
    <HeaderTop />
    <HeaderBottom />
  </header>
</template>

<script>
import HeaderTop from './header-top.vue'
import HeaderBottom from './header-bottom.vue'

export default {
  name: 'header',
  components: {
    HeaderTop,
    HeaderBottom
  },
};
</script>