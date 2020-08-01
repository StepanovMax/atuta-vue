<template>
  <ul class="sort-objects">
    <li class="sort-objects__item">
      <button
        class="
          btn
          sort-objects__btn
          sort-objects__btn_price
        "
        :class="{'sort-objects__btn_active': activeButton === 'price'}"
        @click="sortPrice()"
      >
        <span
          class="sort-objects__btn-text"
          :class="{'sort-objects__btn-text_active': activeButton === 'price'}"
        >
          Цена
        </span>
        <iconSortArrows
          v-if="activeButton === 'price'"
          :class="'sort-objects__btn-icon'"
          :arrowWay="sortWayPrice"
        />
      </button>
    </li>
    <li class="sort-objects__item">
      <button
        class="
          btn
          sort-objects__btn
          sort-objects__btn_date
        "
        :class="{'sort-objects__btn_active': activeButton === 'date'}"
        @click="sortDate()"
      >
        <span
          class="sort-objects__btn-text"
          :class="{'sort-objects__btn-text_active': activeButton === 'date'}"
        >
          Дата
        </span>
        <iconSortArrows
          v-if="activeButton === 'date'"
          :class="'sort-objects__btn-icon'"
          :arrowWay="sortWayDate"
        />
      </button>
    </li>
    <li class="sort-objects__item">
      <button
        class="
          btn
          sort-objects__btn
          sort-objects__btn_area
        "
        :class="{'sort-objects__btn_active': activeButton === 'area'}"
        @click="sortArea()"
      >
        <span
          class="sort-objects__btn-text"
          :class="{'sort-objects__btn-text_active': activeButton === 'area'}"
        >
          Площадь
        </span>
        <iconSortArrows
          v-if="activeButton === 'area'"
          :class="'sort-objects__btn-icon'"
          :arrowWay="sortWayArea"
        />
      </button>
    </li>
  </ul>
</template>

<script>
import iconSortArrows from '../icons/iconSortArrows.vue'

export default {
  name: 'sortObjects',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    propObjectsForSorting: {
      type: Array,
      default: [],
      required: true,
    }
  },
  components: {
    iconSortArrows,
  },
  data() {
    return {
      dataObjectsForSorting: this.propObjectsForSorting,
      sortWayArea: 'less',
      sortWayPrice: 'less',
      sortWayDate: 'more',
      activeButton: 'date',
    }
  },
  methods: {
    sortArea() {
      if (this.sortWayArea === 'less') {
        this.dataObjectsForSorting.sort(
          (a, b) => {
            if (parseInt(a.area) < parseInt(b.area)) {
              return -1;
            }
            if (parseInt(a.area) > parseInt(b.area)) {
              return 1;
            }
            return 0
          }
        );
        this.sortWayArea = 'more';
      } else if (this.sortWayArea === 'more') {
        this.dataObjectsForSorting.sort(
          (a, b) => {
            if (parseInt(a.area) < parseInt(b.area)) {
              return 1;
            }
            if (parseInt(a.area) > parseInt(b.area)) {
              return -1;
            }
            return 0
          }
        );
        this.sortWayArea = 'less';
      }
      this.activeButton = 'area';
      this.$emit('update:value', this.dataObjectsForSorting);
    },
    sortPrice() {
      if (this.sortWayPrice === 'less') {
        this.dataObjectsForSorting.sort(
          (a, b) => {
            if (parseInt(a.price) < parseInt(b.price)) {
              return -1;
            }
            if (parseInt(a.price) > parseInt(b.price)) {
              return 1;
            }
            return 0
          }
        );
        this.sortWayPrice = 'more';
      } else if (this.sortWayPrice === 'more') {
        this.dataObjectsForSorting.sort(
          (a, b) => {
            if (parseInt(a.price) < parseInt(b.price)) {
              return 1;
            }
            if (parseInt(a.price) > parseInt(b.price)) {
              return -1;
            }
            return 0
          }
        );
        this.sortWayPrice = 'less';
      }
      this.activeButton = 'price';
      this.$emit('update:value', this.dataObjectsForSorting);
    },
    sortDate() {
      if (this.sortWayDate === 'less') {
        this.dataObjectsForSorting.sort(
          (a, b) => {
            if (parseInt(a.date) < parseInt(b.date)) {
              return -1;
            }
            if (parseInt(a.date) > parseInt(b.date)) {
              return 1;
            }
            return 0
          }
        );
        this.sortWayDate = 'more';
      } else if (this.sortWayDate === 'more') {
        this.dataObjectsForSorting.sort(
          (a, b) => {
            if (parseInt(a.date) < parseInt(b.date)) {
              return 1;
            }
            if (parseInt(a.date) > parseInt(b.date)) {
              return -1;
            }
            return 0
          }
        );
        this.sortWayDate = 'less';
      }
      this.activeButton = 'date';
      this.$emit('update:value', this.dataObjectsForSorting);
    },
  },
  mounted() {
    this.sortDate();
  },
};
</script>