<template>
  <div class="filter-desktop">

    <div class="form">
      <div class="form__row">
        <h3 class="
          title
          title_h6
          form__title 
          form__title_filter-desktop
        ">
          Тип сделки*
        </h3>
        <switcher
          switcherId="dealDesktop"
          :items="filterDataDefaultClone.deal"
          :value.sync="filterSelected.deal"
        />
      </div>

      <div class="form__row">
        <h3 class="
          title
          title_h6
          form__title 
          form__title_filter-desktop
        ">
          Тип объекта*
        </h3>
        <radioButtons
          radioButtonsView="default"
          radioButtonsId="objectType"
          :items="filterDataDefaultClone.object"
          :value.sync="filterSelected.object"
        />
      </div>
    </div>

    <filterApp
      v-if="
        filterDataSelected.town
        && filterDataSelected.deal
        && filterDataSelected.object
        && filterDataSelected.object.slug === 'app'
      "
    />

    <filterHouse
      v-if="
        filterDataSelected.town
        && filterDataSelected.deal
        && filterDataSelected.object
        && filterDataSelected.object.slug === 'house'
      "
    />

    <filterRoom
      v-if="
        filterDataSelected.town
        && filterDataSelected.deal
        && filterDataSelected.object
        && filterDataSelected.object.slug === 'room'
      "
    />

    <filterGarage
      v-if="
        filterDataSelected.town
        && filterDataSelected.deal
        && filterDataSelected.object
        && filterDataSelected.object.slug === 'garage'
      "
    />

    <filterSector
      v-if="
        filterDataSelected.town
        && filterDataSelected.deal
        && filterDataSelected.object
        && filterDataSelected.object.slug === 'sector'
      "
    />

    <filterCommercial
      v-if="
        filterDataSelected.town
        && filterDataSelected.deal
        && filterDataSelected.object
        && filterDataSelected.object.slug === 'commercial'
      "
    />

  </div>
</template>

<script>
import filterApp from './desktop/filterApp.vue';
import filterHouse from './desktop/filterHouse.vue';
import filterRoom from './desktop/filterRoom.vue';
import filterGarage from './desktop/filterGarage.vue';
import filterSector from './desktop/filterSector.vue';
import filterCommercial from './desktop/filterCommercial.vue';
import rangeSlider from '../common/rangeSlider.vue';
import rangeInput from '../common/rangeInput.vue';
import multiselect from 'vue-multiselect';
import radioButtons from '../common/radioButtons.vue';
import switcher from '../common/switcher.vue';
import { mapState, store, commit } from 'vuex';

export default {
  name: 'filterDesktop',
  components: {
    filterApp,
    filterHouse,
    filterRoom,
    filterGarage,
    filterSector,
    filterCommercial,
    rangeInput,
    rangeSlider,
    radioButtons,
    switcher,
    multiselect,
  },
  data() {
    return {
      filterSelected: {},
      filterDataSelectedClone: {},
    }
  },
  watch: {
    filterSelected: {
      handler() {
        this.updateFilterState(this.filterSelected);
      },
      deep: true
    },
    filterDataSelected: {
      handler() {
        this.filterSelected = this.filterDataSelected;
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'isFilterOpen',
      'filterDataDefault',
      'filterDataSelected',
    ]),
    atLeastOneFormItemIsFilled() {
      const value = true;
      return value;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
  },
  created() {
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected));
  },
  methods: {
    updateFilterState(data) {
      this.$store.commit('updateFilterState', data);
    },
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
  mounted() {
    // console.log('filterDataDefaultClone', this.filterDataDefaultClone);
    // console.log('filterDataSelectedClone', this.filterDataSelectedClone);
    // console.log('filterDataSelected', this.filterDataSelected);
  },
};
</script>