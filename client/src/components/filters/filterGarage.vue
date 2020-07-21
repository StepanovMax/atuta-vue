<template>
  <div class="form">
    <div class="form__row">
      Фильтр для гаражей
    </div>
    <div class="form__row">
      <multiselect
        v-model="garageParkingValue"
        :options="garageParkingTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        label="label"
        track-by="label"
        placeholder="Гараж или машиноместо?"
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
        v-model="garageValue"
        :options="garageTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="true"
        label="label"
        track-by="label"
        placeholder="Тип гаража"
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
        v-model="parkingValue"
        :options="parkingTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="true"
        label="label"
        track-by="label"
        placeholder="Тип машиноместа"
      />
    </div>
    <div class="form__row">
      <multiselect
        v-model="securityValue"
        :options="securityTypes"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        label="label"
        track-by="label"
        placeholder="Охрана"
      />
    </div>
    <div class="form__row">
      <h3 class="title title_h3">
        Площадь
      </h3>
      <vue-range-slider
        v-model="rangeValue"
      >
      </vue-range-slider>
    </div>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect'
import VueRangeSlider from 'vue-range-component'

export default {
  name: 'filterGarage',
  components: {
    multiselect,
    VueRangeSlider,
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
      garageValue: null,
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
      parkingValue: null,
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
          label: 'Да',
        },
        {
          slug: 'no',
          label: 'Нет',
        },
      ],
      rangeValue: [0, 100]
    }
  },
  created() {
    this.min = 0
    this.max = 250
    this.bgStyle = {
     backgroundColor: '#fff',
     boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
    }
    this.tooltipStyle = {
      backgroundColor: '#666',
      borderColor: '#666'
    }
    this.processStyle = {
      backgroundColor: '#999'
    }
  },
};
</script>