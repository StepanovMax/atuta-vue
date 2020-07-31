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
        rangeInputID="roomRangeInputPriceMobile"
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
        rangeInputID="roomRangeRentMobile"
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
        checkboxId="roomRentTypeMobile"
        checkboxType="default"
        :items="filterDataDefaultClone.rentType"
        :value.sync="filterSelected.rentType"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Площадь комнаты
      </h3>
      <rangeInput
        rangeInputID="roomRangeAreaMobile"
        rangeType="area"
        :value.sync="filterSelected.area"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Количество комнат
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="roomRoomsCountMobile"
        :items="filterDataDefaultClone.roomRoomsCount"
        :value.sync="filterSelected.roomsCount"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Этаж
      </h3>
      <rangeInput
        rangeInputID="roomFloorRangeMobile"
        rangeType="floor"
        :value.sync="filterSelected.floor"
      />
      <checkboxes
        checkboxType="default"
        checkboxId="roomFloorNotMobile"
        :items="filterDataDefaultClone.roomFloorNot"
        :value.sync="filterSelected.floorNot"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Этажей в доме
      </h3>
      <rangeInput
        rangeInputID="roomRangeFloorAllMobile"
        rangeType="floorAll"
        :value.sync="filterSelected.floorAll"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Тип дома
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="roomTypeMobile"
        :items="filterDataDefaultClone.appView"
        :value.sync="filterSelected.type"
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
  name: 'filterRoom',
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
        this.updateFilterRoomState(this.filterSelected);
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
    updateFilterRoomState(data) {
      this.$store.commit('updateFilterRoomState', data);
    },
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
  created() {
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected.room));
  },
};
</script>