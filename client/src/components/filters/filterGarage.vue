<template>
  <div class="form">
    <div class="form__row">
      <multiselect
        v-model="isGarageOrParking"
        :options="garageParkingTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        label="label"
        track-by="label"
        placeholder="Гараж или машиноместо? *"
      />
    </div>
    <div
      v-if="
        garageParkingValue
        && garageParkingValue.slug === 'garage'
      "
      class="form__row"
    >
      <multiselect
        v-model="whatKindOfGarageType"
        :options="garageTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="true"
        label="label"
        track-by="label"
        placeholder="Какой тип гаража?"
      />
    </div>
    <div
      v-if="
        garageParkingValue
        && garageParkingValue.slug === 'parking'
      "
      class="form__row"
    >
      <multiselect
        v-model="whatKindOfParkingType"
        :options="parkingTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="true"
        label="label"
        track-by="label"
        placeholder="Какой тип тип машиноместа?"
      />
    </div>
    <div class="form__row">
      <multiselect
        v-model="isSecurity"
        :options="securityTypes"
        :show-labels="false"
        :allow-empty="true"
        :close-on-select="true"
        :multiple="false"
        label="label"
        track-by="label"
        placeholder="Нужна охрана?"
      />
    </div>
    <div class="form__row">
      <range
        rangeType="area"
        :rangeData.sync="areaRangeValue"
      />
    </div>
    <div class="form__row">
      <range
        rangeType="price"
        :rangeData.sync="priceRangeValue"
      />
    </div>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect'
import range from '../common/range.vue'

import { mapState } from 'vuex';

export default {
  name: 'filterGarage',
  components: {
    multiselect,
    range,
  },
  data() {
    return {
      garageParkingValue: null,
      garageParkingTypes: [
        {
          slug: 'garage',
          label: 'Гараж',
        },
        {
          slug: 'parking',
          label: 'Машиноместо',
        },
      ],
      garageTypeValue: null,
      garageTypes: [
        {
          slug: 'reinforcedConcrete',
          label: 'Железобетонный',
        },
        {
          slug: 'brick',
          label: 'Кирпичный',
        },
        {
          slug: 'irony',
          label: 'Железный',
        },
      ],
      parkingTypeValue: null,
      parkingTypes: [
        {
          slug: 'multilevelParking',
          label: 'Многоуровневый паркинг',
        },
        {
          slug: 'undergroundParking',
          label: 'Подземный паркинг',
        },
        {
          slug: 'undergroundParking',
          label: 'Подземная стоянка',
        },
        {
          slug: 'openParking',
          label: 'Открытая стоянка',
        },
      ],
      securityValue: null,
      securityTypes: [
        {
          slug: 'yes',
          label: 'Охрана нужна',
        },
        {
          slug: 'no',
          label: 'Без охраны',
        },
      ],
      areaRange: null,
    }
  },
  computed: {
    ...mapState([
      'filterData',
    ]),
    isGarageOrParking: {
      cache: false,
      get() {
        return this.garageParkingValue;
      },
      set(value) {
        this.garageParkingValue = value;
        this.filterData.garageOrParkingData.isGarageOrParking = value.slug;
      }
    },
    whatKindOfGarageType: {
      cache: false,
      get() {
        return this.garageTypeValue;
      },
      set(value) {
        this.garageTypeValue = value;
        this.filterData.garageOrParkingData.garageType = value;
      }
    },
    whatKindOfParkingType: {
      cache: false,
      get() {
        return this.parkingTypeValue;
      },
      set(value) {
        this.parkingTypeValue = value;
        this.filterData.garageOrParkingData.parkingType = value;
      }
    },
    isSecurity: {
      cache: false,
      get() {
        return this.securityValue;
      },
      set(value) {
        this.securityValue = value;
        this.filterData.garageOrParkingData.security = value.slug;
      }
    },
    areaRangeValue: {
      cache: false,
      get() {
        return this.areaRange;
      },
      set(value) {
        this.areaRange = value;
        this.filterData.areaRange = value;
      }
    },
    priceRangeValue: {
      cache: false,
      get() {
        return this.priceRange;
      },
      set(value) {
        this.priceRange = value;
        this.filterData.priceRange = value;
      }
    },
  },
};
</script>