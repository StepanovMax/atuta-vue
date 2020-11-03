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
          {{ userData.name.label }}
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
        <ul
          class="
            menu
            user-menu-mobile__menu
          "
        >
          <li
            v-if="isLoggedIn"
            class="
              menu__item
              user-menu-mobile__menu-item
            "
          >
            <router-link
              :to="{ name: 'favorites' }"
              class="link"
              @click.native="clickOnLink()"
            >
              Избранное
            </router-link>
          </li>
          <li
            v-if="isLoggedIn"
            class="
              menu__item
              user-menu-mobile__menu-item
            "
          >
            <router-link
              :to="{
                name: 'myObjectsPage'
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
            class="
              menu__item
              user-menu-mobile__menu-item
            "
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
            class="
              menu__item
              user-menu-mobile__menu-item
            "
          >
            <router-link
              :to="{ name: 'messagesPage' }"
              class="link"
              @click.native="clickOnLink()"
            >
              Сообщения
            </router-link>
          </li>
          <li
            v-if="isLoggedIn"
            class="
              menu__item
              user-menu-mobile__menu-item
            "
          >
            <router-link
              :to="{ name: 'pocketPage' }"
              class="link"
              @click.native="clickOnLink()"
            >
              Кошелёк
            </router-link>
          </li>
          <li
            class="
              menu__item
              user-menu-mobile__menu-item
            "
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
            class="
              menu__item
              user-menu-mobile__menu-item
            "
          >
            <router-link
              :to="{
                name: 'profilePage'
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
            class="
              menu__item
              user-menu-mobile__menu-item
            "
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, store, commit } from 'vuex';

export default {
  name: 'userMenuMobile',
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
    logout() {
      this.$store.commit('updateLoggedInState', false);
      this.$store.commit('updateUserDataState', {});
      this.$root.$emit('closeMobileMenu');
    }
  },
};
</script>