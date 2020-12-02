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

      <div
        class="sub-filter"
      >
        <multiselect
          class="multiselect_employee"
          v-model="selectedEmployees"
          :options="employeesList"
          :show-labels="false"
          :allow-empty="true"
          :close-on-select="true"
          :multiple="false"
          :searchable="true"
          label="label"
          track-by="phoneNumber"
          placeholder="Сотрудники"
        />
      </div>

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
import multiselect from 'vue-multiselect';
import switcher from '../../common/switcher.vue';

export default {
  name: 'myObjects',
  components: {
    grid,
    switcher,
    multiselect,
  },
  data() {
    return {
      arrayWithCountedStatuses: null,
      allObjects: [],
      selectedEmployees: [],
      selectedStatusValue: [],
      selectedObjects: [],
    }
  },
  watch: {
    selectedEmployees(value) {
      // console.log('value ::', value);
      let objectsArray = [];
      objectsArray = this.selectedObjects.filter(
        item => {
          if (item.user.contact) {
            return item.user.contact.slug === value.slug;
          }
        }
      );
      console.log('asd ::', objectsArray);
      this.updateObjects();
    },
  },
  computed: {
    ...mapState([
      'userData',
      'myObjects',
      'objectsStatuses',
      'favouriteObjects',
    ]),
    selectedStatus: {
      cache: false,
      get() {
        return this.selectedStatusValue;
      },
      set(value) {
        this.selectedStatusValue = value;
        this.updateObjects();
        // console.log('selectedObjects ::', this.selectedObjects);
      }
    },
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
    employeesList() {
      // console.log('employeesList ::');
      let selectedEmployees = [];
      selectedEmployees.push({
        label: 'Все',
        slug: 'all',
        phoneNumber: '',
      });
      this.allObjects.forEach(
        item => {
          if (item.user && item.user.contact && !this.detectDuplicatesnArray(item, selectedEmployees)) {
            selectedEmployees.push({
              label: item.user.contact.label,
              slug: item.user.contact.slug,
              phoneNumber: item.user.contact.phoneNumber,
            });
          }
        }
      )
      return selectedEmployees;
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
    updateObjects() {
      console.log('updateObjects ::');
      this.updateObjectsDependsOnStatus();
      this.updateObjectsDependsOnEmployee();
    },
    updateObjectsDependsOnEmployee() {
      console.log('this.selectedEmployees ::', this.selectedEmployees);
      if (this.selectedEmployees.slug) {
        const objectsArray = this.selectedObjects.filter(
          item => {
            if (this.selectedEmployees.slug === 'all') {
              return true;
            } else if (item.user.contact.slug === this.selectedEmployees.slug) {
              return true;
            } else {
              return false;
            }
            console.log('item ::', item.user.contact.slug);
            console.log('employee ::', this.selectedEmployees);
          }
        );
        this.selectedObjects = objectsArray;
        console.log('objectsArray ::', objectsArray);
      }
    },
    updateObjectsDependsOnStatus() {
      if (this.selectedStatus.slug === 'all') {
        this.selectedObjects = this.allObjects;
      } else if (this.selectedStatus.slug === 'onModeration') {
        this.selectedObjects = this.objectsGroupedByStatuses[0].array;
      } else if (this.selectedStatus.slug === 'active') {
        this.selectedObjects = this.objectsGroupedByStatuses[1].array;
      } else if (this.selectedStatus.slug === 'awaitingForPayment') {
        this.selectedObjects = this.objectsGroupedByStatuses[2].array;
      } else if (this.selectedStatus.slug === 'declined') {
        this.selectedObjects = this.objectsGroupedByStatuses[3].array;
      } else if (this.selectedStatus.slug === 'completed') {
        this.selectedObjects = this.objectsGroupedByStatuses[4].array;
      } else {
        this.selectedObjects = [];
      }
    },
    detectDuplicatesnArray(selectedItem, Marray) {
      if (Marray.length > 0) {
        return Marray.some(
          item => {
            return item.slug === selectedItem.user.contact.slug;
          }
        )
      } else {
        return false;
      }
    },
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

<style lang="scss">
  .sub-filter {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
</style>