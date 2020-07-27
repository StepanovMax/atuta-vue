<template>
  <div
    class="filter-desktop"
  >
    <div class="form">

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Город*
        </h3>
        <multiselect
          v-model="filterDataClone.town"
          :options="townList"
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
        <switcher
          switcherId="deal-13"
          :items="dealArray"
          :value.sync="filterDataClone.deal"
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
        filterData.town
        && filterData.deal
        && filterData.object
        && filterData.object.slug == 'app'
      "
    />

    <filterHouse
      v-if="
        filterData.town
        && filterData.deal
        && filterData.object
        && filterData.object.slug == 'house'
      "
    />

    <filterRoom
      v-if="
        filterData.town
        && filterData.deal
        && filterData.object
        && filterData.object.slug == 'room'
      "
    />

    <filterGarage
      v-if="
        filterData.town
        && filterData.deal
        && filterData.object
        && filterData.object.slug == 'garageOrParking'
      "
    />

    <filterArea
      v-if="
        filterData.town
        && filterData.deal
        && filterData.object
        && filterData.object.slug == 'area'
      "
    />

    <filterCommercial
      v-if="
        filterData.town
        && filterData.deal
        && filterData.object
        && filterData.object.slug == 'commercial'
      "
    />

    <div class="form">

      <div
        class="form__row"
        v-if="filterData.deal && filterData.deal.slug == 'buy'"
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <range
          rangeType="price"
          :rangeData.sync="filterDataClone.priceRange"
        />
      </div>

      <div
        class="form__row"
        v-if="filterData.deal && filterData.deal.slug == 'rent'"
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <range
          rangeType="price"
          :rangeData.sync="filterDataClone.priceRange"
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

    <br />
    <div class="">
      <pre>
        {{ filterDataClone }}
      </pre>
    </div>

    <div class="filter-desktop__buttons-block">
      <button
        class="btn filter-desktop__btn btn_blue btn_mini"
        @click="resetFilter()"
      >
        Сбросить
      </button>

      <button
        class="btn filter-desktop__btn btn_blue btn_mini"
        :class="[
          {
            'btn_disabled': !this.requiredFormItemsIsFilled
          }
        ]"
      >
        Фильтровать
      </button>
    </div>
  </div>
</template>

<script>
import switcher from '../common/switcher.vue'
import range from '../common/range.vue'
import multiselect from 'vue-multiselect';
import filterApp from './common/filterApp.vue';
import filterHouse from './common/filterHouse.vue';
import filterRoom from './common/filterRoom.vue';
import filterGarage from './common/filterGarage.vue';
import filterArea from './common/filterArea.vue';
import filterCommercial from './common/filterCommercial.vue';
import { mapState, store, commit } from 'vuex';

export default {
  name: 'filterDesktop',
  components: {
    range,
    switcher,
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
      townList: [
        {
          slug: 'buy',
          label: 'Купить',
        },
        {
          slug: 'rent',
          label: 'Аренда',
        },
      ],
      dealArray: [
        {
          slug: 'buy',
          label: 'Купить',
          // checked: false,
        },
        {
          slug: 'rent',
          label: 'Аренда',
          // checked: false,
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
    requiredFormItemsIsFilled() {
      let value;
      if (this.filterData.deal && this.filterData.object) {
        if (this.filterData.object.slug === 'garageOrParking') {
          if (this.filterData.garageOrParkingData.isGarageOrParking) {
            value = true;
          } else {
            value = false;
          }
        }
      }
      return value;
    },
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
    },
    resetFilter() {
      this.$store.commit('resetFilter');
    },
  },
};
</script>