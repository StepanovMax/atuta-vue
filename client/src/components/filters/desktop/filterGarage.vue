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
        rangeInputID="garageRangePriceDesktop"
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
        rangeInputID="garageRangeRentDesktop"
        rangeType="price"
        :value.sync="filterSelected.rent"
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
        Гараж или машиноместо?*
      </h3>
      <radioButtons
        radioButtonsView="default"
        radioButtonsId="objectViewDesktop"
        :items="filterDataDefaultClone.garage"
        :value.sync="filterSelected.type"
      />
    </div>

    <div
      v-if="
        filterDataSelected.garage.type
        && filterDataSelected.garage.type.slug == 'garage'
      "
      class="form__row"
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Тип гаража
      </h3>
      <checkboxes
        key="garageTypeDesktop"
        checkboxType="default"
        checkboxId="garageTypeDesktop"
        :items="filterDataDefaultClone.garageTypes"
        :value.sync="filterSelected.garageType"
      />
    </div>

    <div
      v-if="
        filterDataSelected.garage.type
        && filterDataSelected.garage.type.slug == 'parking'
      "
      class="form__row"
    >
      <h3 class="
        title
        title_h6
        form__title 
        form__title_filter-desktop
      ">
        Тип машиноместа
      </h3>
      <checkboxes
        key="parkingTypeDesktop"
        checkboxType="default"
        checkboxId="parkingTypeDesktop"
        :items="filterDataDefaultClone.parkingTypes"
        :value.sync="filterSelected.parkingType"
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
        Охрана
      </h3>
      <switcher
        switcherId="securityDesktop"
        :items="filterDataDefaultClone.security"
        :value.sync="filterSelected.security"
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
        Площадь
      </h3>
      <rangeSlider
        rangeSliderID="garageRangeAreaDesktop"
        rangeType="area"
        :rangeData="filterDataDefaultClone.garageRangeArea"
        :value.sync="filterSelected.area"
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
        this.updateFilterGarageState(this.filterSelected);
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
    updateFilterGarageState(data) {
      this.$store.commit('updateFilterGarageState', data);
    },
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
  created() {
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected.garage));
  },
};
</script>