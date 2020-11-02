<template>
  <div
    class="filter-mobile"
    :class="[
      { 'filter-mobile_open': this.isFilterOpen }
    ]"
  >
    <div
      class="filter-mobile__overlay"
      :class="[
        { 'filter-mobile__overlay_open': this.isFilterOpen }
      ]"
    >
    </div>
    <div
      class="filter-mobile__wrap"
      :class="[
        { 'filter-mobile__wrap_open': this.isFilterOpen }
      ]"
    >
      <div class="filter-mobile__content">

        <div class="form">
          <div class="form__row">
            <h3 class="title title_h6 form__title">
              Город*
            </h3>
            <multiselect
              v-model="townsList"
              :options="federalRegionsAlphabetical"
              :show-labels="false"
              :allow-empty="false"
              :close-on-select="true"
              :multiple="false"
              :searchable="true"
              label="label"
              track-by="label"
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
              :disabled="isDistrictsDisabled"
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
              switcherId="dealMobile"
              :items="filterDataDefaultClone.deal"
              :value.sync="filterSelected.deal"
            />
          </div>

          <div class="form__row">
            <h3 class="title title_h6 form__title">
              Тип объекта*
            </h3>
            <multiselect
              v-model="filterSelected.object"
              :options="filterDataDefaultClone.object"
              :show-labels="false"
              :allow-empty="false"
              :close-on-select="true"
              :multiple="false"
              :searchable="true"
              label="label"
              track-by="label"
              placeholder="Тип объекта"
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
    </div>
  </div>
</template>

<script>
import filterApp from './mobile/filterApp.vue';
import filterRoom from './mobile/filterRoom.vue';
import filterHouse from './mobile/filterHouse.vue';
import filterGarage from './mobile/filterGarage.vue';
import filterSector from './mobile/filterSector.vue';
import filterCommercial from './mobile/filterCommercial.vue';
import switcher from '../common/switcher.vue';
import rangeMobile from '../common/rangeMobile.vue'
import radioButtons from '../common/radioButtons.vue';
import multiselect from 'vue-multiselect';
import { mapState, mapGetters, store, commit } from 'vuex';

export default {
  name: 'filterMobile',
  components: {
    switcher,
    filterApp,
    filterRoom,
    filterHouse,
    filterGarage,
    filterSector,
    filterCommercial,
    rangeMobile,
    multiselect,
    radioButtons,
  },
  data() {
    return {
      filterSelected: {},
      filterDataSelectedClone: {},
      townsList: null,
      isDistrictsDisabled: true,
    }
  },
  watch: {
    filterSelected: {
      handler() {
        this.updateFilterState(this.filterSelected);
      },
      deep: true
    },
    townsList: {
      handler(value) {
        this.filterSelected.town = value;
        this.filterDataDefaultClone.district = value.districts;
        this.isDistrictsDisabled = false;
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'isFilterOpen',
      'filterDataDefault',
      'filterDataSelected',
      'federalRegionsAlphabetical',
    ]),
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
  },
};
</script>