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
            :value.sync="propCreatedObjectCommercial.area.value"
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
            :items="filterDataDefaultClone.commercialClass"
            :value.sync="propCreatedObjectCommercial.class.value"
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
        propCreatedObjectCommercial.type.value
        && propCreatedObjectCommercial.type.value.slug !== 'sector'
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
            v-model="propCreatedObjectCommercial.floor.value"
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
            :items="filterDataDefaultClone.tenant"
            :value.sync="propCreatedObjectCommercial.tenant.value"
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
            v-model="propCreatedObjectCommercial.year"
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
            v-model="propCreatedObjectCommercial.distance"
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
  },
  data() {
    return {
      errors: [],
      propCreatedObjectCommercial: this.propCreatedObject.commercial,
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
    ]),
    ...mapGetters([
      'getDistanceArray',
    ]),
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
};
</script>