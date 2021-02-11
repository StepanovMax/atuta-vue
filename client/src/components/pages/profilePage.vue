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
        <div
          v-if="userData.logo"
          class="profile-page__logo-wrap"
        >
          <img
            :src="userData.logo[0].object.url"
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
            v-slot="{ navigate, href, isActive }"
            :to="{ name: 'settingsSubPage' }"
            @click.native="clickOnLink()"
          >
            <a
              :href="href"
              :active="isActive"
              class="
                link
                user-menu-mobile__menu-item-link
              "
              :class="{'link_active-menu': isActive}"
              @click="navigate"
            >
              Профиль
            </a>
          </router-link>
        </li>
        <li
          class="
            menu__item
            profile-page__menu-item
          "
        >
          <router-link
            v-slot="{ navigate, href, isActive }"
            :to="{ name: 'pocketSubPage' }"
            @click.native="clickOnLink()"
          >
            <a
              :href="href"
              :active="isActive"
              class="
                link
                user-menu-mobile__menu-item-link
              "
              :class="{'link_active-menu': isActive}"
              @click="navigate"
            >
              Кошелёк
            </a>
          </router-link>
        </li>
        <li
          class="
            menu__item
            profile-page__menu-item
          "
        >
          <router-link
            v-slot="{ navigate, href, isActive }"
            :to="{ name: 'favoritesSubPage' }"
            @click.native="clickOnLink()"
          >
            <a
              :href="href"
              :active="isActive"
              class="
                link
                user-menu-mobile__menu-item-link
              "
              :class="{'link_active-menu': isActive}"
              @click="navigate"
            >
              Избранное
            </a>
          </router-link>
        </li>
        <li
          class="
            menu__item
            profile-page__menu-item
          "
        >
          <router-link
            v-slot="{ navigate, href, isActive }"
            :to="{ name: 'dialogsSubPage' }"
            @click.native="clickOnLink()"
          >
            <a
              :href="href"
              :active="isActive"
              class="
                link
                user-menu-mobile__menu-item-link
              "
              :class="{'link_active-menu': isActive}"
              @click="navigate"
            >
              Сообщения
            </a>
          </router-link>
        </li>
        <li
          class="
            menu__item
            profile-page__menu-item
          "
        >
          <router-link
            v-slot="{ navigate, href, isActive }"
            :to="{ name: 'myObjectsSubPage' }"
            @click.native="clickOnLink()"
          >
            <a
              :href="href"
              :active="isActive"
              class="
                link
                user-menu-mobile__menu-item-link
              "
              :class="{'link_active-menu': isActive}"
              @click="navigate"
            >
              Мои объявления
            </a>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="template-page__wrap">

      <header class="template-page__header">

        <div class="template-page__header-top">

          <breadcrumbs
            :propPageName="pageName"
          />

        </div>

        <div class="template-page__header-bottom">

          <h1 class="template-page__title">
            Профиль
          </h1>

        </div>

      </header>

      <div class="template-page__content">

        <router-view />

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
  data() {
    return {
      pageName: '',
    }
  },
  watch: { 
    '$route': {
      handler: function(value) {
        this.checkPageName(value.name);
      },
      deep: true,
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
  },
  methods: {
    closeUserMenuMobile() {
      this.$store.commit('closeMobileMenus');
    },
    clickOnLink() {
      this.closeUserMenuMobile();
    },
    checkPageName(name) {
      if (name === 'dialogSubPageSingle') {
        this.pageName = 'dialogsSubPage';
      } else {
        this.pageName = '';
      }
    },
  },
  mounted() {
    this.checkPageName(this.$route.name);
  },
};
</script>