<template>
  <div class="grid">
    <div
      v-if="propGridItems.length"
    >

      <div
        v-if="propGridSorting"
        class="grid__buttons"
      >
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
          {'grid__list_net': dataGridView === 'net'},
          { 'grid__list_list': dataGridView === 'list'},
        ]"
      >
        <li
          class="grid__list-item"
          :class="[
            {'grid__list-item_net': dataGridView === 'net'},
            {'grid__list-item_list': dataGridView === 'list'},
          ]"
          v-for="(item, index) in propGridItems"
          :key="'key-' + item.id + '-' + index"
        >
          <cardObject
            v-if="propItemType === 'object'"
            :propObjectView="dataGridView"
            :key="'key-' + item.id + '-' + index"
            :propObjectData="item"
            :propIsSample="false"
            :propIsSelected="propIsSelected"
          />

          <cardCompany
            v-if="propItemType === 'company'"
            :key="'key-' + item.id + '-' + index"
            :propCompanyData="item"
          />
        </li>
      </ul>
    </div>

    <p
      v-if="!propGridItems.length"
    >
      Объектов не найдено.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import cardObject from './common/cardObject.vue';
import cardCompany from './common/cardCompany.vue';
import sortObjects from './common/sortObjects.vue';
import switcherGrid from './common/switcherGrid.vue';

export default {
  name: 'grid',
  components: {
    sortObjects,
    cardObject,
    cardCompany,
    switcherGrid,
  },
  data() {
    return {
      dataGridView: this.propGridView,
      dataGridItems: [],
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
    },
    propGridSorting: {
      type: Boolean,
      default: false,
      required: true,
    },
    propItemType: {
      type: String,
      default: '',
      required: true,
    },
    propIsSelected: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  watch: {
    dataSortedObjects: {
      handler() {
        this.dataGridItems = this.dataSortedObjects;
      },
      deep: true
    },
  },
  beforeMount() {
    this.dataGridItems = this.propGridItems;
  },
};
</script>