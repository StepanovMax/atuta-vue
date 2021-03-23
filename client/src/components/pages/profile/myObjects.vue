<template>
  <div
    id="myObjectsSubPage"
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
        v-if="arrayWithCountedStatuses"
        class="add-object-page__switcher"
        switcherId="typeAddObject"
        :items="arrayWithCountedStatuses"
        :value.sync="selectedStatus"
        propClass="myObjects"
      />

      <div
        v-if="
          userData.role === 'builder'
          || userData.role === 'agency'
        "
        class="sub-filter"
      >
        <multiselect
          class="multiselect_employee"
          v-model="selectedEmployees"
          :options="userEmployees"
          :show-labels="false"
          :allow-empty="true"
          :close-on-select="true"
          :multiple="false"
          :searchable="true"
          label="name"
          track-by="phone"
          placeholder="Сотрудники"
        />
      </div>

      <grid
        v-if="selectedObjects.length"
        propSortingTypeGrid="common"
        :propGridView="'net'"
        :propGridItems="selectedObjects"
        :propGridSorting="true"
        propItemType="object"
      />
    </div>

    <div
      class="template-page__content"
      v-else
    >
      <p class="paragraph">
        Данных нет
      </p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

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
    selectedObjects(value) {
      // this.allObjects = this.addFavOptionToObjects(this.myObjects, this.favouriteObjects);
      console.log('watch : selectedObjects ::', value);
    },
    favouriteObjects(value) {
      // this.allObjects = this.addFavOptionToObjects(this.myObjects, this.favouriteObjects);
      console.log('watch : favouriteObjects ::', value);
    },
    selectedEmployees(value) {
      console.log('value ::', value);
      let objectsArray = [];
      objectsArray = this.selectedObjects.filter(
        item => {
          if (item.user.contact) {
            return item.user.contact.slug === value.slug;
          }
        }
      );
      console.log('myObjects.vue : asd ::', objectsArray);
      this.updateObjects();
    },
  },
  computed: {
    ...mapState([
      'userData',
      'myObjects',
      'userEmployees',
      'objectsStatuses',
      'favouriteObjects',
    ]),
    ...mapActions([
      'getMyObjects',
    ]),
    selectedStatus: {
      cache: false,
      get() {
        return this.selectedStatusValue;
      },
      set(value) {
        this.selectedStatusValue = value;
        this.updateObjects();
      }
    },
    // userDataComputed() {
    //   if (this.userData) {
    //     this.checkUsersObjects(this.userData);
    //   }
    //   return this.userData;
    // },
    employeesList() {
      console.log('userEmployees ::', this.userEmployees);
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
    addClientNameToObject() {
      this.myObjects.map(
        item => {
          if (this.userData.role === 'personal') {
            item.user = {
              name: 'Собственник'
            }
          } else if (this.userData.role === 'agent') {
            item.user = {
              name: 'Агент'
            }
          } else {
            item.user = {
              name: this.userData.name
            }
          }
          return item;
        }
      );
      // console.log('this.myObjects >>>', this.myObjects);
    },
    updateObjects() {
      this.updateObjectsDependsOnStatus();
      this.updateObjectsDependsOnEmployee();
    },
    updateObjectsDependsOnEmployee() {
      if (this.selectedEmployees.phone) {
        const objectsArray = this.selectedObjects.filter(
          item => {
            if (this.selectedEmployees.slug === 'all') {
              return true;
            } else if (item.phone === this.selectedEmployees.phone) {
              return true;
            } else {
              return false;
            }
          }
        );
        console.log('objectsArray >>>', objectsArray);
        this.selectedObjects = objectsArray;
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
        // console.log('myObjects.vue : allObjects !::', this.allObjects);
        // this.allObjects.push(subObj);
        if (subObj.status === 'onModeration') {
          this.objectsGroupedByStatuses[0].array.push(subObj);
        } else if (subObj.status === 'active') {
          this.objectsGroupedByStatuses[1].array.push(subObj);
        } else if (subObj.status === 'awaitingForPayment') {
          this.objectsGroupedByStatuses[2].array.push(subObj);
        } else if (subObj.status === 'declined') {
          this.objectsGroupedByStatuses[3].array.push(subObj);
        } else if (subObj.status === 'completed') {
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
    // async checkUsersObjects(value) {
    //   const result = await axios.post(
    //     process.env.host_api + '/objects/get-objects-by-parent-id',
    //     {
    //       id: value.id
    //     }
    //   )
    //     .then(function (response) {
    //       return response;
    //     })
    //     .catch(function (error) {
    //       console.error('Error ::', error);
    //     });
    //   if (result) {
    //     this.$store.commit('updateMyObjectsState', result.data);
    //     this.arrayWithCountedStatuses = this.toCountArray(this.myObjects);
    //   }
    // },
    addFavOptionToObjects(objects, favorites) {
      // console.log('myObjects.vue : objects ::', objects);
      // console.log('myObjects.vue : favorites ::', favorites);
      const objectsWithFav = objects.map(
        objItem => {
          objItem.fav = false;
          const catchedItem = favorites.some(
            favItem => objItem.id === favItem
          )
          if (catchedItem) {
            objItem.fav = true;
          }
          // console.log('myObjects.vue : objItem ::', objItem.id, objItem.fav);
          return objItem;
        }
      );
      console.log('myObjects.vue : objectsWithFav ::', objectsWithFav);
      return objectsWithFav;
    },
  },
  async mounted() {
    const myObjectsResult = await this.getMyObjects;
    this.$store.commit('updateFavouriteObjectsState', this.userData.favorites);
    console.log('myObjectsResult ::', myObjectsResult, this.myObjects, this.favouriteObjects);
    if (myObjectsResult) {
      if (this.myObjects && this.myObjects.length) {
        console.log('myObjects.vue : this.allObjects ::', this.myObjects);
        console.log('myObjects.vue : this.userData ::', this.userData);
        if (this.favouriteObjects && this.favouriteObjects.length) {
          this.selectedObjects = this.allObjects = this.addFavOptionToObjects(this.myObjects, this.favouriteObjects);
        } else {
          this.selectedObjects = this.allObjects = this.myObjects;
        }
        console.log('myObjects.vue : this.allObjects ::', this.allObjects);
        this.addClientNameToObject();
        this.arrayWithCountedStatuses = this.toCountArray(this.allObjects);
        this.selectedStatus = 'all';
      }
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