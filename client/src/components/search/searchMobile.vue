<template>
  <div
    class="search-mobile"
    :class="[
      { 'search-mobile_hidden': !this.isFilterOpen }
    ]"
  >
    <div class="search-mobile__wrap">
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
    <filterMobile />
  </div>
</template>

<script>
import iconSettings from '../icons/iconSettings.vue'
import filterMobile from '../filters/filterMobile.vue'
import { mapState, store, commit } from 'vuex';

export default {
  name: 'searchMobile',
  components: {
    iconSettings,
    filterMobile,
  },
  data() {
    return {
      isInputOnFocus: false,
    }
  },
  methods: {
    toggleFilter() {
      this.$store.commit('switchFilter', !this.isFilterOpen);
    },
    closeFilterMobile() {
      this.$store.commit('switchFilter', false);
    }
  },
  computed: {
    ...mapState([
      'isFilterOpen',
    ]),
  },
};
</script>