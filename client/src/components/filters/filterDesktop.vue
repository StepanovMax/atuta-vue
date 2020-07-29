<template>
  <div class="filter-desktop">
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

    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Тип сделки*
      </h3>
      <switcher
        switcherId="deal"
        :items="dealArray"
        :value.sync="filterDataClone.deal"
      />
    </div>

    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Тип объекта*
      </h3>
      <radioButtons
        radioButtonsId="objectType"
        :items="objectTypes"
        :value.sync="filterDataClone.object"
      />
    </div>




    <!-- Garage filter part -->
    <template
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug === 'garageOrParking'
      "
    >
      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Гараж или машиноместо?*
        </h3>
        <radioButtons
          radioButtonsId="objectView"
          :items="garageParkingTypes"
          :value.sync="filterDataClone.garageOrParkingData.isGarageOrParking"
        />
      </div>

      <div
        v-if="
          filterDataClone.garageOrParkingData.isGarageOrParking
          && filterDataClone.garageOrParkingData.isGarageOrParking.slug === 'garage'
        "
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Тип гаража
        </h3>
        <checkboxes
          key="garageType"
          checkboxId="garageType"
          :items="garageTypes"
          :value.sync="filterDataClone.garageOrParkingData.garageType"
        />
      </div>

      <div
        v-if="
          filterDataClone.garageOrParkingData.isGarageOrParking
          && filterDataClone.garageOrParkingData.isGarageOrParking.slug === 'parking'
        "
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Тип машиноместа
        </h3>
        <checkboxes
          key="parkingType"
          checkboxId="parkingType"
          :items="parkingTypes"
          :value.sync="filterDataClone.garageOrParkingData.parkingType"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Охрана
        </h3>
        <switcher
          switcherId="security"
          :items="securityTypes"
          :value.sync="filterDataClone.security"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Площадь
        </h3>
        <rangeDesktop
          rangeType="area"
          :rangeData="rangeArea"
          :value.sync="filterDataClone.areaRange"
        />
      </div>
    </template>



    <!-- Garage filter part -->
    <template
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug === 'app'
      "
    >
      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Количество комнат
        </h3>
        <checkboxes
          key="roomsCount"
          checkboxId="roomsCount"
          checkboxType="checkboxButtons"
          :items="roomsCount"
          :value.sync="filterDataClone.app.roomsCount"
        />
      </div>
    </template>



    <div
      class="form__row"
      v-if="filterDataClone.deal && filterDataClone.deal.slug == 'buy'"
    >
      <h3 class="title title_h6 form__title">
        Цена
      </h3>
      <rangeDesktop
        rangeType="price"
        :rangeData="rangePrice"
        :value.sync="filterDataClone.priceRange"
      />
    </div>

    <div
      class="form__row"
      v-if="filterDataClone.deal && filterDataClone.deal.slug == 'rent'"
    >
      <h3 class="title title_h6 form__title">
        Аренда в месяц
      </h3>
      <rangeDesktop
        rangeType="price"
        :rangeData="rangeRent"
        :value.sync="filterDataClone.priceRange"
      />
    </div>

    <div class="form__row">
      <h3 class="title title_h6 form__title">
        Продавцы
      </h3>
      <checkboxes
        key="sellers"
        checkboxId="sellers"
        :items="sellersList"
        :value.sync="filterDataClone.seller"
      />
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
import rangeDesktop from '../common/rangeDesktop.vue';
import multiselect from 'vue-multiselect';
import checkboxes from '../common/checkboxes.vue';
import radioButtons from '../common/radioButtons.vue';
import switcher from '../common/switcher.vue';
import { mapState, store, commit } from 'vuex';

export default {
  name: 'filterDesktop',
  components: {
    rangeDesktop,
    checkboxes,
    radioButtons,
    switcher,
    multiselect,
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
          slug: 'rostov-on-don',
          label: 'Ростов-на-Дону',
        },
        {
          slug: 'taganrog',
          label: 'Таганрог',
        },
      ],
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
          slug: 'сoveredParking',
          label: 'Крытая стоянка',
        },
        {
          slug: 'openParking',
          label: 'Открытая стоянка',
        },
      ],
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
      roomsCount: [
        {
          slug: 'studio',
          label: 'Студия',
        },
        {
          slug: 'freePlan',
          label: 'Своб.планировка',
        },
        {
          slug: '1',
          label: '1',
        },
        {
          slug: '2',
          label: '2',
        },
        {
          slug: '3',
          label: '3',
        },
        {
          slug: '4',
          label: '4',
        },
        {
          slug: '5',
          label: '5',
        },
        {
          slug: '6',
          label: '6',
        },
        {
          slug: '7',
          label: '7',
        },
        {
          slug: '8',
          label: '8',
        },
        {
          slug: '9',
          label: '9',
        },
        {
          slug: '9+',
          label: '9+',
        },
      ],
      rangePrice: [0, 10000000],
      rangeRent: [10, 1100],
      rangeArea: [0, 500],
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
        } else if (this.filterData.object.slug === 'app') {
          value = true;
        }
      }
      return value;
    },
  },
  created() {
    // Getting the data for the filter from store.
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