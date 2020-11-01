<template>
  <ul
    class="
      menu
      menu_right
    "
  >
    <li
      v-if="isLoggedIn"
      class="menu__item"
    >
      <a
        class="
          link
          menu__link
        "
        @click="toggleMenu"
      >
        {{ userData.name.label }}
      </a>
      <ul
        v-if="menuIsOpen"
        class="menu_sub"
        v-click-outside="onClickOutside"
      >
        <li
          class="
            menu__item
            menu__item_sub
          "
        >
          <router-link
            v-slot="{ href, navigate, isActive }"
            :to="{ name: 'messagesPage' }"
            class="link"
          >
            <a
              :active="isActive"
              :href="href"
              @click="navigate"
            >
              Сообщения
            </a>
          </router-link>
        </li>
        <li
          class="
            menu__item
            menu__item_sub
          "
        >
          <router-link
            v-slot="{ href, navigate, isActive }"
            :to="{ name: 'pocketPage' }"
            class="link"
          >
            <a
              :active="isActive"
              :href="href"
              @click="navigate"
            >
              Кошелёк
            </a>
          </router-link>
        </li>
        <li
          class="
            menu__item
            menu__item_sub
          "
        >
          <router-link
            v-slot="{ href, navigate, isActive }"
            :to="{ name: 'settingsPage' }"
            class="link"
          >
            <a
              :active="isActive"
              :href="href"
              @click="navigate"
            >
              Настройки
            </a>
          </router-link>
        </li>
        <li
          class="
            menu__item
            menu__item_sub
          "
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
      </ul>
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
  data() {
    return {
      menuIsOpen: false,
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
  },
  methods: {
    logout() {
      this.$store.commit('updateLoggedInState', false);
      this.$store.commit('updateUserDataState', {});
    },
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
    onClickOutside() {
      this.menuIsOpen = false;
    },
  },
};
</script>