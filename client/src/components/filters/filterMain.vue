<template>
  <div class="filter-main">
    <div class="form">

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Город*
        </h3>
        <multiselect
          v-model="filterDataClone.town"
          :options="townsList"
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
          Тип сделки*
        </h3>
        <multiselect
          v-model="filterDataClone.deal"
          :options="buyItems"
          :show-labels="false"
          :allow-empty="false"
          :close-on-select="true"
          :multiple="false"
          label="label"
          track-by="label"
          placeholder="Купить или аренда? *"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Тип объекта*
        </h3>
        <multiselect
          v-model="filterDataClone.object"
          :options="objectTypes"
          :show-labels="false"
          :allow-empty="false"
          :close-on-select="true"
          :multiple="false"
          label="label"
          track-by="label"
          placeholder="Какой тип объекта? *"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Район
        </h3>
        <multiselect
          v-model="filterDataClone.district"
          :options="districtsList"
          :show-labels="false"
          :allow-empty="true"
          :close-on-select="false"
          :multiple="true"
          :searchable="false"
          label="label"
          track-by="label"
          placeholder="Выберите район"
        />
      </div>
    </div>

    <filterApp
      v-if="
        isTownSelected
        && buyRentValue
        && objectTypeValue
        && objectTypeValue.slug == 'app'
      "
    />

    <filterHouse
      v-if="
        isTownSelected
        && buyRentValue
        && objectTypeValue
        && objectTypeValue.slug == 'house'
      "
    />

    <filterRoom
      v-if="
        isTownSelected
        && buyRentValue
        && objectTypeValue
        && objectTypeValue.slug == 'room'
      "
    />

    <filterGarage
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug == 'garageOrParking'
      "
    />

    <filterArea
      v-if="
        isTownSelected
        && buyRentValue
        && objectTypeValue
        && objectTypeValue.slug == 'area'
      "
    />

    <filterCommercial
      v-if="
        isTownSelected
        && buyRentValue
        && objectTypeValue
        && objectTypeValue.slug == 'commercial'
      "
    />

    <div class="form">

      <div
        class="form__row"
        v-if="buyRentValue && buyRentValue.slug == 'buy'"
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <range
          rangeType="price"
          :rangeData.sync="priceRangeValue"
        />
      </div>

      <div
        class="form__row"
        v-if="buyRentValue && buyRentValue.slug == 'rent'"
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <range
          rangeType="price"
          :rangeData.sync="priceRangeValue"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Продавцы
        </h3>
        <multiselect
          v-model="filterDataClone.seller"
          :options="sellersList"
          :show-labels="false"
          :allow-empty="true"
          :close-on-select="true"
          :multiple="true"
          :searchable="false"
          label="label"
          track-by="label"
          placeholder="Выберите продавца"
        />
      </div>

    </div>

  </div>
</template>

<script>
import range from '../common/range.vue'
import multiselect from 'vue-multiselect';
import filterApp from './common/filterApp.vue';
import filterHouse from './common/filterHouse.vue';
import filterRoom from './common/filterRoom.vue';
import filterGarage from './common/filterGarage.vue';
import filterArea from './common/filterArea.vue';
import filterCommercial from './common/filterCommercial.vue';
import { mapState } from 'vuex';

export default {
  name: 'filterMobile',
  components: {
    range,
    multiselect,
    filterApp,
    filterHouse,
    filterRoom,
    filterGarage,
    filterArea,
    filterCommercial,
  },
  data() {
    return {
      filterDataClone: {},
      sellersList: [
        {
          slug: 'personal',
          label: 'Собственник',
        },
        {
          slug: 'agency',
          label: 'Агентство',
        },
        {
          slug: 'builder',
          label: 'Застройщик',
        },
      ],
      townsList: [
        {
          slug: 'taganrog',
          label: 'Таганрог',
        },
        {
          slug: 'rostov-on-don',
          label: 'Ростов-на-Дону',
        },
      ],
      districtsList: [
        {
          slug: 'yuzhny',
          label: 'Южный',
        },
        {
          slug: 'center',
          label: 'Центр',
        },
        {
          slug: 'zapadny',
          label: 'Западный',
        },
        {
          slug: 'severo-zapadny',
          label: 'Северо-западный',
        },
        {
          slug: 'severny',
          label: 'Северный',
        },
        {
          slug: 'vostochny',
          label: 'Востоный',
        },
        {
          slug: 'suburb',
          label: 'Пригород',
        },
      ],
      buyItems: [
        {
          slug: 'buy',
          label: 'Купить',
        },
        {
          slug: 'rent',
          label: 'Аренда',
        },
      ],
      objectTypes: [
        {
          slug: 'app',
          label: 'Квартира',
        },
        {
          slug: 'house',
          label: 'Дом',
        },
        {
          slug: 'room',
          label: 'Комната',
        },
        {
          slug: 'garageOrParking',
          label: 'Гараж / Машиноместо',
        },
        {
          slug: 'area',
          label: 'Участок',
        },
        {
          slug: 'commercial',
          label: 'Коммерческая недвижимость',
        },
      ],
    }
  },
  watch: {
    filterDataClone: {
      handler() {
        this.updateFilterState(this.filterDataClone);
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'filterData',
      'isFilterOpen',
    ]),
    isTownSelected() {
      return this.filterData.town;
    },
  },
  created() {
    this.filterDataClone = JSON.parse(JSON.stringify(this.filterData));
  },
  methods: {
    updateFilterState(data) {
      this.$store.commit('updateFilterState', data);
      console.log('updateFilterState :: >', this.filterData);
    },
  },
};
</script>