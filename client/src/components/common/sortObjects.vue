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

    <li
      v-if="propSortingTypeSortObjects === 'common'"
      class="sort-objects__item"
    >
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

    <li
      v-if="propSortingTypeSortObjects === 'common'"
      class="sort-objects__item"
    >
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
    },
    propSortingTypeSortObjects: {
      type: String,
      default: 'common',
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
      if (this.propSortingTypeSortObjects === 'vip') {
        this.sortPriceVip();
      } else if (this.propSortingTypeSortObjects === 'common') {
        this.sortPriceCommon();
      }
    },
    sortPriceVip() {
      let objectsFinal = [];
      let objectsVIP = [];
      let objectsOthers = [];
      let objectsFinalSorted = [];

      this.dataObjectsForSorting.forEach(
        item => {
          if (item.tarif === 'vip') {
            objectsVIP.push(item);
          } else if (item.tarif !== 'vip') {
            objectsOthers.push(item);
          }
        }
      );
      // console.log('objectsVIP', objectsVIP);
      // console.log('objectsOthers', objectsOthers.length);
      if (objectsOthers) {
        objectsOthers.forEach(
          item => {
            // console.log('item ::', item.id);
          }
        )
      }

      let testArray = [];
      let numberStart;
      let numberEnd;
      for(var i = 0; i < this.dataObjectsForSorting.length; ++i) {
        if (i % 9 == 0) {
          numberStart = i;
          numberEnd = i + 3;
          // console.log('testArray =>', numberStart, numberEnd);
        }
        // console.log('numberStart ::', numberStart, numberEnd);
        if (i >= numberStart && i < numberEnd) {
          console.log('objectsVIP ::', objectsVIP.length);
          if (objectsVIP.length >= 1) {
            testArray.push(objectsVIP[0]);
            objectsVIP.splice(0, 1);
          } else {
            testArray.push({ads: 'yes'});
          }
          // console.log('i ::', i, objectsVIP[0].id);
        } else {
          testArray.push(objectsOthers[0]);
          if (objectsOthers.length > 1) {
            objectsOthers.splice(0, 1);
          }
          // console.log('  i ::', i, objectsOthers[0].id);
          // console.log('testArray ::');
          // testArray.forEach(
          //   item => {
          //     console.log('item =>', item.tarif, item.id);
          //   }
          // );
        }
        // objectsFinalSorted.push();
      }
      // console.log('testArray =>', testArray);

      if (this.sortWayDate === 'less') {
        objectsOthers.sort(
          (a, b) => {
            if (parseInt(a.createdDate) < parseInt(b.createdDate)) {
              return -1;
            }
            if (parseInt(a.createdDate) > parseInt(b.createdDate)) {
              return 1;
            }
            return 0
          }
        );
        this.sortWayDate = 'more';
      } else if (this.sortWayDate === 'more') {
        objectsOthers.sort(
          (a, b) => {
            if (parseInt(a.createdDate) < parseInt(b.createdDate)) {
              return 1;
            }
            if (parseInt(a.createdDate) > parseInt(b.createdDate)) {
              return -1;
            }
            return 0
          }
        );
        this.sortWayDate = 'less';
      }

      objectsFinal = objectsVIP.concat(objectsOthers);
      // objectsFinal.push(objectsVIP);
      // objectsFinal.push(objectsOthers);
      // objectsFinal = [...objectsVIP, ...objectsOthers];
      // console.log('objectsOthers ::', objectsOthers);
      // console.log('this.dataObjectsForSorting ::', this.dataObjectsForSorting);

      this.activeButton = 'date';
      this.$emit('update:value', testArray);
    },
    sortPriceCommon() {
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
            if (parseInt(a.createdDate) < parseInt(b.createdDate)) {
              return -1;
            }
            if (parseInt(a.createdDate) > parseInt(b.createdDate)) {
              return 1;
            }
            return 0
          }
        );
        this.sortWayDate = 'more';
      } else if (this.sortWayDate === 'more') {
        this.dataObjectsForSorting.sort(
          (a, b) => {
            if (parseInt(a.createdDate) < parseInt(b.createdDate)) {
              return 1;
            }
            if (parseInt(a.createdDate) > parseInt(b.createdDate)) {
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
    this.sortPrice();
  },
};
</script>