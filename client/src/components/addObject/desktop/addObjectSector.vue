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
            v-model="propCreatedObjectSector.type.value"
            :options="filterDataDefaultClone.sectorType"
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
            :value.sync="propCreatedObjectSector.area.value"
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
            :value.sync="propCreatedObjectSector.facade.value"
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
            v-model="propCreatedObjectSector.distance.value"
            :options="getDistanceArray"
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
            :items="filterDataDefaultClone.appOnlineShow"
            :value.sync="propCreatedObjectSector.availabilityOfBuildings"
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
      propCreatedObjectSector: this.propCreatedObject.sector,
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
    // validateNumbers(value) {
    //   const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
    //   return trimmedValue;
    // },
  },
};
</script>