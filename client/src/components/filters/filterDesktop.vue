<template>
  <div class="filter-desktop">

    <div class="form">
      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Город*
        </h3>
        <multiselect
          v-model="filterSelected.town"
          :options="filterDataDefaultClone.town"
          :show-labels="false"
          :allow-empty="false"
          :close-on-select="true"
          :multiple="false"
          :searchable="true"
          label="city"
          track-by="city"
          placeholder="Выберите город"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Район
        </h3>
        <multiselect
          v-model="filterSelected.district"
          :options="filterDataDefaultClone.district"
          :show-labels="false"
          :allow-empty="true"
          :close-on-select="true"
          :multiple="true"
          :searchable="false"
          label="label"
          track-by="label"
          placeholder="Выберите район"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Тип сделки*
        </h3>
        <switcher
          switcherId="dealDesktop"
          :items="filterDataDefaultClone.deal"
          :value.sync="filterSelected.deal"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
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
import checkbox from '../common/checkbox.vue';
import checkboxes from '../common/checkboxes.vue';
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
    checkbox,
    checkboxes,
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