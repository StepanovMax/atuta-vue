<template>
  <div class="grid">

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
        v-for="(item, index) in dataGridItems"
        :key="'key-' + item.id + '-' + index"
      >
        <cardObject
          v-if="propItemType === 'object'"
          :propObjectView="dataGridView"
          :key="'key-' + item.id + '-' + index"
          :propObjectData="item"
          :propIsSample="false"
        />

        <cardCompany
          v-if="propItemType === 'company'"
          :key="'key-' + item.id + '-' + index"
          :propCompanyData="item"
        />
      </li>
    </ul>
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
    // console.log('beforeMount grid ::');
    console.log('[Grid] | beforeMount | propGridItems ::', this.propGridItems);
    console.log('[Grid] | beforeMount | dataGridItems ::', this.dataGridItems);
    this.dataGridItems = this.propGridItems;
  },
  mounted() {
    console.log('[Grid] | mounted | propGridItems ::', this.propGridItems);
    console.log('[Grid] | mounted | dataGridItems ::', this.dataGridItems);
    this.dataGridItems = this.propGridItems;
  },
};
</script>