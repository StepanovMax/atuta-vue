<template>
  <footer
    id="footer"
    class="footer"
  >
    <div class="footer__container">
      <div class="footer__logo-container">
        <Logo />
        <MenuLeft />
      </div>
      <p class="paragraph">
        &copy; 2020 Все права защищены.
      </p>
    </div>
  </footer>
</template>

<script>
import MenuLeft from './menu/menuLeft.vue'
import Logo from './logo.vue'

export default {
  name: 'footer',
  components: {
    Logo,
    MenuLeft
  }
};
</script>