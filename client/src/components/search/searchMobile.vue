<template>
  <div
    class="search-mobile"
    :class="[
      { 'search-mobile_hidden': !this.isFilterOpen }
    ]"
  >
    <div class="search-mobile__wrap">

      <button
        class="
          btn
          btn_hamburger
        "
        @click="toggleUserMenuMobile()"
      >
        <iconHamburger
          :propColor="isUserMenuMobileOpen ? 'white' : ''"
        />
      </button>

      <input 
        type="text"
        class="search-mobile__input"
        :class="[
          { 'search-mobile__input_hidden': this.isFilterOpen }
        ]"
        placeholder="Поиск в Таганроге"
        @focus="isInputOnFocus = true"
        @blur="isInputOnFocus = false"
      >

      <button
        v-if="this.isInputOnFocus"
        class="btn btn_blue btn_mini search-mobile__btn"
      >
        Искать
      </button>

      <button
        v-if="!this.isInputOnFocus"
        class="btn btn_settings"
        @click="toggleFilter()"
      >
        <iconSettings />
      </button>

    </div>

    <userMenuMobile />

    <filterMobile />

  </div>
</template>

<script>
import iconSettings from '../icons/iconSettings.vue'
import iconHamburger from '../icons/iconHamburger.vue'
import filterMobile from '../filters/filterMobile.vue'
import userMenuMobile from '../userMenuMobile.vue'
import { mapState, store, commit } from 'vuex';

export default {
  name: 'searchMobile',
  components: {
    iconSettings,
    iconHamburger,
    filterMobile,
    userMenuMobile,
  },
  data() {
    return {
      isInputOnFocus: false,
      isUserMenuOpen: false,
    }
  },
  methods: {
    toggleUserMenuMobile() {
      this.$store.commit('switchUserMenuMobile', !this.isUserMenuMobileOpen);
      if (this.isFilterOpen) {
        this.closeFilterMobile();
      }
    },
    closeUserMenuMobile() {
      this.$store.commit('switchUserMenuMobile', false);
    },
    toggleFilter() {
      this.$store.commit('switchFilter', !this.isFilterOpen);
      if (this.isUserMenuMobileOpen) {
        this.closeUserMenuMobile();
      }
    },
    closeFilterMobile() {
      this.$store.commit('switchFilter', false);
    },
  },
  computed: {
    ...mapState([
      'isFilterOpen',
      'isUserMenuMobileOpen',
    ]),
  },
};
</script>