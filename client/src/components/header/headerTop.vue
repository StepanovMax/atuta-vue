<template>
  <div class="header-top">
    <div class="header-top__container">
      <MenuLeft />
      <MenuRight />
    </div>
  </div>
</template>

<script>
import MenuLeft from '../menu/menuLeft.vue'
import MenuRight from '../menu/menuRight.vue'

export default {
  name: 'HeaderTop',
  components: {
    MenuLeft,
    MenuRight
  },
};
</script>