<template>
  <div class="header-mobile">
    <div class="header-mobile__container">
      <div class="header-mobile__btn-wrap">
        <button
          class="btn btn_hamburger"
          @click="toggleMenu()"
        >
          <iconHamburger />
        </button>
        <button
          class="btn btn_settings"
        >
          <iconSettings />
        </button>
      </div>
      <div
        class="menu-mobile"
      >
        123
      </div>
    </div>
  </div>
</template>

<script>
import iconSettings from '../icons/iconSettings.vue'
import iconHamburger from '../icons/iconHamburger.vue'

export default {
  name: 'headerMobile',
  components: {
    iconSettings,
    iconHamburger,
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      console.log('test')
    }
  }
};
</script>