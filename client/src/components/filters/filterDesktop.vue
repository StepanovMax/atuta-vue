<template>
  <div
    class="filter-desktop"
  >
    <filterMain />

    <div class="filter-desktop__buttons-block">
      <button
        class="btn filter-desktop__btn btn_blue btn_mini"
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
import { mapState } from 'vuex';

export default {
  name: 'filterDesktop',
  components: {
    filterMain,
  },
  computed: {
    ...mapState([
      'filterData',
      'isFilterOpen',
    ]),
  },
};
</script>