<template>
  <ul class="menu">
    <li
      v-if="isLoggedIn"
      class="menu__item"
    >
      <router-link
        :to="{
          name: 'homePage'
        }"
        class="link"
      >
        <a
          @click="logout"
        >
          Выйти
        </a>
      </router-link>
    </li>
    <li
      v-if="!isLoggedIn"
      class="menu__item"
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
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
  },
  methods: {
    logout() {
      this.$store.commit('updateLoggedInState', false);
      this.$store.commit('updateUserDataState', null);
    }
  },
};
</script>