<template>
  <div
    class="search-mobile"
    :class="[
      { 'search-mobile__hidden': !this.isFilterOpen }
    ]"
  >
    <div class="search-mobile__wrap">
      <input type="text">
      <button
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
      isFilterOpen: false
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