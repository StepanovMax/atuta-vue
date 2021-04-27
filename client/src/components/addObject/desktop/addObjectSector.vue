<template>
  <div class="form__row">

    <div
      ref="type"
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
              Тип участка
            </span>
            <span v-if="propCreatedObjectSector.type.required">
              *
            </span>
          </h3>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('type')
            }"
            v-model="sectorTypeSelectedItem"
            :options="sectorTypeItems"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Тип участка"
          />
          <p
            v-if="this.errors.includes('type')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать тип участка
          </p>
        </div>
      </div>
    </div>

    <div
      ref="area"
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Площадь участка
        </span>
        <span v-if="propCreatedObjectSector.area.required">
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
            propUnit="acr"
            :value.sync="sectorAreaSeletedItem"
            :propValue="sectorAreaPropValue"
            :propErrorClass="{
              'input_error': this.errors.includes('area')
            }"
          />
          <p
            v-if="this.errors.includes('area')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать площадь участка
          </p>
        </div>
      </div>
    </div>

    <div class="form__row">
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Фасад
        </span>
        <span v-if="propCreatedObjectSector.facade.required">
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
            :value.sync="sectorFacadeSeletedItem"
            :propValue="sectorFacadePropValue"
          />
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
              Расстояние до города
            </span>
            <span v-if="propCreatedObjectSector.distance.required">
              *
            </span>
          </h3>
          <multiselect
            v-model="sectorDistanceSelectedItem"
            :options="sectorDistanceItems"
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

    <div class="form__row">
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Наличие строений
            </span>
            <span v-if="propCreatedObjectSector.availabilityOfBuildings.required">
              *
            </span>
          </h3>
          <switcher
            class="add-object-page__switcher"
            switcherId="objectViewAddObject"
            :items="presenceOfBuildingsOnTheSector"
            :value.sync="presenceOfBuildingsSeletedItem"
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
  name: 'addObjectSector',
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
      sectorTypeValue: {
        slug: this.propDefaultValue.sectorTypeSlug,
        label: this.propDefaultValue.sectorTypeLabel,
      },
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
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    // Type of sector
    typeOfSector: {
      cache: false,
      get() {
        return this.sectorTypeValue;
      },
      set(value) {
        this.sectorTypeValue = value;
        this.propCreatedObjectSector.type.value = value;
      },
    },
    /*
      Object "sector" type.
    */
    // Object "sector" type items with the selected element.
    sectorTypeItems() {
      let resultArray;
      const arrayCopy = [...this.filterDataDefaultClone.sectorType];
      console.log('this.propDefaultValue ::', this.propDefaultValue);
      if (this.propDefaultValue.sectorTypeSlug) {
        resultArray = arrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.sectorTypeSlug) {
              item.checked = true;
              // this.propCreatedObjectSector.type.value = item;
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
    // Object "sector" type selected item value.
    sectorTypeSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectSector.type.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.sectorTypeSlug, 'type');
        this.propCreatedObjectSector.type.value = value;
      }
    },
    /*
      Object "sector" distance.
    */
    // Type of sector
    sectorDistanceItems() {
      if (this.propDefaultValue.distanceSlug && this.propDefaultValue.distanceLabel) {
        this.propCreatedObjectSector.distance.value = {
          slug: this.propDefaultValue.distanceSlug,
          label: this.propDefaultValue.distanceLabel,
        };
      }
      return this.getDistanceArray;
    },
    // Object "sector" distance selected item value.
    sectorDistanceSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectSector.distance.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug.toString(), this.propDefaultValue.distanceSlug, 'distance');
        this.propCreatedObjectSector.distance.value = value;
      }
    },
    /*
      Object "sector" area.
    */
    // Object "sector" area property.
    sectorAreaPropValue() {
      if (this.propDefaultValue && this.propDefaultValue.sectorArea) {
        this.propCreatedObjectSector.area.value = this.propDefaultValue.sectorArea;
      }
      return +this.propDefaultValue.sectorArea;
    },
    // Object "sector" area selected item value.
    sectorAreaSeletedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectSector.area.value;
      },
      set(value) {
        this.compareDataForEdit(value, this.propDefaultValue.sectorArea, 'area');
        this.propCreatedObjectSector.area.value = value;
      }
    },
    /*
      Object "sector" facade.
    */
    // Object "sector" facade property.
    sectorFacadePropValue() {
      if (this.propDefaultValue && this.propDefaultValue.sectorFacade) {
        this.propCreatedObjectSector.facade.value = this.propDefaultValue.sectorFacade;
      }
      return +this.propDefaultValue.sectorFacade;
    },
    // Object "sector" facade selected item value.
    sectorFacadeSeletedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectSector.facade.value;
      },
      set(value) {
        const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
        this.compareDataForEdit(trimmedValue, +this.propDefaultValue.sectorFacade, 'facade');
        this.propCreatedObjectSector.facade.value = value;
      }
    },
    // Presence of buildings on the sector
    presenceOfBuildingsOnTheSector() {
      let resultArray;
      const arrayCopy = [...this.filterDataDefaultClone.appOnlineShow];
      if (this.propDefaultValue.sectorAvailabilityOfBuildings) {
        resultArray = arrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.sectorAvailabilityOfBuildings) {
              item.checked = true;
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
    // Object "sector" facade selected item value.
    presenceOfBuildingsSeletedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectSector.availabilityOfBuildings.value;
      },
      set(value) {
        console.log('ll ::', value.slug, this.propDefaultValue.sectorAvailabilityOfBuildings);
        this.compareDataForEdit(value.slug, this.propDefaultValue.sectorAvailabilityOfBuildings, 'availabilityOfBuildings');
        this.propCreatedObjectSector.availabilityOfBuildings.value = value;
      }
    },
    propCreatedObjectSector() {
      // console.log('propCreatedObjectSector ::');
      let objectCopy = {...this.propCreatedObject.sector};
      // If page is "Edit object" page.
      if (this.isEditObjectPage) {

        // Object "sector" type.
        const newSectorType = {
          slug: this.propDefaultValue.sectorTypeSlug,
          label: this.propDefaultValue.sectorTypeLabel,
          labelShort: this.propDefaultValue.sectorTypeLabelShort,
        };
        objectCopy.type.value = newSectorType;
        // console.log('objectCopy ::', objectCopy);

      }
      // Add an 'edited' property to the object.
      const editedObject = this.addEditedPropertyToObjectItems(objectCopy);
      return editedObject;
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
        this.propCreatedObjectSector[key].edited = false;
      } else {
        this.propCreatedObjectSector[key].edited = true;
      }
      this.checkFullObjectForEditedProperties(this.propCreatedObjectSector);
    },
    // Check all properties of the object whether they were edited or not.
    checkFullObjectForEditedProperties(object) {
      let count = 0;
      for (const key in object) {
        if (
          key !== 'edited'
          && Boolean(object[key].value)
          && object[key].edited === true
        ) {
          count++;
          console.log('count ::', count, object[key].value.slug);
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
  },
};
</script>