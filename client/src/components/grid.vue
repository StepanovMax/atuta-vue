<template>
  <div class="grid">
    <div class="grid__buttons">

      <switcherGrid
        :value.sync="dataGridView"
      />

      <sortObjects
        :propObjectsForSorting="propGridItems"
        :value.sync="dataSortedObjects"
      />

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
          <p class="">
            Дата: {{ timeConverter(item.date) }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import sortObjects from './common/sortObjects.vue';
import switcherGrid from './common/switcherGrid.vue';

export default {
  name: 'grid',
  components: {
    sortObjects,
    switcherGrid,
  },
  data() {
    return {
      dataGridView: this.propGridView,
      dataGridItems: this.propGridItems,
      dataSortedObjects: null,
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
  watch: {
    dataSortedObjects: {
      handler() {
        this.dataGridItems = this.dataSortedObjects;
      },
      deep: true
    },
  },
  methods: {
    timeConverter(UNIX_timestamp){
      const a = new Date(UNIX_timestamp * 1000);
      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май','Июнь','Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const time = date + ' ' + month + ' ' + year;
      return time;
    },
  },
};
</script>