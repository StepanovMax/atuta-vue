<template>
  <div
    id="myObjectsSubPage2"
    class="my-objects-sub-page"
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        Мои объекты
      </h3>
    </header>

    <div
      class="template-page__content"
      v-if="myObjects.length"
    >
      <switcher
        v-if="statusesWithNumbers"
        class="add-object-page__switcher"
        switcherId="typeAddObject"
        :items="statusesWithNumbers"
        :value.sync="selectedStatusComputed"
        propClass="myObjects"
      />

      <grid
        v-if="selectedObjectsValue.length"
        propSortingTypeGrid="common"
        :propGridView="'net'"
        :propGridItems="selectedObjectsValue"
        :propGridSorting="true"
        propItemType="object"
      />

    </div>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect';
import { mapState, mapActions } from 'vuex';

import grid from '@cmp/grid.vue';
import switcher from '@cmp/common/switcher.vue';

export default {
  name: 'myObjects',
  components: {
    grid,
    switcher,
    multiselect,
  },
  data() {
    return {
      selectedStatusValue: '',
      selectedObjectsValue: [],
    }
  },
  watch: {
    // If myObjects state value is changed then we need to update objects in the grid.y
    myObjects() {
      this.selectedStatusComputed = this.selectedStatusValue;
    },
  },
  computed: {
    ...mapState([
      'myObjects',
      'objectsStatuses',
      'favouriteObjects',
    ]),
    ...mapActions([
      'getMyObjects',
    ]),
    // Value of selected status.
    selectedStatusComputed: {
      cache: false,
      get() {
        return this.selectedStatusValue;
      },
      set(value) {
        this.selectedStatusValue = value;
        // Function of filtering objects.
        if (value && value.slug !== 'all') {
          // If selected not 'all' option.
          this.selectedObjectsValue = this.filterObjectsByStatus(value.slug);
        } else {
          // If selected an 'all' option.
          this.selectedObjectsValue = this.myObjects;
        }
      }
    },
    // Add counted numbers for statuses labels.
    statusesWithNumbers() {
      const array = this.objectsStatuses.map(
        item => {
          const number = this.countStatuses(item.slug);
          const newItem = {
            label: item.label + ' (' + number + ')',
            slug: item.slug,
          };
          return newItem;
        }
      );
      // Add 'All' item.
      array.unshift({
        label: 'Все' + ' (' + this.myObjects.length + ')',
        slug: 'all',
        checked: true,
      });
      return array;
    },
  },
  methods: {
    // Count statuses by name.
    countStatuses(status) {
      const array = this.myObjects.filter(
        item => {
          if (item.status === status) {
            return item;
          }
        }
      );
      return array.length;
    },
    // Filter objects by status.
    filterObjectsByStatus(status) {
      const array = this.myObjects.filter(
        item => {
          if (item.status === status) {
            return item;
          }
        }
      );
      return array;
    },
    // Update 'fav option' for the 'My Objects' state.
    addFavorites() {
      const array = this.myObjects.map(
        item => {
          item.fav = false;
          const catched = this.favouriteObjects.some(
            fav => item.id === fav
          )
          if (catched) {
            item.fav = true;
          }
          return item;
        }
      );
      if (array) {
        this.$store.commit('updateMyObjectsState', array);
      }
      return array;
    },
  },
  async mounted() {
    // Update the state with 'My Objects'.
    await this.getMyObjects;
    // Compare and update 'My Objects' state with favorite objects.
    this.selectedObjectsValue = this.addFavorites();
  },
};
</script>