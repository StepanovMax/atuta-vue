<template>
  <div
    id="profilePage"
    class="
      template-page
      profile-page
    "
  >

    <div
      v-if="isLoggedIn && userData"
      class="profile-page__nav"
    >
      <div class="profile-page__user">
        <div class="profile-page__logo-wrap">
          <img
            :src="userData.urlPreview"
            :alt="userData.name.label"
            class="profile-page__logo-img"
          />
        </div>

        <p class="profile-page__user-name">
          {{ userData.name.label }}
        </p>
      </div>

      <ul
        class="
          menu
          profile-page__menu
        "
      >
        <li
          class="
            menu__item
            profile-page__menu-item
          "
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
          class="
            menu__item
            profile-page__menu-item
          "
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
          class="
            menu__item
            profile-page__menu-item
          "
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
          class="
            menu__item
            profile-page__menu-item
          "
        >
          <router-link
            :to="{ name: 'messagesSubPage' }"
            class="link"
            @click.native="clickOnLink()"
          >
            Сообщения
          </router-link>
        </li>
        <li
          class="
            menu__item
            profile-page__menu-item
          "
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
      </ul>
    </div>

    <div class="template-page__wrap">

      <header class="template-page__header">

        <div class="template-page__header-top">

          <breadcrumbs />

        </div>

        <div class="template-page__header-bottom">

          <h1 class="template-page__title">
            Профиль
          </h1>

        </div>

      </header>

      <div class="template-page__content">

        <router-view
          :key="$route.fullPath"
        />

      </div>

    </div>

    <adsRight />

  </div>
</template>

<script>
import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import breadcrumbs from '../common/breadcrumbs.vue';
import filterDesktop from '../filters/filterDesktop.vue';

import { mapState } from 'vuex';

export default {
  name: 'profilePage',
  components: {
    adsLeft,
    adsRight,
    breadcrumbs,
    filterDesktop,
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
  },
  created() {
    
  },
  methods: {
    closeUserMenuMobile() {
      this.$store.commit('closeMobileMenus');
    },
    clickOnLink() {
      this.closeUserMenuMobile();
    },
  },
};
</script>