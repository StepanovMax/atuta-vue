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
        <p class="user-menu-mobile__user-name">
          Агентство недвижимости №1
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
            class="
              menu__item
              user-menu-mobile__menu-item
            "
          >
            <router-link
              :to="{ name: 'favorites' }"
              class="link"
            >
              Избранное
            </router-link>
          </li>
          <li
            class="
              menu__item
              user-menu-mobile__menu-item
            "
          >
            Мои объявления
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
              @click="clickOnLink()"
            >
              Компании
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
              @click="clickOnLink()"
            >
              Помощь
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, store, commit } from 'vuex';

export default {
  name: 'userMenuMobile',
  computed: {
    ...mapState([
      'isUserMenuMobileOpen',
    ]),
  },
  methods: {
    closeUserMenuMobile() {
      this.$store.commit('switchUserMenuMobile', false);
    },
    clickOnLink() {
      this.closeUserMenuMobile();
    }
  },
};
</script>