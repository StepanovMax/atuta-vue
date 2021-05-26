<template>
  <div class="form__row">

    <div
      ref="area"
      class="form__row"
    >
      <div class="
        form__row
        form__row_block-width
        form__row_block-width-third
      ">
        <div class="
          form__block-width 
          form__block-width-third
        ">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Площадь
            </span>
            <span v-if="propCreatedObjectCommercial.area.required">
              *
            </span>
          </h3>
          <inputWithUnit
            propType="number"
            :propUnit="sectorUnit"
            :value.sync="commercialAreaSeletedItem"
            :propValue="commercialAreaPropValue"
            :propErrorClass="{
              'input_error': this.errors.includes('area')
            }"
          />
          <p
            v-if="this.errors.includes('area')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать площадь
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="
        propCreatedObjectCommercial.type.value
        && propCreatedObjectCommercial.type.value.slug === 'sector'
      "
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Фасад
        </span>
        <span v-if="propCreatedObjectCommercial.facade.required">
          *
        </span>
      </h3>
      <div class="
        form__row
        form__row_block-width
        form__row_block-width-third
      ">
        <div class="
          form__block-width 
          form__block-width-third
        ">
          <inputWithUnit
            propType="number"
            propUnit="meter"
            :value.sync="propCreatedObjectCommercial.facade.value"
            :propValue="facadeOfCommercial"
          />
        </div>
      </div>
    </div>

    <div
      ref="class"
      class="form__row"
    >
      <div class="
        form__row
        form__row_block-width
        form__row_block-width-third
      ">
        <div class="
          form__block-width 
          form__block-width-third
        ">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Класс здания
            </span>
            <span v-if="propCreatedObjectCommercial.class.required">
              *
            </span>
          </h3>
          <radioButtons
            :propErrorClass="errors.includes('class')"
            key="buildingTypeAddObject"
            radioButtonsView="listHorizontal"
            radioButtonsId="buildingTypeAddObject"
            :items="commercialClassItems"
            :value.sync="commercialClassSeletedItem"
          />
          <p
            v-if="this.errors.includes('class')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать класс здания
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="
        (
          propDefaultValue
          && propDefaultValue.commercialTypeSlug !== 'sector'
        )
        || (
          propCreatedObjectCommercial.type.value
          && propCreatedObjectCommercial.type.value.slug !== 'sector'
        )
      "
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Этажи
        </span>
        <span v-if="propCreatedObjectCommercial.floor.required">
          *
        </span>
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
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
            <span v-if="propCreatedObjectCommercial.floor.required">
              *
            </span>
          </h4>
          <multiselect
            v-model="commercialFloorSelectedItem"
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
        </div>
        <div class="form__block-width form__block-width-third">
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
            <span v-if="propCreatedObjectCommercial.floorAll.required">
              *
            </span>
          </h4>
          <multiselect
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
        </div>
      </div>
    </div>

    <div class="form__row">
      <div class="
        form__row
        form__row_block-width
        form__row_block-width-third
      ">
        <div class="
          form__block-width 
          form__block-width-third
        ">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Наличие арендатора
            </span>
            <span v-if="propCreatedObjectCommercial.tenant.required">
              *
            </span>
          </h3>
          <switcher
            switcherId="tenantAddObject"
            :items="commercialTenantItems"
            :value.sync="commercialTenantSelectedItem"
          />
        </div>
      </div>
    </div>

    <div
      v-if="
        propCreatedObjectCommercial.type.value
        && propCreatedObjectCommercial.type.value.slug !== 'sector'
      "
      class="form__row"
    >
      <div class="
        form__row
        form__row_block-width
        form__row_block-width-third
      ">
        <div class="
          form__block-width 
          form__block-width-third
        ">
          <h3 class="
            form__title
            form__title_add-object
          ">
            Год постройки
          </h3>
          <multiselect
            v-model="commercialYearSelectedItem"
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
      <div class="
        form__row
        form__row_block-width
        form__row_block-width-third
      ">
        <div class="
          form__block-width 
          form__block-width-third
        ">
          <h3 class="
            form__title
            form__title_add-object
          ">
            Расстояние до города
          </h3>
          <multiselect
            v-model="commercialDistanceSelectedItem"
            :options="commercialDistanceItems"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="false"
            label="label"
            track-by="label"
            placeholder="Расстояние до города"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import multiselect from 'vue-multiselect';
import switcher from '../../common/switcher.vue';
import radioButtons from '../../common/radioButtons.vue';
import inputWithUnit from '../../common/inputWithUnit.vue';
import { mapState, mapGetters, store, commit } from 'vuex';

export default {
  name: 'addObjectCommercial',
  components: {
    switcher,
    multiselect,
    radioButtons,
    inputWithUnit,
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
    ...mapGetters([
      'getDistanceArray',
    ]),
    commercialFloorSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectCommercial.floor.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.floor, 'floor');
        this.propCreatedObjectCommercial.floor.value = value;
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
    sectorUnit() {
      let sectorUnitSlug;
      if (
        this.propCreatedObjectCommercial.type.value
        && this.propCreatedObjectCommercial.type.value.slug === 'sector'
      ) {
        sectorUnitSlug = 'acr';
      } else {
        sectorUnitSlug = 'meterSquare';
      }
      return sectorUnitSlug;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    commercialFloors() {
      const array = this.gConvertRangeToArray(this.filterDataDefaultClone.commercialFloorAll);
      const resultedArray = this.gAddPlusLastValueToArray(array);
      return resultedArray;
    },
    floorAll: {
      cache: false,
      get() {
        return this.propCreatedObjectCommercial.floorAll.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.floorAll, 'floorAll');
        // If a user select floorFull more than floorCurrent.
        if (this.propCreatedObjectCommercial.floor.value && value.slug < this.propCreatedObjectCommercial.floor.value.slug) {
          // Then floorCurrent will be a null.
          this.propCreatedObjectCommercial.floor.value = null;
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
        this.propCreatedObjectCommercial.floorAll.value = value;
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
    commercialYearSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectCommercial.year.value;
      },
      set(value) {
        console.log('vv ::', value.slug, this.propDefaultValue.year);
        this.compareDataForEdit(value.slug, this.propDefaultValue.year, 'year');
        this.propCreatedObjectCommercial.year.value = value;
      }
    },
    /*
      Object "commercial" area.
    */
    // Object "commercial" area property.
    commercialAreaPropValue() {
      if (this.propDefaultValue && this.propDefaultValue.commercialArea) {
        this.propCreatedObjectCommercial.area.value = this.propDefaultValue.commercialArea;
      }
      return +this.propDefaultValue.commercialArea;
    },
    // Object "commercial" area selected item value.
    commercialAreaSeletedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectCommercial.area.value;
      },
      set(value) {
        this.compareDataForEdit(value, this.propDefaultValue.commercialArea, 'area');
        this.propCreatedObjectCommercial.area.value = value;
      }
    },
    /*
      Object "commercial" class.
    */
    // Object "commercial" class items with the selected element.
    commercialClassItems() {
      let resultArray;
      const objectCommercialClassArrayCopy = [...this.filterDataDefaultClone.commercialClass];
      if (this.propDefaultValue.commercialClass) {
        resultArray = objectCommercialClassArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.commercialClass) {
              item.checked = true;
              this.propCreatedObjectCommercial.class.value = item;
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = objectCommercialClassArrayCopy;
      }
      return resultArray;
    },
    // Object "commercial" class selected item value.
    commercialClassSeletedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectCommercial.class.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.commercialClass, 'class');
        this.propCreatedObjectCommercial.class.value = value;
      }
    },
    /*
      Object "commercial" tenant.
    */
    // Object "commercial" tenant items with the selected element.
    commercialTenantItems() {
      let resultArray;
      const arrayCopy = [...this.filterDataDefaultClone.tenant];
      if (this.propDefaultValue.commercialTenant) {
        resultArray = arrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.commercialTenant) {
              item.checked = true;
              this.propCreatedObjectCommercial.tenant.value = item;
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = arrayCopy;
      }
      return resultArray;
    },
    // Object "commercial" tenant selected item value.
    commercialTenantSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectCommercial.tenant.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.commercialTenant, 'tenant');
        this.propCreatedObjectCommercial.tenant.value = value;
      }
    },
    /*
      Object "commercial" distance.
    */
    // Object "commercial" distance items with the selected element.
    commercialDistanceItems() {
      if (this.propDefaultValue.distanceSlug && this.propDefaultValue.distanceLabel) {
        this.propCreatedObjectCommercial.distance.value = {
          slug: this.propDefaultValue.distanceSlug,
          label: this.propDefaultValue.distanceLabel,
        };
      }
      return this.getDistanceArray;
    },
    // Object "commercial" distance selected item value.
    commercialDistanceSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectCommercial.distance.value;
      },
      set(value) {
        console.log('яя', value.slug, this.propDefaultValue.distanceSlug);
        this.compareDataForEdit(value.slug, this.propDefaultValue.distanceSlug, 'distance');
        this.propCreatedObjectCommercial.distance.value = value;
      }
    },
    // Garage area
    facadeOfCommercial() {
      if (this.propDefaultValue && this.propDefaultValue.facade) {
        this.propCreatedObjectCommercial.facade.value = this.propDefaultValue.facade;
      }
      return +this.propDefaultValue.facade;
    },
    propCreatedObjectCommercial() {
      // console.log('propCreatedObjectCommercial ::');
      let objectCopy = {...this.propCreatedObject.commercial};
      // If page is "Edit object" page.
      if (this.isEditObjectPage) {
        // Object "sector" type.
        const newCommercialYear = {
          slug: this.propDefaultValue.year,
          label: this.propDefaultValue.year,
        };
        objectCopy.year.value = newCommercialYear;

      }
      // Add an 'edited' property to the object.
      const editedObject = this.addEditedPropertyToObjectItems(objectCopy);
      return editedObject;
    },
    distanceValue: {
      cache: false,
      get() {
        return this.propCreatedObjectHouse.distance.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.distanceSlug, 'distance');
        this.propCreatedObjectHouse.distance.value = value;
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
        this.propCreatedObjectCommercial[key].edited = false;
      } else {
        this.propCreatedObjectCommercial[key].edited = true;
      }
      this.checkFullObjectForEditedProperties(this.propCreatedObjectCommercial);
    },
    // Check all properties of the object whether they were edited or not.
    checkFullObjectForEditedProperties(object) {
      let count = 0;
      for (const key in object) {
        // console.log('count ::', count, object[key].value.slug);
        if (
          key !== 'edited'
          && Boolean(object[key].value)
          && object[key].edited === true
        ) {
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
      if (this.propDefaultValue.floorAll) {
        this.floorAll = {
          label: this.propDefaultValue.floorAll,
          slug: this.propDefaultValue.floorAll,
        };
      }
      // Object floor
      this.filterDataDefaultClone.appFloorAllListCurrent.map(
        item => {
          // console.log('item.slug ::', item.slug,);
          if (item.slug === this.propDefaultValue.floor) {
            this.propCreatedObjectCommercial.floor.value = item;
          }
        }
      )
    },
  },
  mounted() {
    if (this.propDefaultValue) {
      this.fillTheFormWithObjectData();
    }
    // console.log('propCreatedObjectCommercial ::', this.propCreatedObjectCommercial);
  },
};
</script>