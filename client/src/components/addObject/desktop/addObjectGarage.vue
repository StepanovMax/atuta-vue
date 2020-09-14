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
            :items="filterDataDefaultClone.garage"
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
            :items="filterDataDefaultClone.garageTypes"
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
            :items="filterDataDefaultClone.parkingTypes"
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
          Площадь машиноместа
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
            :items="filterDataDefaultClone.security"
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
    // validateNumbers(value) {
    //   const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
    //   return trimmedValue;
    // },
  },
};
</script>