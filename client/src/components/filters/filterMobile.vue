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
        <filterMain />

        <div class="filter-mobile__buttons-block">
          <button
            class="btn filter-mobile__btn btn_blue btn_mini"
          >
            Сбросить
          </button>

          <button
            class="btn filter-mobile__btn btn_blue btn_mini"
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
    </div>
  </div>
</template>

<script>
import filterMain from './filterMain.vue';
import { mapState } from 'vuex';

export default {
  name: 'filterMobile',
  components: {
    filterMain,
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
  },
};
</script>