<template>
  <footer
    id="footer-section"
    class="footer"
  >
    <div class="footer__container">
      <div class="footer__logo-container">
        <Logo location="footer" />
      </div>
      <MenuLeft />
      <p class="paragraph">
        &copy; {{ new Date().getFullYear() }} Все права защищены.
      </p>
    </div>
  </footer>
</template>

<script>
import MenuLeft from './menu/menuLeft.vue'
import Logo from './logo.vue'

export default {
  name: 'footerDesktop',
  components: {
    Logo,
    MenuLeft
  }
};
</script>