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
            :items="typeOfGarage"
            :value.sync="typeVModel"
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
            :items="subTypeOfGarage"
            :value.sync="propCreatedObjectGarage.garageType.value"
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
            :items="subTypeOfGarage"
            :value.sync="propCreatedObjectGarage.parkingType.value"
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
              :value.sync="propCreatedObjectGarage.area.value"
              :propValue="areaOfGarage"
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
              :value.sync="propCreatedObjectGarage.area"
              :propValue="+propDefaultValue.garageArea"
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
            :items="securityOfGarage"
            :value.sync="propCreatedObjectGarage.security"
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
  },
  data() {
    return {
      errors: [],
      propCreatedObjectGarage: this.propCreatedObject.garage,
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
    ]),
    ...mapGetters([
      'getDistanceArray',
    ]),
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    typeVModel: {
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
      }
    },
    // Object type garage
    typeOfGarage() {
      let resultArray;
      const objectGarageTypeArrayCopy = [...this.filterDataDefaultClone.garage];
      if (this.propDefaultValue.garageTypeSlug) {
        resultArray = objectGarageTypeArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.garageTypeSlug) {
              item.checked = true;
              this.typeVModel = item;
              // this.propCreatedObjectGarage.type.value = item;
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = objectGarageTypeArrayCopy;
      }
      return resultArray;
    },
    // Object subtype of a garage
    subTypeOfGarage() {
      let resultArray;
      let objectGarageSubTypeArrayCopy;
      if (
        this.propDefaultValue.garageTypeSlug
        && this.propDefaultValue.garageTypeSlug === 'garage'
      ) {
        objectGarageSubTypeArrayCopy = [...this.filterDataDefaultClone.garageTypes];
      } else if (
        this.propDefaultValue.garageTypeSlug
        && this.propDefaultValue.garageTypeSlug === 'parking'
      ) {
        objectGarageSubTypeArrayCopy = [...this.filterDataDefaultClone.parkingTypes];
      }
      if (this.propDefaultValue.garageSubTypeSlug) {
        resultArray = objectGarageSubTypeArrayCopy.map(
          item => {
            // console.log('truee ::', item.slug, this.propDefaultValue);
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
        resultArray = objectGarageSubTypeArrayCopy;
      }
      console.log('resultArray ::', resultArray);
      return resultArray;
    },
    // Garage security
    securityOfGarage() {
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
    // Garage area
    areaOfGarage() {
      if (this.propDefaultValue && this.propDefaultValue.garageArea) {
        this.propCreatedObjectGarage.area.value = this.propDefaultValue.garageArea;
      }
      return +this.propDefaultValue.garageArea;
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
};
</script>