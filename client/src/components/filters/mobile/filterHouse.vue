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
        rangeInputID="houseRangeInputPriceMobile"
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
        rangeInputID="houseRangeRentMobile"
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
        checkboxId="houseRentTypeMobile"
        checkboxType="default"
        :items="filterDataDefaultClone.rentType"
        :value.sync="filterSelected.rentType"
      />
    </div>

    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Количество комнат
      </h3>
      <checkboxes
        checkboxId="houseRoomsCountMobile"
        checkboxType="checkboxButtons"
        :items="filterDataDefaultClone.houseRoomsCount"
        :value.sync="filterSelected.roomsCount"
      />
    </div>

    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Тип объекта
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="houseTypeMobile"
        :items="filterDataDefaultClone.houseTypes"
        :value.sync="filterSelected.type"
      />
    </div>

    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Вид объекта
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="houseViewMobile"
        :items="filterDataDefaultClone.appTypes"
        :value.sync="filterSelected.view"
      />
    </div>

    <div
      v-if="false"
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Дом за городом?
      </h3>
      <checkbox
        key="intoCity"
        checkboxId="intoCityMobile"
        :item="filterDataDefaultClone.intoCityType"
        :value.sync="filterSelected.isIntoCity"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Расстояние до города
      </h3>
      <rangeInput
        rangeInputID="houseDistanceMobile"
        rangeType="distance"
        :value.sync="filterSelected.distance"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Площадь дома
      </h3>
      <rangeInput
        rangeInputID="houseAreaHouseMobile"
        rangeType="area"
        :value.sync="filterSelected.areaHouse"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Площадь участка
      </h3>
      <rangeInput
        rangeInputID="houseAreaLandMobile"
        rangeType="area"
        :value.sync="filterSelected.areaLand"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Этажей в доме
      </h3>
      <rangeInput
        rangeInputID="houseFloorAllMobile"
        rangeType="floorAll"
        :value.sync="filterSelected.floorAll"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Материал стен
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="houseWallMobile"
        :items="filterDataDefaultClone.houseWall"
        :value.sync="filterSelected.wall"
      />
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import multiselect from 'vue-multiselect'
import rangeInput from '../../common/rangeInput.vue';
import checkboxes from '../../common/checkboxes.vue';

export default {
  name: 'filterApp',
  components: {
    rangeInput,
    checkboxes,
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
        this.updateFilterHouseState(this.filterSelected);
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
    updateFilterHouseState(data) {
      this.$store.commit('updateFilterHouseState', data);
    },
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
  created() {
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected.house));
  },
};
</script>