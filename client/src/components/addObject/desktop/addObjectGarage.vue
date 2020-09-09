<template>
  <div class="form__row">

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
              Тип объекта
            </span>
            <span v-if="propCreatedObjectGarage.type.required">
              *
            </span>
          </h3>
          <radioButtons
            radioButtonsView="listVertical"
            radioButtonsId="garageAddObject"
            :items="filterDataDefaultClone.garage"
            :value.sync="typeVModel"
          />
        </div>
      </div>
    </div>

    <div
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
            key="garageTypeAddObject"
            radioButtonsView="listVertical"
            radioButtonsId="garageTypeAddObject"
            :items="filterDataDefaultClone.garageTypes"
            :value.sync="propCreatedObjectGarage.garageType.value"
          />
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
            key="parkingTypeAddObject"
            radioButtonsView="listVertical"
            radioButtonsId="parkingTypeAddObject"
            :items="filterDataDefaultClone.parkingTypes"
            :value.sync="propCreatedObjectGarage.parkingType.value"
          />
        </div>
      </div>
    </div>

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
          />
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
          />
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
  },
  data() {
    return {
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
        if (this.propCreatedObjectGarage.type.value.slug === 'garage') {
          this.propCreatedObjectGarage.parkingType.required = false;
          this.propCreatedObjectGarage.garageType.required = true;
        } else if (this.propCreatedObjectGarage.type.value.slug === 'parking') {
          this.propCreatedObjectGarage.parkingType.required = true;
          this.propCreatedObjectGarage.garageType.required = false;
        }
      }
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