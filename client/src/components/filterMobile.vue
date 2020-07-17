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
      123
    </div>
  </div>
</template>

<script>

export default {
  name: 'filterMobile',
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