<template>
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
</template>

<script>

export default {
  name: 'filterMobile',
  props: {
    isFilterOpen: {
      default: false,
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      isFilterOpen: false
    }
  },
  mounted() {
    this.$root.$on('filterMobileToggle', isFilterOpenBoolean => {
      console.log('filterMobileToggle catched!');
      this.isFilterOpen = isFilterOpenBoolean;
    })
  },
};
</script>