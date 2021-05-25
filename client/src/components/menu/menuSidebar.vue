<template>
  <ul
    class="
      menu
      user-menu-mobile__menu
    "
  >
    <li
      v-if="isLoggedIn"
      :class="menuItemClass"
    >
      <router-link
        :to="{ name: 'favoritesSubPage' }"
        class="link"
        @click.native="clickOnLink()"
      >
        Избранное
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      :class="menuItemClass"
    >
      <router-link
        :to="{
          name: 'myObjectsSubPage'
        }"
        class="
          link
          user-menu-mobile__menu-item-link
        "
        @click.native="clickOnLink()"
      >
        Мои объявления
      </router-link>
    </li>
    <li
      :class="menuItemClass"
    >
      <router-link
        :to="{
          name: 'companiesPage'
        }"
        class="
          link
          user-menu-mobile__menu-item-link
        "
        @click.native="clickOnLink()"
      >
        Компании
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      :class="menuItemClass"
    >
      <router-link
        :to="{ name: 'dialogsSubPage' }"
        class="link"
        @click.native="clickOnLink()"
      >
        Сообщения
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      :class="menuItemClass"
    >
      <router-link
        :to="{ name: 'pocketSubPage' }"
        class="link"
        @click.native="clickOnLink()"
      >
        Кошелёк
      </router-link>
    </li>
    <li
      :class="menuItemClass"
    >
      <router-link
        :to="{
          name: 'helpPage'
        }"
        class="
          link
          user-menu-mobile__menu-item-link
        "
        @click.native="clickOnLink()"
      >
        Помощь
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      :class="menuItemClass"
    >
      <router-link
        :to="{
          name: 'settingsSubPage'
        }"
        class="
          link
          user-menu-mobile__menu-item-link
        "
        @click.native="clickOnLink()"
      >
        Профиль
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      :class="menuItemClass"
    >
      <router-link
        :to="{
          name: 'changePasswordFromAccountPage'
        }"
        class="
          link
          user-menu-mobile__menu-item-link
        "
        @click.native="clickOnLink()"
      >
        Сменить пароль
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      :class="menuItemClass"
    >
      <router-link
        :to="{
          name: 'homePage'
        }"
        class="
          link
          user-menu-mobile__menu-item-link
        "
      >
        <a
          @click="logout"
        >
          Выйти
        </a>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'menuSidebar',
  data() {
    return {
      menuItemClass: 'menu__item user-menu-mobile__menu-item',
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
      'isUserMenuMobileOpen',
    ]),
  },
  methods: {
    closeUserMenuMobile() {
      this.$store.commit('closeMobileMenus');
    },
    clickOnLink() {
      this.closeUserMenuMobile();
    },
    async logout() {
      // e.preventDefault();
      this.$store.commit('updateLoggedInState', false);
      this.$store.commit('updateUserDataState', {});
      this.$root.$emit('closeMobileMenu');
      this.setCookie('isLoggedIn', false, {secure: true, 'max-age': 3600});
      await this.$store.dispatch('logout');
    }
  },
};
</script>