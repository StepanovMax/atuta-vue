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
            <multiselect
              v-model="isBuyOrRent"
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
            <multiselect
              v-model="objectType"
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
        </div>

        <filterApp
          v-if="buyRentValue && objectTypeValue && objectTypeValue.slug == 'app'"
        />

        <filterHouse
          v-if="buyRentValue && objectTypeValue && objectTypeValue.slug == 'house'"
        />

        <filterRoom
          v-if="buyRentValue && objectTypeValue && objectTypeValue.slug == 'room'"
        />

        <filterGarage
          v-if="
            buyRentValue
              && objectTypeValue
              && objectTypeValue.slug == 'garage'
          "
        />

        <filterArea
          v-if="buyRentValue && objectTypeValue && objectTypeValue.slug == 'area'"
        />

        <filterCommercial
          v-if="buyRentValue && objectTypeValue && objectTypeValue.slug == 'commercial'"
        />

        <div class="filter-mobile__buttons-block">
          <button
            class="btn filter-mobile__btn btn_blue btn_middle"
          >
            Сбросить
          </button>

          <button
            class="btn filter-mobile__btn btn_blue btn_middle"
            :class="[
              {
                'btn_disabled': !this.requiredFormItemsIsFilled
              }
            ]"
          >
            Фильтровать
          </button>
        </div>

<p
  class="paragraph"
  style="font-size: 14px;"
>
<pre>
{{ filterData }}
</pre>
</p>

      </div>
    </div>
  </div>
</template>

<script>
import filterApp from './filterApp.vue';
import filterHouse from './filterHouse.vue';
import filterRoom from './filterRoom.vue';
import filterGarage from './filterGarage.vue';
import filterArea from './filterArea.vue';
import filterCommercial from './filterCommercial.vue';
import multiselect from 'vue-multiselect';

import { mapState } from 'vuex';

export default {
  name: 'filterMobile',
  components: {
    multiselect,
    filterApp,
    filterHouse,
    filterRoom,
    filterGarage,
    filterArea,
    filterCommercial,
  },
  props: {
    isFilterOpen: {
      default: false,
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      buyRentValue: null,
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
      objectTypeValue: null,
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
          slug: 'garage',
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
    filterData: {
      handler(value) {
        // console.log('store.filterData ::', value);
      },
      deep: true
    },
  },
  computed: {
    ...mapState([
      'filterData',
    ]),
    isBuyOrRent: {
      cache: false,
      get() {
        return this.buyRentValue;
      },
      set(value) {
        this.buyRentValue = value;
        this.filterData.isBuyOrRent = value.slug;
      }
    },
    objectType: {
      cache: false,
      get() {
        return this.objectTypeValue;
      },
      set(value) {
        this.objectTypeValue = value;
        this.filterData.objectType = value.slug;
      }
    },
    requiredFormItemsIsFilled() {
      let value;
      if (this.buyRentValue && this.objectTypeValue) {
        if (this.objectTypeValue.slug === 'garage') {
          if (this.filterData.garageOrParkingData.isGarageOrParking) {
            value = true;
          } else {
            value = false;
          }
        }
      }
      return value;
    },
  },
};
</script>