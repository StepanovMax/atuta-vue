<template>
  <div
    class="filter-desktop"
  >
    <filterMain />

    <div class="filter-desktop__buttons-block">
      <button
        class="btn filter-desktop__btn btn_blue btn_mini"
        @click="resetFilter()"
      >
        Сбросить
      </button>

      <button
        class="btn filter-desktop__btn btn_blue btn_mini"
        :class="[
          {
            'btn_disabled': !this.requiredFormItemsIsFilled
          }
        ]"
      >
        Фильтровать
      </button>
    </div>
  </div>
</template>

<script>
import filterMain from './filterMain.vue';
import { mapState, store, commit } from 'vuex';

export default {
  name: 'filterDesktop',
  components: {
    filterMain,
  },
  methods: {
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
  computed: {
    ...mapState([
      'filterData',
      'isFilterOpen',
    ]),
    requiredFormItemsIsFilled() {
      let value;
      if (this.buyRentValue && this.objectTypeValue) {
        if (this.objectTypeValue.slug === 'garageOrParking') {
          if (this.filterData.garageOrParkingData.isGarageOrParking) {
            value = true;
          } else {
            value = false;
          }
        }
      }
      return value;
    },
  },
  mounted() {
  //   const obj = this.filterData;
  //   Object.keys(obj).forEach(function(key1) {
  //     key1 = null;
  //     if (obj[key1]) {
  //       Object.keys(obj[key]).forEach(function(key2) {
  //         key2 = null;
  //       });
  //     }
  //   });
  //   console.log('::', this.filterData);
  },
};
</script>