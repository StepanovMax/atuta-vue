<template>
  <div>

    <div
      ref="area"
      class="form__row"
    >
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Площадь комнаты
            </span>
            <span v-if="propCreatedObjectRoom.area.required">
              *
            </span>
          </h3>
          <inputWithUnit
            propType="number"
            propUnit="meterSquare"
            :value.sync="roomAreaSelectedItem"
            :propValue="roomAreaItems"
            :propErrorClass="{
              'input_error': this.errors.includes('area')
            }"
          />
          <p
            v-if="this.errors.includes('area')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать площадь комнаты
          </p>
        </div>
      </div>
    </div>

    <div
      ref="roomsCount"
      class="form__row"
    >
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Количество комнат
            </span>
            <span v-if="propCreatedObjectRoom.roomsCount.required">
              *
            </span>
          </h3>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('roomsCount')
            }"
            v-model="roomRoomsCountValue"
            :options="roomRooms"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Количество комнат"
          />
          <p
            v-if="this.errors.includes('roomsCount')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать количество комнат
          </p>
        </div>
      </div>
    </div>

    <div class="form__row">
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Вид дома
            </span>
            <span v-if="propCreatedObjectRoom.view.required">
              *
            </span>
          </h3>
          <radioButtons
            :propErrorClass="errors.includes('view')"
            radioButtonsView="wrapHalf"
            radioButtonsId="roomViewAddObject"
            :items="roomHouseView"
            :value.sync="roomHouseViewSelectedItem"
          />
        </div>
      </div>
    </div>

    <div class="form__row">
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Год постройки
        </span>
        <span v-if="propCreatedObjectRoom.year.required">
          *
        </span>
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <multiselect
            v-model="roomYearsValue"
            :options="roomYearsList"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Год постройки"
          />
        </div>
      </div>
    </div>

    <div class="form__row">
      <h3 class="
        title
        title_h5
        title_bold
        form__title
        form__title_add-object
      ">
        Этажи
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div
          ref="floor"
          class="form__block-width form__block-width-third"
        >
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            Этаж*
          </h4>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('floor')
            }"
            v-model="roomFloorSelectedItem"
            :options="filterDataDefaultClone.appFloorAllListCurrent"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="false"
            label="label"
            track-by="label"
            placeholder="Этаж"
          />
          <p
            v-if="this.errors.includes('floor')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать этаж
          </p>
        </div>
        <div
          ref="floorAll"
          class="form__block-width form__block-width-third"
        >
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            Этажей всего*
          </h4>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('floorAll')
            }"
            v-model="floorAll"
            :options="filterDataDefaultClone.appFloorAllList"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="false"
            label="label"
            track-by="label"
            placeholder="Этажей всего"
          />
          <p
            v-if="this.errors.includes('floorAll')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать общее количество этажей здания
          </p>
        </div>
      </div>
    </div>

    <addObjectComfort
      v-if="
        propCreatedObject.deal.value
        && propCreatedObject.deal.value.slug === 'rent'
      "
      :propCreatedObjectComfort="propCreatedObject"
      :propDefaultValue="propDefaultValue"
    />

  </div>
</template>

<script>
import multiselect from 'vue-multiselect';
import { mapState, store, commit } from 'vuex';
import radioButtons from '@cmp/common/radioButtons.vue';
import addObjectComfort from '@cmp/addObject/desktop/addObjectComfort.vue';
import inputWithUnit from '@cmp/common/inputWithUnit.vue';

export default {
  name: 'addObjectRoom',
  components: {
    multiselect,
    radioButtons,
    inputWithUnit,
    addObjectComfort,
  },
  props: {
    propCreatedObject: {
      type: Object,
      default: {},
      required: true,
    },
    propValidateErrors: {
      type: Array,
      default: [],
      required: true,
    },
    propDefaultValue: {
      type: Object,
      default: function () {
        return {};
      },
      required: false,
    },
    propIsObjectDataEdited: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      errors: [],
    }
  },
  computed: {
    ...mapState([
      'isEditObjectPage',
      'filterDataDefault',
    ]),
    /*
      Object "room" room area.
    */
    // Object "room" room area items with the selected element.
    roomAreaItems() {
      this.propCreatedObjectRoom.area.value = +this.propDefaultValue.roomArea
      return +this.propDefaultValue.roomArea;
    },
    // Object "room" room area selected item value.
    roomAreaSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectRoom.area.value;
      },
      set(value) {
        this.propCreatedObjectRoom.area.value = value;
        this.compareDataForEdit(+value, this.propDefaultValue.roomArea, 'area');
      }
    },
    /*
      Object "room" rooms count.
    */
    // Object "room" rooms count items with the selected element.
    roomRooms() {
      let array = this.gConvertRangeToArray(this.filterDataDefaultClone.roomRooms);
      array.push({
        label: '9+',
        slug: '9+',
      });
      return array;
    },
    // Object "room" rooms count selected item value.
    roomRoomsCountValue: {
      cache: false,
      get() {
        return this.propCreatedObjectRoom.roomsCount.value;
      },
      set(value) {
        this.propCreatedObjectRoom.roomsCount.value = value;
        this.compareDataForEdit(value.slug, +this.propDefaultValue.roomsCountSlug, 'roomsCount');
      }
    },
    /*
      Object "room" house view.
    */
    // Object house view
    roomHouseView() {
      let resultArray;
      const objectRoomViewArrayCopy = [...this.filterDataDefaultClone.appView];
      if (this.propDefaultValue.roomViewSlug) {
        resultArray = objectRoomViewArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.roomViewSlug) {
              item.checked = true;
              // this.propCreatedObjectRoom.view.value = item;
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = objectRoomViewArrayCopy;
      }
      return resultArray;
    },
    // Object "room" house view selected item value.
    roomHouseViewSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectRoom.view.value;
      },
      set(value) {
        this.propCreatedObjectRoom.view.value = value;
        console.log('roomHouseViewSelectedItem ::', value.slug, this.propDefaultValue.roomViewSlug);
        this.compareDataForEdit(value.slug, this.propDefaultValue.roomViewSlug, 'view');
      }
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    roomYearsList() {
      const currentYear = new Date().getFullYear();
      const startYear = this.filterDataDefaultClone.appYearsStartPosition;
      let yearsArray = [];
      for (let i = startYear; i <= currentYear; i++) {
        if (i === this.propDefaultValue.year) {
          this.propCreatedObjectRoom.year.value = {
            'slug': i,
            'label': i
          };
        }
        yearsArray.push(
          {
            'slug': i,
            'label': i
          }
        );
      }
      return yearsArray.reverse();
    },
    roomYearsValue: {
      cache: false,
      get() {
        return this.propCreatedObjectRoom.year.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.year, 'year');
        this.propCreatedObjectRoom.year.value = value;
      }
    },
    floorAll: {
      cache: false,
      get() {
        return this.propCreatedObjectRoom.floorAll.value;
      },
      set(value) {
        // If a user select floorFull more than floorCurrent.
        if (this.propCreatedObjectRoom.floor && value.slug < this.propCreatedObjectRoom.floor.slug) {
          // Then floorCurrent will be a null.
          this.propCreatedObjectRoom.floor = null;
        }
        console.log('this.filterDataDefaultClone ::', this.filterDataDefaultClone);
        // All floors that bigger than selected floorAll value will be disabled.
        this.filterDataDefaultClone.appFloorAllListCurrent.forEach(
          item => {
            // Convert slug string to number and add a value +1.
            const selectedNumber = +value.slug + 1;
            if (item.slug >= selectedNumber ) {
              item.$isDisabled = true;
            } else {
              item.$isDisabled = false;
            }
          }
        )
        this.compareDataForEdit(value.slug, this.propDefaultValue.floorAll, 'floorAll');
        this.propCreatedObjectRoom.floorAll.value = value;
      }
    },
    propCreatedObjectRoom() {
      let roomObjectCopy = {...this.propCreatedObject.room};
      // If page is "Edit object" page.
      if (this.isEditObjectPage) {
        console.log('this.isEditObjectPage ::');

        // Object "room" type
        const newRoomsCount = {
          slug: this.propDefaultValue.roomsCountSlug,
          label: this.propDefaultValue.roomsCountLabel,
        };
        roomObjectCopy.roomsCount.value = newRoomsCount;

        // Object "room" house view
        const newRoomView = {
          slug: this.propDefaultValue.roomViewSlug,
          label: this.propDefaultValue.roomViewLabel,
        };
        roomObjectCopy.view.value = newRoomView;
      }
      // Add an 'edited' property to the object.
      const editedObject = this.addEditedPropertyToObjectItems(roomObjectCopy);
      return editedObject;
    },
    roomFloorSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectRoom.floor.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.floor, 'floor');
        this.propCreatedObjectRoom.floor.value = value;
        // All floors that less than selected floor value will be disabled.
        this.filterDataDefaultClone.appFloorAllList.forEach(
          item => {
            // Convert slug string to number and add a value +1.
            const selectedNumber = +value.slug - 1;
            if (item.slug <= selectedNumber ) {
              item.$isDisabled = true;
            } else {
              item.$isDisabled = false;
            }
          }
        )
      }
    },
  },
  watch: {
    currentAddress: {
      handler(value) {
        this.createdObject.address = value;
      },
      deep: true
    },
    propValidateErrors: {
      handler(value) {
        this.errors = value;
      },
      deep: true
    },
    propIsObjectDataEdited() {
      let roomObjectCopy = {...this.propCreatedObject.room};
      console.log('propDefaultValue ::', this.propDefaultValue);
      // Add an 'edited' property to the object.
      const editedObject = this.addEditedPropertyToObjectItems(roomObjectCopy);
      return editedObject;
    },
  },
  methods: {
    // Add an 'edited' property to the object.
    addEditedPropertyToObjectItems(object) {
      for(const key in object) {
        if (typeof object[key] === 'object') {
          object[key].edited = false;
        }
      }
      return object;
    },
    // Compare each property whether it was edited or not.
    compareDataForEdit(value1, value2, key) {
      if (value1 === value2) {
        this.propCreatedObjectRoom[key].edited = false;
      } else {
        this.propCreatedObjectRoom[key].edited = true;
      }
      this.checkFullObjectForEditedProperties(this.propCreatedObjectRoom);
    },
    // Check all properties of the object whether they were edited or not.
    checkFullObjectForEditedProperties(object) {
      let count = 0;
      for (const key in object) {
        if (object[key].edited === true) {
          count++;
        }
        if (count > 0) {
          this.objectIsEdited(true);
        } else {
          this.objectIsEdited(false);
        }
      }
    },
    objectIsEdited(flag) {
      this.$emit('update:propIsObjectDataEdited', flag)
    },
    fillTheFormWithObjectData() {
      if (this.propDefaultValue.floor) {
        this.propCreatedObjectRoom.floor.value = {
          label: this.propDefaultValue.floor,
          slug: this.propDefaultValue.floor,
        };
      }
      if (this.propDefaultValue.floorAll) {
        this.floorAll = {
          label: this.propDefaultValue.floorAll,
          slug: this.propDefaultValue.floorAll,
        };
      }
    },
  },
  mounted() {
    if (this.propDefaultValue) {
      this.fillTheFormWithObjectData();
    }
  },
};
</script>