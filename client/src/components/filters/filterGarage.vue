<template>
  <div class="form">
    <div class="form__row">
      <h3 class="title title_h6">
        Вид объекта*
      </h3>
      <multiselect
        v-model="isGarageOrParking"
        :options="garageParkingTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        :searchable="false"
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
      <h3 class="title title_h6">
        Тип гаража
      </h3>
      <multiselect
        v-model="whatKindOfGarageType"
        :options="garageTypes"
        :show-labels="false"
        :allow-empty="true"
        :close-on-select="false"
        :multiple="true"
        :searchable="false"
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
      <h3 class="title title_h6">
        Тип машиноместа
      </h3>
      <multiselect
        v-model="whatKindOfParkingType"
        :options="parkingTypes"
        :show-labels="false"
        :allow-empty="true"
        :close-on-select="false"
        :multiple="true"
        :searchable="false"
        label="label"
        track-by="label"
        placeholder="Какой тип тип машиноместа?"
      />
    </div>
    <div class="form__row">
      <h3 class="title title_h6">
        Охрана
      </h3>
      <multiselect
        v-model="isSecurity"
        :options="securityTypes"
        :show-labels="false"
        :allow-empty="true"
        :close-on-select="true"
        :multiple="false"
        :searchable="false"
        label="label"
        track-by="label"
        placeholder="Нужна охрана?"
      />
    </div>
    <div class="form__row">
      <h3 class="title title_h6">
        Площадь*
      </h3>
      <range
        rangeType="area"
        :rangeData.sync="areaRangeValue"
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
        // Clear the rest items data from the store.
        if (value.slug === 'garage') {
          this.filterData.garageOrParkingData.parkingType = null;
        } else if (value.slug === 'parking') {
          this.filterData.garageOrParkingData.garageType = null;
        }
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
  },
};
</script>