<template>
  <footer
    id="footer"
    class="footer"
  >
    <div class="footer__container">
      <MenuLeft />
      <p class="paragraph">
        &copy; 2020 Все права защищены.
      </p>
    </div>
  </footer>
</template>

<script>
import MenuLeft from './menu/menuLeft.vue'

export default {
  name: 'footer',
  components: {
    MenuLeft
  }
};
</script>