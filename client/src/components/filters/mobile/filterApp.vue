<template>
  <div class="form">

    <div
      class="form__row"
      v-if="
        filterDataSelected.deal
        && filterDataSelected.deal.slug == 'buy'
      "
    >
      <h3 class="title title_h6 form__title">
        Цена
      </h3>
      <rangeInput
        rangeInputID="appRangePrice"
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
      <h3 class="title title_h6 form__title">
        Аренда в месяц
      </h3>
      <rangeInput
        rangeInputID="appRangeRent"
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
      <h3 class="title title_h6 form__title">
        Срок аренды
      </h3>
      <checkboxes
        key="appRentType"
        checkboxId="appRentType"
        checkboxType="default"
        :items="filterDataDefaultClone.rentType"
        :value.sync="filterSelected.rentType"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Количество комнат
      </h3>
      <checkboxes
        key="appRoomsCount"
        checkboxId="appRoomsCount"
        checkboxType="roomsCount"
        :items="filterDataDefaultClone.appRooms"
        :value.sync="filterSelected.roomsCount"
      />
    </div>

    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Тип объекта
      </h3>
      <checkboxes
        key="appType"
        checkboxId="appType"
        :items="filterDataDefaultClone.appTypes"
        :value.sync="filterSelected.type"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Общая площадь
      </h3>
      <rangeInput
        rangeInputID="appRangeArea"
        rangeType="area"
        :value.sync="filterSelected.area"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Этаж
      </h3>
      <rangeInput
        rangeInputID="appRangeFloor"
        rangeType="floor"
        :value.sync="filterSelected.floor"
      />
      <checkboxes
        key="appFloorNot"
        checkboxId="appFloorNot"
        :items="filterDataDefaultClone.appFloorNot"
        :value.sync="filterSelected.floorNot"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Этажей всего
      </h3>
      <rangeInput
        rangeInputID="appRangeFloorAll"
        rangeType="floorAll"
        :value.sync="filterSelected.floorAll"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Вид дома
      </h3>
      <checkboxes
        key="appView"
        checkboxId="appView"
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