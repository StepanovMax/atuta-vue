<template>
  <ul
    class="
      menu
      menu_right
    "
    :class="{ 'menu_logged_in': isLoggedIn }"
  >
    <li
      v-if="isLoggedIn"
      class="menu__item true"
    >
      <div class="menu__item-name">
        <router-link
          v-if="userData"
          :to="{ name: 'settingsSubPage' }"
          class="
            link
            menu__link
          "
        >
          {{ userData.name }}
        </router-link>
      </div>
    </li>
    <li
      v-else
      class="menu__item false"
    >
      <router-link
        :to="{ name: 'loginPage' }"
        class="link"
      >
        Войти
      </router-link>
      <span class="">
        /
      </span>
      <router-link
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'registrationPage' }"
        class="link"
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
        >
          Регистрация
        </a>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapState, store, commit } from 'vuex';

export default {
  name: 'menuEnter',
  data() {
    return {
      menuIsOpen: false,
    }
  },
  watch: {
    'userData': function(value) {
      // console.log('this.userData value ::', value);
    },
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
  },
  mounted() {
    // console.log('this.userData ::', this.userData);
  },
};
</script>