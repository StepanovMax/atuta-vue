<template>
  <div
    :class="classValue"
  >
    <div
      v-if="isHomePage"
      class="filter"
    >
      <filterDesktop />
    </div>

    <adsLeft
      v-if="isSdaLeftShowing"
    />

    <div
      v-if="isProfilePage"
      class="profile-page__nav"
    >

      <div class="profile-page__user">
        <div
          v-if="userData.logo"
          class="profile-page__logo-wrap"
        >
          <img
            :src="hostFront + userData.logo"
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
        <li
          class="
            menu__item
            profile-page__menu-item
          "
        >
          <a
            href=""
            @click="logout"
            class="
              link
              user-menu-mobile__menu-item-link
            "
          >
            Выйти
          </a>
        </li>
      </ul>

    </div>

    <slot></slot>

    <adsRight />

  </div>
</template>

<script>
import adsLeft from '@cmp/adsLeft.vue';
import adsRight from '@cmp/adsRight.vue';
import filterDesktop from '@cmp/filters/filterDesktop.vue';

import { mapState } from 'vuex';

export default {
  name: 'dsaWrap',
  components: {
    adsLeft,
    adsRight,
    filterDesktop,
  },
  data() {
    return {
      // duckduckgo: duckduckgo,
      // sda_horizontal: sda_horizontal,
      // hostFront: process.env.host_front,
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
    isHomePage() {
      let booleanValue;
      if (this.$route.name === 'homePage') {
        booleanValue = true;
      } else {
        booleanValue = false;
      }
      return booleanValue;
    },
    isProfilePage() {
      let booleanValue;
      if (
        this.isLoggedIn
        && this.userData
        && !this.isSdaLeftShowing
        && (
          this.$route.matched
          && this.$route.matched[0]
          && this.$route.matched[0].name === 'profilePage'
        )
      ) {
        booleanValue = true;
      } else {
        booleanValue = false;
      }
      return booleanValue;
    },
    isSdaLeftShowing() {
      let booleanValue;
      if (
        this.$route.name === 'objectPage'
        || this.$route.name === 'homePage'
      ) {
        booleanValue = false;
      } else {
        booleanValue = true;
      }
      return booleanValue;
    },
    classValue() {
      let classValue = 'template-page';
      if (this.$route.name === 'objectPage') {
        classValue = 'object-page';
      } else if (this.$route.name === 'myObjectsSubPage') {
        classValue = 'template-page profile-page';
      } else if (this.$route.name === 'homePage') {
        classValue = 'main';
      }
      return classValue;
    },
  },
  methods: {
    async logout(e) {
      this.$router.push({
        name: 'homePage'
      });
      e.preventDefault();
      this.$store.commit('updateLoggedInState', false);
      this.$store.commit('updateUserDataState', null);
      await this.$store.dispatch('logout');
    },
    closeUserMenuMobile() {
      this.$store.commit('closeMobileMenus');
    },
    clickOnLink() {
      this.closeUserMenuMobile();
    },
  },
  mounted() {
    // console.log('this.$route ::', this.$route);
  },
};
</script>