<template>
  <header
    id="header-section"
    class="header"
  >
    <headerTop />
    <headerBottom />
  </header>
</template>

<script>
import headerTop from './headerTop.vue'
import headerBottom from './headerBottom.vue'

export default {
  name: 'headerDesktop',
  components: {
    headerTop,
    headerBottom,
  },
};
</script>