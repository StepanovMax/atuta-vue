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
              Тип объекта
            </span>
            <span v-if="propCreatedObjectGarage.type.required">
              *
            </span>
          </h3>
          <radioButtons
            :propErrorClass="errors.includes('type')"
            radioButtonsView="listVertical"
            radioButtonsId="garageAddObject"
            :items="garageTypeList"
            :value.sync="garageTypeSelectedItem"
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
      ref="garageType"
      v-if="
        propCreatedObjectGarage.type.value
        && propCreatedObjectGarage.type.value.slug === 'garage'
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
            <span>
              Тип гаража
            </span>
            <span v-if="propCreatedObjectGarage.garageType.required">
              *
            </span>
          </h3>
          <radioButtons
            :propErrorClass="errors.includes('garageType')"
            key="garageTypeAddObject"
            radioButtonsView="listVertical"
            radioButtonsId="garageTypeAddObject"
            :items="garageSubTypeList"
            :value.sync="garageGarageSubTypeValue"
          />
          <p
            v-if="this.errors.includes('garageType')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать тип гаража
          </p>
        </div>
      </div>
    </div>

    <div
      ref="parkingType"
      v-if="
        propCreatedObjectGarage.type.value
        && propCreatedObjectGarage.type.value.slug === 'parking'
      "
      class="form__row"
    >
      <div class="
        form__row
        form__row_block-width
        form__row_block-width-half
      ">
        <div class="
          form__block-width 
          form__block-width-half
        ">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Тип машиноместа
            </span>
            <span v-if="propCreatedObjectGarage.parkingType.required">
              *
            </span>
          </h3>
          <radioButtons
            :propErrorClass="errors.includes('parkingType')"
            key="parkingTypeAddObject"
            radioButtonsView="listVertical"
            radioButtonsId="parkingTypeAddObject"
            :items="garageSubTypeList"
            :value.sync="garageParkingSubTypeValue"
          />
          <p
            v-if="this.errors.includes('parkingType')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать тип парковочного места
          </p>
        </div>
      </div>
    </div>

    <div
      ref="area"
      class="form__row"
    >

      <div
        v-if="
          propCreatedObjectGarage.type.value
          && propCreatedObjectGarage.type.value.slug === 'garage'
        "
        class="form__row"
      >
        <h3 class="
          form__title
          form__title_add-object
        ">
          <span>
            Площадь гаража
          </span>
          <span v-if="propCreatedObjectGarage.area.required">
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
              propUnit="meterSquare"
              :value.sync="garageAreaValue"
              :propValue="propGarageAreaValue"
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
          propCreatedObjectGarage.type.value
          && propCreatedObjectGarage.type.value.slug === 'parking'
        "
        class="form__row"
      >
        <h3 class="
          form__title
          form__title_add-object
        ">
          <span>
            Площадь машиноместа
          </span>
          <span v-if="propCreatedObjectGarage.area.required">
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
              propUnit="meterSquare"
              :value.sync="garageAreaValue"
              :propValue="propGarageAreaValue"
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

    </div>

    <div
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
            Охрана
          </h3>
          <switcher
            switcherId="securityAddObject"
            :items="garageSecurityList"
            :value.sync="garageSecuritySelectedItem"
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
    /*
      Object "garage" type.
    */
    // Object "garage" type items with the selected element.
    garageTypeList() {
      let resultArray;
      const arrayCopy = [...this.filterDataDefaultClone.garage];
      // console.log('this.propCreatedObjectGarage.type ::', this.propCreatedObjectGarage.type);
      if (
        this.propCreatedObjectGarage.type.value
        && this.propCreatedObjectGarage.type.value.slug
      ) {
        resultArray = arrayCopy.map(
          item => {
            if (item.slug === this.propCreatedObjectGarage.type.value.slug) {
              item.checked = true;
              // this.garageTypeSelectedItem = item;
              // this.propCreatedObjectGarage.type.value = item;
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
    // Object "garage" type selected item value.
    garageTypeSelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectGarage.type.value;
      },
      set(value) {
        this.propCreatedObjectGarage.type.value = value;
        const index = this.errors.indexOf(this.propCreatedObjectGarage.type.value.slug);
        if (this.propCreatedObjectGarage.type.value.slug === 'garage') {
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          this.propCreatedObjectGarage.parkingType.required = false;
          this.propCreatedObjectGarage.garageType.required = true;
        } else if (this.propCreatedObjectGarage.type.value.slug === 'parking') {
          const index = this.errors.indexOf('parkingType');
          if (index > -1) {
            this.errors.splice(index, 1);
          }
          this.propCreatedObjectGarage.parkingType.required = true;
          this.propCreatedObjectGarage.garageType.required = false;
        }
        // console.log('tt ::', value.slug, this.propDefaultValue.garageTypeSlug);
        this.compareDataForEdit(value.slug, this.propDefaultValue.garageTypeSlug, 'type');
      }
    },
    // Object subtype of a garage
    garageSubTypeList() {
      let resultArray;
      let subTypeArrayCopy;
      if (
        this.propCreatedObjectGarage.type.value
        && this.propCreatedObjectGarage.type.value.slug === 'garage'
      ) {
        subTypeArrayCopy = [...this.filterDataDefaultClone.garageTypes];
      } else if (
        this.propCreatedObjectGarage.type.value
        && this.propCreatedObjectGarage.type.value.slug === 'parking'
      ) {
        subTypeArrayCopy = [...this.filterDataDefaultClone.parkingTypes];
      }
      if (
        this.propCreatedObjectGarage.type.value
        && this.propCreatedObjectGarage.type.value.slug
      ) {
        resultArray = subTypeArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.garageSubTypeSlug) {
              item.checked = true;
              if (this.propDefaultValue.garageTypeSlug === 'garage') {
                
                this.propCreatedObjectGarage.garageType.value = item;
              } else if (this.propDefaultValue.garageTypeSlug === 'parking') {
                this.propCreatedObjectGarage.parkingType.value = item;
              }
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = subTypeArrayCopy;
      }
      return resultArray;
    },
    garageGarageSubTypeValue: {
      cache: false,
      get() {
        return this.propCreatedObjectGarage.garageType.value;
      },
      set(value) {
        console.log('ss ::', value.slug, this.propDefaultValue.garageSubTypeSlug);
        this.compareDataForEdit(value.slug, this.propDefaultValue.garageSubTypeSlug, 'garageType');
        this.propCreatedObjectGarage.garageType.value = value;
      }
    },
    garageParkingSubTypeValue: {
      cache: false,
      get() {
        return this.propCreatedObjectGarage.parkingType.value;
      },
      set(value) {
        // console.log('gg ::', value.slug, this.propDefaultValue.parkingSubTypeSlug);
        this.compareDataForEdit(value.slug, this.propDefaultValue.parkingSubTypeSlug, 'parkingType');
        this.propCreatedObjectGarage.parkingType.value = value;
      }
    },
    /*
      Object "garage" security.
    */
    // Object "garage" security items with the selected element.
    garageSecurityList() {
      let resultArray;
      const objectGarageSecurityArrayCopy = [...this.filterDataDefaultClone.security];
      if (this.propDefaultValue.garageSecurity) {
        resultArray = objectGarageSecurityArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.garageSecurity) {
              item.checked = true;
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = objectGarageSecurityArrayCopy;
      }
      return resultArray;
    },
    // Object "garage" security selected item value.
    garageSecuritySelectedItem: {
      cache: false,
      get() {
        return this.propCreatedObjectGarage.security.value;
      },
      set(value) {
        // console.log('aa', value.slug, this.propDefaultValue.garageSecurity);
        this.compareDataForEdit(value.slug, this.propDefaultValue.garageSecurity, 'security');
        this.propCreatedObjectGarage.security.value = value;
      }
    },
    /*
      Object "garage" area.
    */
    // Object "garage" area selected item value.
    garageAreaValue: {
      cache: false,
      get() {
        // console.log('this.propCreatedObjectGarage.area.value >> ', this.propCreatedObjectGarage.area.value);
        return +this.propCreatedObjectGarage.area.value;
      },
      set(value) {
        let newValue;
        this.compareDataForEdit(+value, +this.propDefaultValue.garageArea, 'area');
        if (value === '' || value === 0 || value === '0') {
          newValue = null;
        } else {
          newValue = +value;
        }
        this.propCreatedObjectGarage.area.value = newValue;
      }
    },
    propGarageAreaValue() {
      return +this.propDefaultValue.garageArea;
    },
    // Object "garage" area items with the selected element.
    propCreatedObjectGarage() {
      // console.log('propCreatedObjectGarage ::');
      let objectCopy = {...this.propCreatedObject.garage};
      // If page is "Edit object" page.
      if (this.isEditObjectPage) {
        // console.log('this.isEditObjectPage ::');

        // Object "garage" type.
        const newGarageType = {
          slug: this.propDefaultValue.garageTypeSlug,
          label: this.propDefaultValue.garageTypeLabel,
        };
        objectCopy.type.value = newGarageType;
        // console.log('objectCopy ::', objectCopy);

        // Object "garage" area.
        // this.propCreatedObjectGarage.area.value = this.propDefaultValue.garageArea;

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
        console.log('value watch ::', value);
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
        this.propCreatedObjectGarage[key].edited = false;
      } else {
        this.propCreatedObjectGarage[key].edited = true;
        if (key === 'garageType') {
          this.propCreatedObjectGarage['garageType'].edited = false;
          this.propCreatedObjectGarage['parkingType'].edited = true;
        } else if (key === 'parkingType') {
          this.propCreatedObjectGarage['garageType'].edited = true;
          this.propCreatedObjectGarage['parkingType'].edited = false;
        }

      }
      this.checkFullObjectForEditedProperties(this.propCreatedObjectGarage);
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
          // console.log('count ::', count, object[key].value.slug);
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
      // if (this.propDefaultValue.floor) {
      //   this.propCreatedObjectGarage.floor.value = {
      //     label: this.propDefaultValue.floor,
      //     slug: this.propDefaultValue.floor,
      //   };
      // }
      // if (this.propDefaultValue.floorAll) {
      //   this.floorAll = {
      //     label: this.propDefaultValue.floorAll,
      //     slug: this.propDefaultValue.floorAll,
      //   };
      // }
    },
  },
  mounted() {
    // console.log('propCreatedObjectGarage ::', this.propCreatedObjectGarage);
  },
};
</script>