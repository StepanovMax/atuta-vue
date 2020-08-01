<template>
  <div class="grid">
    <div class="grid__buttons">
      <div class="grid__buttons-view">
        <ul class="grid__buttons-view-list">
          <li class="grid__buttons-view-list-item">
            <button
              class="grid__buttons-button"
              @click="switchToNetView()"
            >
              Сетка
            </button>
          </li>
          <li class="grid__buttons-view-list-item">
            <button
              class="grid__buttons-button"
              @click="switchToListView()"
            >
              Список
            </button>
          </li>
        </ul>
      </div>
      <div class="grid__buttons-sort">
        <ul class="grid__buttons-sort-list">
          <li class="grid__buttons-sort-list-item">
            <button
              class="grid__buttons-button"
              @click="sortPrice()"
            >
              Цена
            </button>
          </li>
          <li class="grid__buttons-sort-list-item">
            <button
              class="grid__buttons-button"
              @click="sortArea()"
            >
              Площадь
            </button>
          </li>
        </ul>
      </div>
    </div>
    <ul
      class="grid__list"
      :class="[
        {
          'grid__list_net': dataGridView === 'net'
        },
        {
          'grid__list_list': dataGridView === 'list'
        },
      ]"
    >
      <li
        class="grid__list-item"
        :class="[
          {
            'grid__list-item_net': dataGridView === 'net'
          },
          {
            'grid__list-item_list': dataGridView === 'list'
          },
        ]"
        v-for="(item, index) in dataGridItems"
        :key="'key-' + item.id + '-' + index"
      >
        <div
          class=""
          style="
            background-color: #ccc;
            padding: 10px;
          "
        >
          <p class="">
            Цена: {{ item.price }} рублей
          </p>
          <p class="">
            Площадь: {{ item.area }} м²
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'grid',
  data() {
    return {
      dataGridView: this.propGridView,
      dataGridItems: this.propGridItems,
      sortWayArea: 'less',
      sortWayPrice: 'less',
    }
  },
  props: {
    propGridView: {
      type: String,
      default: 'net',
      required: true,
    },
    propGridItems: {
      type: Array,
      default: [],
      required: true,
    }
  },
  // computed: {
  //   ...mapState([
  //     'testObjects',
  //   ]),
  //   storedObjects() {
  //     return JSON.parse(JSON.stringify(this.testObjects));
  //   },
  // },
  methods: {
    switchToNetView(data) {
      this.dataGridView = 'net';
    },
    switchToListView() {
      this.dataGridView = 'list';
    },
    sortArea() {
      if (this.sortWayArea === 'less') {
        this.dataGridItems.sort(
          (a, b) => {
            if (a.area < b.area) {
              return -1;
            }
            if (a.area > b.area) {
              return 1;
            }
            return 0
          }
        );
        this.sortWayArea = 'more';
      } else if (this.sortWayArea === 'more') {
        this.dataGridItems.sort(
          (a, b) => {
            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0
          }
        );
        this.sortWayArea = 'less';
      }
    },
    sortPrice() {
      if (this.sortWayPrice === 'less') {
        this.dataGridItems.sort(
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
        this.dataGridItems.sort(
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
    },
  },
  created() {
    // console.log('created this.dataGridItems ::', this.dataGridItems);
  },
  mounted() {
    // console.log('this.dataGridItems ::', this.dataGridItems);
  },
};
</script>