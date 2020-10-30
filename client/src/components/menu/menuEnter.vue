<template>
  <ul
    v-if="!isLoggedIn"
    class="menu"
  >
    <li class="menu__item">
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
import { mapState } from 'vuex';

export default {
  name: 'menuEnter',
  computed: {
    ...mapState([
      'isLoggedIn',
    ]),
  },
};
</script>