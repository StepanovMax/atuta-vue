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
    <div
      class="filter-mobile"
      :class="[
        { 'filter-mobile_open': this.isFilterOpen }
      ]"
    >
      <div
        class="filter-mobile__overlay"
        :class="[
          { 'filter-mobile__overlay_open': this.isFilterOpen }
        ]"
      >
      </div>
      <div
        class="filter-mobile__wrap"
        :class="[
          { 'filter-mobile__wrap_open': this.isFilterOpen }
        ]"
      >
        Фильтр
        <router-link
          :to="{ name: 'styleGuide' }"
          class="link"
          @click.native="closeFilterMobile"
        >
          Общий стиль
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import iconSettings from '../icons/iconSettings.vue'

export default {
  name: 'searchMobile',
  components: {
    iconSettings,
  },
  data() {
    return {
      isFilterOpen: false,
      isInputOnFocus: false,
    }
  },
  methods: {
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
      // this.$root.$emit('filterMobileToggle', this.isFilterOpen);
      // console.log('isFilterOpen emit');
    },
    closeFilterMobile() {
      console.log('closeFilterMobile emit');
      this.isFilterOpen = false;
    }
  }
};
</script>