<template>
  <div class="form">

    <div
      class="form__row"
      v-if="
        filterDataSelected.deal
        && filterDataSelected.deal.slug == 'buy'
      "
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Цена
      </h3>
      <rangeInput
        rangeInputID="appRangePriceDesktop"
        rangeType="price"
        :value.sync="filterSelected.price"
      />
    </div>

    <div
      class="form__row"
      v-if="
        filterDataSelected.deal
        && filterDataSelected.deal.slug == 'rent'
      "
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Аренда в месяц
      </h3>
      <rangeInput
        rangeInputID="appRangeRentDesktop"
        rangeType="price"
        :value.sync="filterSelected.rent"
      />
    </div>

    <div
      class="form__row"
      v-if="
        filterDataSelected.deal
        && filterDataSelected.deal.slug == 'rent'
      "
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Срок аренды
      </h3>
      <checkboxes
        checkboxId="appRentTypeDesktop"
        checkboxType="default"
        :items="filterDataDefaultClone.rentType"
        :value.sync="filterSelected.rentType"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Количество комнат
      </h3>
      <checkboxes
        checkboxId="appRoomsCountDesktop"
        checkboxType="roomsCount"
        :items="filterDataDefaultClone.appRooms"
        :value.sync="filterSelected.roomsCount"
      />
    </div>

    <div class="form__row">
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Тип объекта
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="appTypeDesktop"
        :items="filterDataDefaultClone.appTypes"
        :value.sync="filterSelected.type"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Общая площадь
      </h3>
      <rangeSlider
        rangeSliderID="appRangeAreaDesktop"
        rangeType="area"
        :rangeData="filterDataDefaultClone.appRangeArea"
        :value.sync="filterSelected.area"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Этаж
      </h3>
      <rangeSlider
        rangeSliderID="appFloorDesktop"
        rangeType="none"
        :rangeData="filterDataDefaultClone.appFloor"
        :value.sync="filterSelected.floor"
      />
      <checkboxes
        checkboxType="default"
        checkboxId="appFloorNotDesktop"
        :items="filterDataDefaultClone.appFloorNot"
        :value.sync="filterSelected.floorNot"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Этажей всего
      </h3>
      <rangeSlider
        rangeSliderID="appFloorAllDesktop"
        rangeType="none"
        :rangeData="filterDataDefaultClone.appFloorAll"
        :value.sync="filterSelected.floorAll"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Вид дома
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="appViewDesktop"
        :items="filterDataDefaultClone.appView"
        :value.sync="filterSelected.view"
      />
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import multiselect from 'vue-multiselect'
import rangeInput from '../../common/rangeInput.vue';
import checkboxes from '../../common/checkboxes.vue';
import rangeSlider from '../../common/rangeSlider.vue';

export default {
  name: 'filterApp',
  components: {
    rangeInput,
    checkboxes,
    rangeSlider,
    multiselect,
  },
  data() {
    return {
      filterSelected: {},
    }
  },
  watch: {
    filterSelected: {
      handler() {
        this.updateFilterAppState(this.filterSelected);
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'filterDataDefault',
      'filterDataSelected',
    ]),
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
  },
  methods: {
    updateFilterAppState(data) {
      this.$store.commit('updateFilterAppState', data);
    },
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
  created() {
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected.app));
  },
};
</script>