<template>
  <div class="form">
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

    <pre>
      {{ filterData }}
    </pre>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect'
import rangeSlider from '../../common/rangeSlider.vue';
import checkboxes from '../../common/checkboxes.vue';
import rangeInput from '../../common/rangeInput.vue';
import { mapState, store, commit } from 'vuex';

export default {
  name: 'filterHouse',
  components: {
    rangeSlider,
    checkboxes,
    rangeInput,
    multiselect,
  },
  data() {
    return {
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
      houseRangePrice: [0, 100000000],
      houseRangeRent: [0, 100000000],
      houseAreaHouse: [0, 500],
      houseAreaLand: [0, 100],
      houseDistance: [0, 100],
      houseFloorAll: [0, 30],
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
    ]),
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