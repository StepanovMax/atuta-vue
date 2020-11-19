<template>
  <div
    v-if="userDataComputed"
    id="myObjectsSubPage"
    class="my-objects-sub-page"
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        Мои объекты
      </h3>
    </header>

    <div class="template-page__content">
      <switcher
        v-if="arrayWithCountedStatuses"
        class="add-object-page__switcher"
        switcherId="typeAddObject"
        :items="arrayWithCountedStatuses"
        :value.sync="selectedStatus"
        propClass="myObjects"
      />

      <grid
        v-if="selectedObjects"
        :propGridView="'net'"
        :propGridItems="selectedObjects"
        :propGridSorting="true"
        propItemType="object"
      />
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import grid from '../../grid.vue';
import switcher from '../../common/switcher.vue';

export default {
  name: 'myObjects',
  components: {
    grid,
    switcher,
  },
  data() {
    return {
      arrayWithCountedStatuses: null,
      selectedStatus: null,
      allObjects: [],
    }
  },
  computed: {
    ...mapState([
      'userData',
      'myObjects',
      'objectsStatuses',
      'favouriteObjects',
    ]),
    userDataComputed() {
      if (this.userData) {
        this.checkUsersObjects(this.userData);
      }
      return this.userData;
    },
    urlGetObjectsByParentId() {
      const host = this.getHost();
      const url = `${host.api}` + '/objects/get-objects-by-parent-id';
      return url;
    },
    selectedObjects() {
      // console.log('this.allObjects :::', this.allObjects);
      if (this.selectedStatus && this.selectedStatus.slug === 'all') {
        return this.allObjects;
      } else if (this.selectedStatus && this.selectedStatus.slug === 'onModeration') {
        return this.objectsGroupedByStatuses[0].array;
      } else if (this.selectedStatus && this.selectedStatus.slug === 'active') {
        return this.objectsGroupedByStatuses[1].array;
      } else if (this.selectedStatus && this.selectedStatus.slug === 'awaitingForPayment') {
        return this.objectsGroupedByStatuses[2].array;
      } else if (this.selectedStatus && this.selectedStatus.slug === 'declined') {
        return this.objectsGroupedByStatuses[3].array;
      } else if (this.selectedStatus && this.selectedStatus.slug === 'completed') {
        return this.objectsGroupedByStatuses[4].array;
      }
      return [];
    },
    // Get statuses and convert them to arrays in the object.
    objectsGroupedByStatuses() {
      const array = this.objectsStatuses.map(
        item => {
          item.array = [];
          return item;
        }
      )
      return array;
    },
  },
  methods: {
    // Divide objects by statuses into arrays.
    toCountArray(objects) {
      let arrayAllLength = 0;
      let arrayWithCountedStatuses = [];
      for (const key in objects) {
        if (!objects.hasOwnProperty(key)) continue;
        const subObj = objects[key];
        this.allObjects.push(subObj);
        if (subObj.status === 0) {
          this.objectsGroupedByStatuses[0].array.push(subObj);
        } else if (subObj.status === 1) {
          this.objectsGroupedByStatuses[1].array.push(subObj);
        } else if (subObj.status === 2) {
          this.objectsGroupedByStatuses[2].array.push(subObj);
        } else if (subObj.status === 3) {
          this.objectsGroupedByStatuses[3].array.push(subObj);
        } else if (subObj.status === 4) {
          this.objectsGroupedByStatuses[4].array.push(subObj);
        }
      }
      arrayWithCountedStatuses.push({
        label: 'Все' + ' (' + this.allObjects.length + ')',
        slug: 'all',
        checked: true,
      });
      // Count each objects group.
      for (const key in this.objectsGroupedByStatuses) {
        if (!this.objectsGroupedByStatuses.hasOwnProperty(key)) continue;
        const subObj = this.objectsGroupedByStatuses[key];
        arrayWithCountedStatuses.push({
          label: this.objectsGroupedByStatuses[key].label + ' (' + subObj.array.length + ')',
          slug: this.objectsGroupedByStatuses[key].slug,
        });
      }
      return arrayWithCountedStatuses;
    },
    async checkUsersObjects(value) {
      const result = await axios.post(
        this.urlGetObjectsByParentId,
        {
          id: value.id
        }
      )
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.error('Error ::', error);
        });
      if (result) {
        this.$store.commit('updateMyObjectsState', result.data);
        this.arrayWithCountedStatuses = this.toCountArray(this.myObjects);
      }
    },
  },
  mounted() {
    // If we got objects already.
    if (this.myObjects.length) {
      this.selectedStatus = 'all';
    }
  },
};
</script>