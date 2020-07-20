<template>
  <div class="header-top">
    <div class="header-top__container">
      <menuLeft />
      <menuRight />
    </div>
  </div>
</template>

<script>
import menuLeft from '../menu/menuLeft.vue'
import menuRight from '../menu/menuRight.vue'

export default {
  name: 'HeaderTop',
  components: {
    menuLeft,
    menuRight
  },
};
</script>