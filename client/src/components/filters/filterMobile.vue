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
              v-model="filterSelected.town"
              :options="filterDataDefaultClone.town"
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
              switcherId="deal"
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

      </div>
    </div>
  </div>
</template>

<script>
import filterApp from './mobile/filterApp.vue';
import switcher from '../common/switcher.vue';
import rangeMobile from '../common/rangeMobile.vue'
import radioButtons from '../common/radioButtons.vue';
import multiselect from 'vue-multiselect';
import { mapState, store, commit } from 'vuex';

export default {
  name: 'filterMobile',
  components: {
    switcher,
    filterApp,
    rangeMobile,
    multiselect,
    radioButtons,
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
        console.log('watch mobile filterSelected', this.filterSelected);
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