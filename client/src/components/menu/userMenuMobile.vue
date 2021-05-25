<template>
  <div
    class="user-menu-mobile"
    :class="{'user-menu-mobile_open': isUserMenuMobileOpen}"
  >
    <div
      class="user-menu-mobile__overlay"
      :class="[
        { 'user-menu-mobile__overlay_open': isUserMenuMobileOpen }
      ]"
    >
    </div>
    <div
      class="user-menu-mobile__wrap"
      :class="[
        { 'user-menu-mobile__wrap_open': isUserMenuMobileOpen }
      ]"
    >
      <div class="user-menu-mobile__header">
        <p
          v-if="isLoggedIn && userData"
          class="user-menu-mobile__user-name"
        >
          {{ userData.name }}
        </p>
        <p
          v-if="!isLoggedIn"
          class="user-menu-mobile__user-name"
        >
          <router-link
            :to="{ name: 'loginPage' }"
            class="
              link
              user-menu-mobile__link
            "
          >
            Войти</router-link>
          <span class="">
            &nbsp;или&nbsp;
          </span>
          <router-link
            :to="{ name: 'registrationPage' }"
            class="
              link
              user-menu-mobile__link
            "
          >
            зарегистрироваться
          </router-link>
        </p>
      </div>
      <div class="user-menu-mobile__content">
        <menuSidebar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import menuSidebar from '@cmp/menu/menuSidebar.vue';

export default {
  name: 'userMenuMobile',
  components: {
    menuSidebar,
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
      'isUserMenuMobileOpen',
    ]),
  },
  methods: {
    // closeUserMenuMobile() {
    //   this.$store.commit('closeMobileMenus');
    // },
    // clickOnLink() {
    //   this.closeUserMenuMobile();
    // },
    // async logout() {
    //   // e.preventDefault();
    //   this.$store.commit('updateLoggedInState', false);
    //   this.$store.commit('updateUserDataState', {});
    //   this.$root.$emit('closeMobileMenu');
    //   this.setCookie('isLoggedIn', false, {secure: true, 'max-age': 3600});
    //   await this.$store.dispatch('logout');
    // }
  },
};
</script>