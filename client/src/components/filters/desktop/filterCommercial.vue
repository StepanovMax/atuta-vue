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
        rangeInputID="commercialRangeInputPriceDesktop"
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
        rangeInputID="commercialRangeRentDesktop"
        rangeType="price"
        :value.sync="filterSelected.rent"
      />
      <radioButtons
        radioButtonsView="floatRight"
        radioButtonsId="commercialRentTypeDesktop"
        :items="filterDataDefaultClone.commercialRentType"
        :value.sync="filterSelected.rentType"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Класс здания
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="commercialClassDesktop"
        :items="filterDataDefaultClone.commercialClass"
        :value.sync="filterSelected.class"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Вид объекта
      </h3>
      <checkboxes
        checkboxType="default"
        checkboxId="commercialViewDesktop"
        :items="filterDataDefaultClone.commercialView"
        :value.sync="filterSelected.view"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Площадь
      </h3>
      <rangeSlider
        rangeSliderID="commercialRangeAreaDesktop"
        rangeType="area"
        :rangeData="filterDataDefaultClone.commercialRangeArea"
        :value.sync="filterSelected.area"
      />
    </div>

    <div
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Расстояние до города
      </h3>
      <rangeSlider
        rangeSliderID="commercialDistanceDesktop"
        rangeType="distance"
        :rangeData="filterDataDefaultClone.commercialDistance"
        :value.sync="filterSelected.distance"
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
import switcher from '../../common/switcher.vue';
import radioButtons from '../../common/radioButtons.vue';

export default {
  name: 'filterApp',
  components: {
    switcher,
    rangeInput,
    checkboxes,
    radioButtons,
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
        this.updateFilterCommercialState(this.filterSelected);
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
    updateFilterCommercialState(data) {
      this.$store.commit('updateFilterCommercialState', data);
    },
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
  created() {
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected.commercial));
  },
};
</script>