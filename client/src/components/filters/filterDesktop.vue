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
          :close-on-select="true"
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
        radioButtonsView="default"
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
        && filterDataClone.object.slug === 'garage'
      "
    >
      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'buy'
        "
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <rangeInput
          key="garageRangePrice"
          rangeType="price"
          :value.sync="filterDataClone.garage.price"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <rangeInput
          key="garageRangeRent"
          rangeType="price"
          :value.sync="filterDataClone.garage.rent"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Гараж или машиноместо?*
        </h3>
        <radioButtons
          radioButtonsView="default"
          radioButtonsId="objectView"
          :items="garageParkingTypes"
          :value.sync="filterDataClone.garage.type"
        />
      </div>

      <div
        v-if="
          filterDataClone.garage.type
          && filterDataClone.garage.type.slug === 'garage'
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
          :value.sync="filterDataClone.garage.garageType"
        />
      </div>

      <div
        v-if="
          filterDataClone.garage.type
          && filterDataClone.garage.type.slug === 'parking'
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
          :value.sync="filterDataClone.garage.parkingType"
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
          :value.sync="filterDataClone.garage.security"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Площадь
        </h3>
        <rangeSlider
          key="garageRangeArea"
          rangeType="area"
          :rangeData="garageRangeArea"
          :value.sync="filterDataClone.garage.area"
        />
      </div>
    </template>


    <!-- Appartment filter part -->
    <template
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug === 'app'
      "
    >

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'buy'
        "
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <rangeInput
          key="appRangePrice"
          rangeType="price"
          :value.sync="filterDataClone.app.price"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <rangeInput
          key="appRangeRent"
          rangeType="price"
          :value.sync="filterDataClone.app.rent"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Срок аренды
        </h3>
        <checkboxes
          key="appRentType"
          checkboxId="appRentType"
          checkboxType="default"
          :items="rentTypes"
          :value.sync="filterDataClone.app.rentType"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Количество комнат
        </h3>
        <checkboxes
          key="appRoomsCount"
          checkboxId="appRoomsCount"
          checkboxType="roomsCount"
          :items="appRoomsCount"
          :value.sync="filterDataClone.app.roomsCount"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Тип объекта
        </h3>
        <checkboxes
          key="appType"
          checkboxId="appType"
          :items="appTypes"
          :value.sync="filterDataClone.app.type"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Общая площадь
        </h3>
        <rangeSlider
          key="appRangeArea"
          rangeType="area"
          :rangeData="appRangeArea"
          :value.sync="filterDataClone.app.area"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Этаж
        </h3>
        <rangeSlider
          key="appFloor"
          rangeType="none"
          :rangeData="appFloor"
          :value.sync="filterDataClone.app.floor"
        />
        <checkboxes
          key="appFloorNot"
          checkboxId="appFloorNot"
          :items="appFloorNot"
          :value.sync="filterDataClone.app.floorNot"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Этажей всего
        </h3>
        <rangeSlider
          key="appFloorAll"
          rangeType="none"
          :rangeData="appFloorAll"
          :value.sync="filterDataClone.app.floorAll"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Вид дома
        </h3>
        <checkboxes
          key="appView"
          checkboxId="appView"
          :items="appView"
          :value.sync="filterDataClone.app.view"
        />
      </div>
    </template>


    <!-- House filter part -->
    <template
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug === 'house'
      "
    >

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'buy'
        "
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <rangeInput
          key="houseRangeInputPrice"
          rangeType="price"
          :value.sync="filterDataClone.house.price"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <rangeInput
          key="houseRangeRent"
          rangeType="price"
          :value.sync="filterDataClone.house.rent"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Срок аренды
        </h3>
        <checkboxes
          key="houseRentType"
          checkboxId="houseRentType"
          checkboxType="default"
          :items="rentTypes"
          :value.sync="filterDataClone.house.rentType"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Количество комнат
        </h3>
        <checkboxes
          key="houseRoomsCount"
          checkboxId="houseRoomsCount"
          checkboxType="checkboxButtons"
          :items="houseRoomsCount"
          :value.sync="filterDataClone.house.roomsCount"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Тип объекта
        </h3>
        <checkboxes
          key="houseType"
          checkboxId="houseType"
          :items="houseTypes"
          :value.sync="filterDataClone.house.type"
        />
      </div>

      <div class="form__row">
        <h3 class="title title_h6 form__title">
          Вид объекта
        </h3>
        <checkboxes
          key="houseView"
          checkboxId="houseView"
          :items="appTypes"
          :value.sync="filterDataClone.house.view"
        />
      </div>

      <div
        v-if="false"
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Дом за городом?
        </h3>
        <checkbox
          key="intoCity"
          checkboxId="intoCity"
          :item="intoCityType"
          :value.sync="filterDataClone.house.isIntoCity"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Расстояние до города
        </h3>
        <rangeSlider
          key="houseDistance"
          rangeType="distance"
          :rangeData="houseDistance"
          :value.sync="filterDataClone.house.distance"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Площадь дома
        </h3>
        <rangeSlider
          key="houseAreaHouse"
          rangeType="area"
          :rangeData="houseAreaHouse"
          :value.sync="filterDataClone.house.areaHouse"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Площадь участка
        </h3>
        <rangeSlider
          key="houseAreaLand"
          rangeType="areaLand"
          :rangeData="houseAreaLand"
          :value.sync="filterDataClone.house.areaLand"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Этажей в доме
        </h3>
        <rangeSlider
          key="houseFloorAll"
          rangeType="default"
          :rangeData="houseFloorAll"
          :value.sync="filterDataClone.house.floorAll"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Материал стен
        </h3>
        <checkboxes
          key="houseWall"
          checkboxId="houseWall"
          :items="houseWall"
          :value.sync="filterDataClone.house.wall"
        />
      </div>
    </template>


    <!-- Room filter part -->
    <template
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug === 'room'
      "
    >
      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'buy'
        "
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <rangeInput
          key="roomRangeInputPrice"
          rangeType="price"
          :value.sync="filterDataClone.room.price"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <rangeInput
          key="roomRangeRent"
          rangeType="price"
          :value.sync="filterDataClone.room.rent"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Срок аренды
        </h3>
        <checkboxes
          key="roomRentType"
          checkboxId="roomRentType"
          checkboxType="default"
          :items="rentTypes"
          :value.sync="filterDataClone.room.rentType"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Площадь комнаты
        </h3>
        <rangeSlider
          key="roomRangeArea"
          rangeType="area"
          :rangeData="roomRangeArea"
          :value.sync="filterDataClone.room.area"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Количество комнат
        </h3>
        <checkboxes
          key="roomRoomsCount"
          checkboxId="roomRoomsCount"
          :items="roomRoomsCount"
          :value.sync="filterDataClone.room.roomsCount"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Этаж
        </h3>
        <rangeSlider
          key="roomFloorRange"
          rangeType="default"
          :rangeData="roomFloorRange"
          :value.sync="filterDataClone.room.floor"
        />
        <checkboxes
          key="roomFloorNot"
          checkboxId="roomFloorNot"
          :items="roomFloorNot"
          :value.sync="filterDataClone.room.floorNot"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Этажей в доме
        </h3>
        <rangeSlider
          key="roomFloorAll"
          rangeType="default"
          :rangeData="roomFloorAll"
          :value.sync="filterDataClone.room.floorAll"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Тип дома
        </h3>
        <checkboxes
          key="roomType"
          checkboxId="roomType"
          :items="appView"
          :value.sync="filterDataClone.room.type"
        />
      </div>
    </template>


    <!-- Sector filter part -->
    <template
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug === 'sector'
      "
    >
      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'buy'
        "
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <rangeInput
          key="sectorRangeInputPrice"
          rangeType="price"
          :value.sync="filterDataClone.sector.price"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <rangeInput
          key="sectorRangeRent"
          rangeType="price"
          :value.sync="filterDataClone.sector.rent"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Категория участка
        </h3>
        <checkboxes
          key="sectorCategory"
          checkboxId="sectorCategory"
          :items="sectorCategory"
          :value.sync="filterDataClone.sector.category"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Площадь
        </h3>
        <rangeSlider
          key="sectorRangeArea"
          rangeType="areaLand"
          :rangeData="sectorRangeArea"
          :value.sync="filterDataClone.sector.area"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Расстояние до города
        </h3>
        <rangeSlider
          key="sectorDistance"
          rangeType="distance"
          :rangeData="sectorDistance"
          :value.sync="filterDataClone.sector.distance"
        />
      </div>
    </template>


    <!-- Commercial filter part -->
    <template
      v-if="
        filterDataClone.town
        && filterDataClone.deal
        && filterDataClone.object
        && filterDataClone.object.slug === 'commercial'
      "
    >
      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'buy'
        "
      >
        <h3 class="title title_h6 form__title">
          Цена
        </h3>
        <rangeInput
          key="commercialRangeInputPrice"
          rangeType="price"
          :value.sync="filterDataClone.commercial.price"
        />
      </div>

      <div
        class="form__row"
        v-if="
          filterDataClone.deal
          && filterDataClone.deal.slug == 'rent'
        "
      >
        <h3 class="title title_h6 form__title">
          Аренда в месяц
        </h3>
        <rangeInput
          key="commercialRangeRent"
          rangeType="price"
          :value.sync="filterDataClone.commercial.rent"
        />
        <radioButtons
          radioButtonsView="floatRight"
          radioButtonsId="commercialRentType"
          :items="commercialRentType"
          :value.sync="filterDataClone.commercial.rentType"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Класс здания
        </h3>
        <checkboxes
          key="commercialClass"
          checkboxId="commercialClass"
          :items="commercialClass"
          :value.sync="filterDataClone.commercial.class"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Вид объекта
        </h3>
        <checkboxes
          key="commercialView"
          checkboxId="commercialView"
          :items="commercialView"
          :value.sync="filterDataClone.commercial.view"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Площадь
        </h3>
        <rangeSlider
          key="commercialRangeArea"
          rangeType="area"
          :rangeData="commercialRangeArea"
          :value.sync="filterDataClone.commercial.area"
        />
      </div>

      <div
        class="form__row"
      >
        <h3 class="title title_h6 form__title">
          Расстояние до города
        </h3>
        <rangeSlider
          key="commercialDistance"
          rangeType="distance"
          :rangeData="commercialDistance"
          :value.sync="filterDataClone.commercial.distance"
        />
      </div>
    </template>


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
        :class="[
          {
            'btn_disabled': !this.atLeastOneFormItemIsFilled
          }
        ]"
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
import rangeSlider from '../common/rangeSlider.vue';
import rangeInput from '../common/rangeInput.vue';
import multiselect from 'vue-multiselect';
import checkbox from '../common/checkbox.vue';
import checkboxes from '../common/checkboxes.vue';
import radioButtons from '../common/radioButtons.vue';
import switcher from '../common/switcher.vue';
import { mapState, store, commit } from 'vuex';

export default {
  name: 'filterDesktop',
  components: {
    rangeInput,
    rangeSlider,
    checkbox,
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
          slug: 'garage',
          label: 'Гараж / Машиноместо',
        },
        {
          slug: 'sector',
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
      appRoomsCount: [
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
      appTypes: [
        {
          slug: 'secondaryUsing',
          label: 'Вторичка',
        },
        {
          slug: 'newBuilding',
          label: 'Новостройка',
        },
      ],
      appFloorNot: [
        {
          slug: 'first',
          label: 'Не первый этаж',
        },
        {
          slug: 'last',
          label: 'Не последний этаж',
        },
      ],
      appView: [
        {
          slug: 'brick',
          label: 'Кирпичный',
        },
        {
          slug: 'panel',
          label: 'Панельный',
        },
        {
          slug: 'monolit',
          label: 'Монолитный',
        },
        {
          slug: 'wood',
          label: 'Деревянный',
        },
        {
          slug: 'block',
          label: 'Блочный',
        },
      ],
      rentTypes: [
        {
          slug: 'perDay',
          label: 'Посуточно',
        },
        {
          slug: 'longTerm',
          label: 'На длительный срок',
        },
      ],
      houseRoomsCount: [
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
      roomRoomsCount: [
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
      houseTypes: [
        {
          slug: 'house',
          label: 'Дом',
        },
        {
          slug: 'summerCottage',
          label: 'Дача',
        },
        {
          slug: 'cottage',
          label: 'Коттедж',
        },
        {
          slug: 'townhouse',
          label: 'Таунхаус',
        },
      ],
      intoCityType: {
        slug: 'yes',
        label: 'Да',
        checked: false,
      },
      houseWall: [
        {
          slug: 'brick',
          label: 'Кирпичный',
        },
        {
          slug: 'balk',
          label: 'Брус',
        },
        {
          slug: 'timber',
          label: 'Бревно',
        },
        {
          slug: 'gas-blocks',
          label: 'Газоблоки',
        },
        {
          slug: 'metal',
          label: 'Металл',
        },
        {
          slug: 'foam-blocks',
          label: 'Пеноблоки',
        },
        {
          slug: 'reinforced-concrete-panels',
          label: 'Ж/б панели',
        },
        {
          slug: 'sandvich-panels',
          label: 'Сендвич-панели',
        },
        {
          slug: 'others',
          label: 'Прочее',
        },
      ],
      roomFloorNot: [
        {
          slug: 'first',
          label: 'Не первый этаж',
        },
        {
          slug: 'last',
          label: 'Не последний этаж',
        },
      ],
      sectorCategory: [
        {
          slug: 'settlements',
          label: 'Поселений(ИЖС)',
        },
        {
          slug: 'industrial-purpose',
          label: 'Промназначения',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Сельскохозяйственного назначения',
        },
      ],
      commercialClass: [
        {
          slug: 'a',
          label: 'A',
        },
        {
          slug: 'b',
          label: 'B',
        },
        {
          slug: 'c',
          label: 'C',
        },
        {
          slug: 'd',
          label: 'D',
        },
      ],
      commercialView: [
        {
          slug: 'settlements',
          label: 'Офис',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Склад',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Общепит',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Гостиница',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Производство',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Участок',
        },
        {
          slug: 'agricultural-purpose',
          label: 'Торговая площадь',
        },
        {
          slug: 'industrial-purpose',
          label: 'Свободного назначения',
        },
      ],
      commercialRentType: [
        {
          slug: 'for-all',
          label: 'За всё',
          checked: true,
        },
        {
          slug: 'per-meter',
          label: 'За м²',
          checked: false,
        },
      ],
      garageRangeArea: [0, 100],
      garageRangePrice: [0, 100000000],
      garageRangeRent: [0, 100000000],
      appRangePrice: [0, 100000000],
      appRangeRent: [0, 1000000],
      appRangeArea: [0, 300],
      appFloor: [0, 100],
      appFloorAll: [0, 100],
      houseRangePrice: [0, 100000000],
      houseRangeRent: [0, 100000000],
      houseAreaHouse: [0, 500],
      houseAreaLand: [0, 100],
      houseDistance: [0, 100],
      houseFloorAll: [0, 30],
      roomRangeArea: [0, 100],
      roomFloorRange: [0, 30],
      roomFloorAll: [0, 30],
      sectorRangeArea: [0, 1000],
      sectorDistance: [0, 100],
      commercialRangeArea: [0, 1000],
      commercialDistance: [0, 100],
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
    atLeastOneFormItemIsFilled() {
      const value = true;
      return value;
    },
    requiredFormItemsIsFilled() {
      let value;
      if (this.filterData.deal && this.filterData.object) {
        if (this.filterData.object.slug === 'garage') {
          if (this.filterData.garage.type) {
            value = true;
          } else {
            value = false;
          }
        } else if (this.filterData.object.slug === 'app') {
          value = true;
        } else if (this.filterData.object.slug === 'room') {
          value = true;
        } else if (this.filterData.object.slug === 'sector') {
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