<template>
  <div class="form">
    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Вид объекта*
      </h3>
      <switcher
        switcherId="deal2"
        :items="dealArray"
        :value.sync="filterDataClone.deal2"
      />
    </div>

    <pre>
      {{ filterDataClone.garageOrParkingData.isGarageOrParking }}
    </pre>

    <div
      v-if="
        garageParkingValue
        && garageParkingValue.slug === 'garage'
      "
      class="form__row"
    >
      <h3 class="title title_h6 form__title">
        Тип гаража
      </h3>
      <multiselect
        v-model="whatKindOfGarageType"
        :options="garageTypes"
        :show-labels="false"
        :allow-empty="true"
        :close-on-select="true"
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
      <h3 class="title title_h6 form__title">
        Тип машиноместа
      </h3>
      <multiselect
        v-model="whatKindOfParkingType"
        :options="parkingTypes"
        :show-labels="false"
        :allow-empty="true"
        :close-on-select="true"
        :multiple="true"
        :searchable="false"
        label="label"
        track-by="label"
        placeholder="Какой тип тип машиноместа?"
      />
    </div>
    <div class="form__row">
      <h3 class="title title_h6 form__title">
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
      <h3 class="title title_h6 form__title">
        Площадь
      </h3>
      <rangeDesktop
        rangeType="area"
        :rangeData.sync="areaRangeValue"
      />
    </div>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect'
import range from '../../common/range.vue'
import radioButtons from '../../common/radioButtons.vue';
import switcher from '../../common/switcher.vue';

import { mapState } from 'vuex';

export default {
  name: 'filterGarage',
  components: {
    range,
    switcher,
    multiselect,
    radioButtons,
  },
  data() {
    return {
      filterDataClone: {},
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
      dealArray: [
        {
          slug: 'buy',
          label: 'Купить',
        },
        {
          slug: 'rent',
          label: 'Аренда',
        },
      ],
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
          this.filterDataClone.garageOrParkingData.parkingType = null;
        } else if (value.slug === 'parking') {
          this.filterDataClone.garageOrParkingData.garageType = null;
        }
        this.garageParkingValue = value;
        this.filterDataClone.garageOrParkingData.isGarageOrParking = value.slug;
      }
    },
    whatKindOfGarageType: {
      cache: false,
      get() {
        return this.garageTypeValue;
      },
      set(value) {
        this.garageTypeValue = value;
        this.filterDataClone.garageOrParkingData.garageType = value;
      }
    },
    whatKindOfParkingType: {
      cache: false,
      get() {
        return this.parkingTypeValue;
      },
      set(value) {
        this.parkingTypeValue = value;
        this.filterDataClone.garageOrParkingData.parkingType = value;
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
  created() {
    this.filterDataClone = JSON.parse(JSON.stringify(this.filterData));
  },
};
</script>