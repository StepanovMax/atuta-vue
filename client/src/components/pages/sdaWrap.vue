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

    <dsaLeft
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

      <menuSidebar />

    </div>

    <slot></slot>

    <dsaRight />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import sdaLeft from '@cmp/sdaLeft.vue';
import sdaRight from '@cmp/sdaRight.vue';
import filterDesktop from '@cmp/filters/filterDesktop.vue';
import menuSidebar from '@cmp/menu/menuSidebar.vue';

export default {
  name: 'sdaWrap',
  data() {
    return {
      hostFront: process.env.host_front,
    }
  },
  components: {
    sdaLeft,
    sdaRight,
    filterDesktop,
    menuSidebar,
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
        && Boolean(this.userData)
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
        || (
          this.$route.matched
          && this.$route.matched[0]
          && (
            this.$route.matched[0].name === 'profilePage'
            && this.isLoggedIn
          )
        )
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
  },
  mounted() {
    // console.log('this.$route ::', this.$route);
  },
};
</script>