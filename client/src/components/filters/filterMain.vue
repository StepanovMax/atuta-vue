<template>
  <div class="filterMain">
    <div class="form">
      <div class="form__row">
        <h3 class="title title_h6">
          Город*
        </h3>
        <multiselect
          v-model="townSelection"
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
        <h3 class="title title_h6">
          Район
        </h3>
        <multiselect
          v-model="districtSelection"
          :options="districtsList"
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
        <h3 class="title title_h6">
          Тип сделки*
        </h3>
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
        <h3 class="title title_h6">
          Тип объекта*
        </h3>
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
        isTownSelected
        && buyRentValue
        && objectTypeValue
        && objectTypeValue.slug == 'garageOrParking'
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
      <div class="form__row">
        <h3 class="title title_h6">
          Продавцы
        </h3>
        <multiselect
          v-model="sellerSelection"
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

      <div
        class="form__row"
        v-if="buyRentValue && buyRentValue.slug == 'buy'"
      >
        <h3 class="title title_h6">
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
        <h3 class="title title_h6">
          Аренда в месяц
        </h3>
        <range
          rangeType="price"
          :rangeData.sync="priceRangeValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import filterApp from './common/filterApp.vue';
import filterHouse from './common/filterHouse.vue';
import filterRoom from './common/filterRoom.vue';
import filterGarage from './common/filterGarage.vue';
import filterArea from './common/filterArea.vue';
import filterCommercial from './common/filterCommercial.vue';
import multiselect from 'vue-multiselect';
import range from '../common/range.vue'
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
    range,
  },
  data() {
    return {
      seller: null,
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
      town: null,
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
      district: null,
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
  computed: {
    ...mapState([
      'filterData',
      'isFilterOpen',
    ]),
    townSelection: {
      cache: false,
      get() {
        return this.town;
      },
      set(value) {
        this.town = value;
        this.filterData.town = value.slug;
      }
    },
    districtSelection: {
      cache: false,
      get() {
        return this.district;
      },
      set(value) {
        this.district = value;
        this.filterData.district = value;
      }
    },
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
        if (this.objectTypeValue.slug === 'garageOrParking') {
          if (this.filterData.garageOrParkingData.isGarageOrParking) {
            value = true;
          } else {
            value = false;
          }
        }
      }
      return value;
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
    sellerSelection: {
      cache: false,
      get() {
        return this.seller;
      },
      set(value) {
        this.seller = value;
        this.filterData.seller = value;
      }
    },
    isTownSelected() {
      return this.filterData.town;
    },
  },
};
</script>