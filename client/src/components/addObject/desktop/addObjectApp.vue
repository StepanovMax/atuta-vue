<template>
  <div>

    <div
      ref="type"
      class="form__row"
    >
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Тип объекта
            </span>
            <span v-if="propCreatedObjectApp.type.required">
              *
            </span>
          </h3>
          <switcher
            class="add-object-page__switcher"
            switcherId="typeAddObject"
            :items="filterDataDefaultClone.appTypes"
            :value.sync="objectTypeValue"
          />
          <p
            v-if="this.errors.includes('type')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать тип объекта
          </p>
        </div>
      </div>
    </div>

    <div
      ref="view"
      class="form__row"
    >
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Вид дома
            </span>
            <span v-if="propCreatedObjectApp.view.required">
              *
            </span>
          </h3>
          <radioButtons
            :propErrorClass="errors.includes('view')"
            radioButtonsView="wrapHalf"
            radioButtonsId="appViewAddObject"
            :items="viewOfHouse"
            :value.sync="viewOfHouseValue"
          />
          <p
            v-if="this.errors.includes('view')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать вид дома
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
            <span v-if="propCreatedObjectApp.roomsCount.required">
              *
            </span>
          </h3>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('roomsCount')
            }"
            v-model="objectRoomsCountValue"
            :options="filterDataDefaultClone.appRooms"
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

    <div
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Этажи
        </span>
        <span v-if="propCreatedObjectApp.floor.required">
          *
        </span>
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
            <span>
              Этаж
            </span>
            <span v-if="propCreatedObjectApp.floor.required">
              *
            </span>
          </h4>
          <multiselect
            key="appFloor"
            :class="{
              'multiselect_error': this.errors.includes('floor')
            }"
            v-model="objectFloorValue"
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
            <span>
              Этажей всего
            </span>
            <span v-if="propCreatedObjectApp.floorAll.required">
              *
            </span>
          </h4>
          <multiselect
            key="appFloorAllList"
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

    <div
      ref="year"
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Год постройки
        </span>
        <span v-if="propCreatedObjectApp.year.required">
          *
        </span>
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <multiselect
            v-model="objectYearOfBuildingValue"
            :options="appYearsList"
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
        form__title
        form__title_add-object
      ">
        <span>
          Площадь
        </span>
        <span v-if="propCreatedObjectApp.area.required">
          *
        </span>
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div
          ref="area"
          class="form__block-width form__block-width-third"
        >
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            <span>
              Общая площадь
            </span>
            <span v-if="propCreatedObjectApp.area.required">
              *
            </span>
          </h4>
          <inputWithUnit
            propType="number"
            propUnit="meterSquare"
            :value.sync="appAreaFull"
            :propValue="+propDefaultValue.appArea"
            :propErrorClass="{
              'input_error': this.errors.includes('area') || this.errorsArea.includes('area')
            }"
          />
          <p
            v-if="this.errors.includes('area')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать общую площадь
          </p>
        </div>
        <div
          ref="areaKitchen"
          class="form__block-width form__block-width-third"
        >
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            <span>
              Площадь кухни
            </span>
            <span v-if="propCreatedObjectApp.areaKitchen.required">
              *
            </span>
          </h4>
          <inputWithUnit
            propType="number"
            propUnit="meterSquare"
            :value.sync="appAreaKitchen"
            :propValue="+propDefaultValue.appAreaKitchen"
            :class="{
              'input_error': this.errorsArea.includes('appAreaKitchen')
            }"
          />
        </div>
        <div
          ref="areaLiving"
          class="form__block-width form__block-width-third"
        >
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            <span>
              Жилая площадь
            </span>
            <span v-if="propCreatedObjectApp.areaLiving.required">
              *
            </span>
          </h4>
          <inputWithUnit
            propType="number"
            propUnit="meterSquare"
            :value.sync="appAreaLiving"
            :propValue="+propDefaultValue.appAreaLiving"
            :class="{
              'input_error': this.errorsArea.includes('appAreaLiving')
            }"
          />
        </div>
      </div>
      <p
        v-if="this.errorsArea.includes('appAreaFull')"
        class="paragraph paragraph_invalid"
      >
        Сумма жилой площади и площади кухни не может быть больше или равна общей площади
      </p>
      <p
        v-if="this.errorsArea.includes('appAreaLiving')"
        class="paragraph paragraph_invalid"
      >
        Жилая площадь не может быть больше или равна общей площади
      </p>
      <p
        v-if="this.errorsArea.includes('appAreaKitchen')"
        class="paragraph paragraph_invalid"
      >
        Площадь кухни не может быть больше или равна общей площади
      </p>
    </div>

    <addObjectComfort
      v-if="
        propCreatedObject.deal.value
        && propCreatedObject.deal.value.slug === 'rent'
      "
      :propCreatedObjectComfort="propCreatedObject"
      :propDefaultValue="propDefaultValue"
      :propIsComfortObjectDataEdited.sync="isComfortObjectDataEdited"
    />

  </div>
</template>

<script>
import multiselect from 'vue-multiselect';
import { mapState, store, commit } from 'vuex';
import switcher from '@cmp/common/switcher.vue';
import radioButtons from '@cmp/common/radioButtons.vue';
import checkboxes from '@cmp/common/checkboxes.vue';
import addObjectComfort from '@cmp/addObject/desktop/addObjectComfort.vue';
import inputWithUnit from '@cmp/common/inputWithUnit.vue';

export default {
  name: 'addObjectApp',
  components: {
    switcher,
    checkboxes,
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
      errorsArea: [],
      createdObject: {},
      appAreaFullData: null,
      appAreaKitchenData: null,
      appAreaLivingData: null,
      isComfortObjectDataEdited: false,
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
      'objectDataSelected',
    ]),
    roomBedCount() {
      const array = this.gConvertRangeToArray(this.filterDataDefaultClone.roomBedCount);
      const resultedArray = this.gAddPlusLastValueToArray(array);
      return resultedArray;
    },
    roomSleepingPlacesCount() {
      const array = this.gConvertRangeToArray(this.filterDataDefaultClone.roomSleepingPlacesCount);
      const resultedArray = this.gAddPlusLastValueToArray(array);
      return resultedArray;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    floorAll: {
      cache: false,
      get() {
        return this.propCreatedObjectApp.floorAll.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.floorAll, 'floorAll');
        // If a user select floorFull more than floorCurrent.
        if (this.propCreatedObjectApp.floor && value.slug < this.propCreatedObjectApp.floor.slug) {
          // Then floorCurrent will be a null.
          this.propCreatedObjectApp.floor = null;
        }
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
        this.propCreatedObjectApp.floorAll.value = value;
      }
    },
    objectFloorValue: {
      cache: false,
      get() {
        return this.propCreatedObjectApp.floor.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.floor, 'floor');
        this.propCreatedObjectApp.floor.value = value;
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
    appYearsList() {
      const currentYear = new Date().getFullYear();
      const startYear = this.filterDataDefaultClone.appYearsStartPosition;
      let yearsArray = [];
      for (let i = startYear; i <= currentYear; i++) {
        yearsArray.push(
          {
            'slug': i,
            'label': i
          }
        );
      }
      return yearsArray.reverse()
    },
    appAreaFull: {
      cache: false,
      get() {
        return this.appAreaFullData;
      },
      set(value) {
        this.compareDataForEdit(value, this.propDefaultValue.appArea, 'area');
        this.appAreaFullData = this.validateNumbers(value);
        this.propCreatedObjectApp.area.value = this.appAreaFullData;
        this.validateArea();
      }
    },
    appAreaKitchen: {
      cache: false,
      get() {
        return this.appAreaKitchenData;
      },
      set(value) {
        this.compareDataForEdit(value, this.propDefaultValue.appAreaKitchen, 'areaKitchen');
        this.appAreaKitchenData = this.validateNumbers(value);
        this.propCreatedObjectApp.areaKitchen.value = this.appAreaKitchenData;
        this.validateArea();
      }
    },
    appAreaLiving: {
      cache: false,
      get() {
        return this.appAreaLivingData;
      },
      set(value) {
        // console.log('value >>', value, this.propDefaultValue.appAreaLiving);
        this.compareDataForEdit(value, this.propDefaultValue.appAreaLiving, 'areaLiving');
        if (value === '0') {
          this.errorsArea.push('appAreaLiving');
        } else {
          const index = this.errorsArea.indexOf('appAreaLiving');
          this.errorsArea.splice(index, 1);
        }
        this.appAreaLivingData = this.validateNumbers(value);
        this.propCreatedObjectApp.areaLiving.value = this.appAreaLivingData;
        this.validateArea();
      }
    },
    // Object house view
    viewOfHouse() {
      let resultArray;
      const objectAppViewArrayCopy = [...this.filterDataDefaultClone.appView];
      if (this.propDefaultValue.appViewSlug) {
        resultArray = objectAppViewArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.appViewSlug) {
              item.checked = true;
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = objectAppViewArrayCopy;
      }
      return resultArray;
    },
    viewOfHouseValue: {
      cache: false,
      get() {
        return this.propCreatedObjectApp.view.value;
      },
      set(value) {
        // console.log('== ', value.slug, this.propDefaultValue.appViewSlug);
        this.compareDataForEdit(value.slug, this.propDefaultValue.appViewSlug, 'view');
        this.propCreatedObjectApp.view.value = value;
      }
    },
    objectTypeValue: {
      cache: false,
      get() {
        return this.propCreatedObjectApp.type.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.appTypeSlug, 'type');
        this.propCreatedObjectApp.type.value = value;
      }
    },
    objectRoomsCountValue: {
      cache: false,
      get() {
        return this.propCreatedObjectApp.roomsCount.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.roomsCountSlug, 'roomsCount');
        this.propCreatedObjectApp.roomsCount.value = value;
      }
    },
    objectYearOfBuildingValue: {
      cache: false,
      get() {
        return this.propCreatedObjectApp.year.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.year, 'year');
        this.propCreatedObjectApp.year.value = value;
      }
    },
    propCreatedObjectApp() {
      let appObjectCopy = {...this.propCreatedObject.app};
      // Add an 'edited' property to the object.
      const editedObject = this.addEditedPropertyToObjectItems(appObjectCopy);
      return editedObject;
    },
  },
  watch: {
    isComfortObjectDataEdited(value) {
      console.log('isComfortObjectDataEdited / watch ::', value);
    },
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
        this.propCreatedObjectApp[key].edited = false;
      } else {
        this.propCreatedObjectApp[key].edited = true;
      }
      this.checkFullObjectForEditedProperties(this.propCreatedObjectApp);
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
      // Object subtype
      let objectSubtypeArrayCopy = [...this.filterDataDefaultClone.appTypes];
      this.filterDataDefaultClone.appTypes = objectSubtypeArrayCopy.map(
        item => {
          if (item.slug === this.propDefaultValue.appTypeSlug) {
            item.checked = true;
          }
          return item;
        }
      )
      // console.log('this.filterDataDefaultClone.appTypes ::', this.filterDataDefaultClone.appTypes);
      // Object rooms count
      this.filterDataDefaultClone.appRooms.map(
        item => {
          // console.log('item.slug ::', item.slug,);
          if (item.slug === this.propDefaultValue.roomsCountSlug) {
            // console.log('item.slug ::', item.slug);
            this.propCreatedObjectApp.roomsCount.value = item;
          }
        }
      )
      // Object floor
      this.filterDataDefaultClone.appFloorAllListCurrent.map(
        item => {
          // console.log('item.slug ::', item.slug,);
          if (item.slug === this.propDefaultValue.floor) {
            this.propCreatedObjectApp.floor.value = item;
          }
        }
      )
      // Object floor all
      this.filterDataDefaultClone.appFloorAllList.map(
        item => {
          // console.log('item.slug ::', item.slug,);
          if (item.slug === this.propDefaultValue.floorAll) {
            this.floorAll = item;
          }
        }
      )
      // Object year
      this.appYearsList.map(
        item => {
          // console.log('item.slug ::', item.slug,);
          if (item.slug === this.propDefaultValue.year) {
            this.propCreatedObjectApp.year.value = item;
          }
        }
      )
    },
    validateNumbers(value) {
      const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
      return trimmedValue;
    },
    validateArea() {
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaKitchen)) {
        if (this.appAreaFull <= this.appAreaKitchen) {
          this.errorsArea.push('appAreaKitchen');
          this.propCreatedObjectApp.areaKitchen.error = true;
        } else {
          this.propCreatedObjectApp.areaKitchen.error = false;
          const indexAppAreaKitchen = this.errorsArea.indexOf('appAreaKitchen');
          this.errorsArea.splice(indexAppAreaKitchen, 1);
          const indexAppAreaFull = this.errorsArea.indexOf('appAreaFull');
          this.errorsArea.splice(indexAppAreaFull, 1);
        }
      }
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaLiving)) {
        if (this.appAreaFull <= this.appAreaLiving) {
          this.errorsArea.push('appAreaLiving');
          this.propCreatedObjectApp.areaLiving.error = true;
        } else {
          this.propCreatedObjectApp.areaLiving.error = false;
          const indexAppAreaLiving = this.errorsArea.indexOf('appAreaLiving');
          this.errorsArea.splice(indexAppAreaLiving, 1);
          const indexAppAreaFull = this.errorsArea.indexOf('appAreaFull');
          this.errorsArea.splice(indexAppAreaFull, 1);
        }
      }
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaKitchen) && Boolean(this.appAreaLiving)) {
        const sumKitchenWithLiving = +this.appAreaKitchen + +this.appAreaLiving;
        if (this.appAreaFull <= sumKitchenWithLiving) {
          this.errorsArea.push('appAreaFull');
          this.propCreatedObjectApp.area.error = true;
        } else {
          this.propCreatedObjectApp.area.error = false;
          const indexAppAreaKitchen = this.errorsArea.indexOf('appAreaLiving');
          this.errorsArea.splice(indexAppAreaKitchen, 1);
          const indexAppAreaLiving = this.errorsArea.indexOf('appAreaLiving');
          this.errorsArea.splice(indexAppAreaLiving, 1);
          const indexAppAreaFull = this.errorsArea.indexOf('appAreaFull');
          this.errorsArea.splice(indexAppAreaFull, 1);
        }
      }
    },
  },
  mounted() {
    // console.log('  >> propDefaultValue ::', this.propDefaultValue);
    if (this.propDefaultValue) {
      this.fillTheFormWithObjectData();
    }
  },
};
</script>