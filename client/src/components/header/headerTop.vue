<template>
  <div class="header-top">
    <div class="header-top__container">
      <menuLeft />
      <menuRight />
      <menuEnter />
    </div>
  </div>
</template>

<script>
import menuLeft from '../menu/menuLeft.vue'
import menuRight from '../menu/menuRight.vue'
import menuEnter from '../menu/menuEnter.vue'

export default {
  name: 'HeaderTop',
  components: {
    menuLeft,
    menuRight,
    menuEnter,
  },
};
</script>