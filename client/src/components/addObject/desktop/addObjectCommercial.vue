<template>
  <div class="form__row">

    <div class="form__row">
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
            Тип объекта
          </h3>
          <radioButtons
            key="objectCommercialTypeAddObject"
            radioButtonsView="wrapHalf"
            radioButtonsId="objectCommercialTypeAddObject"
            :items="filterDataDefaultClone.commercialView"
            :value.sync="propCreatedObjectCommercial.type"
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
            Площадь
          </h3>
          <inputWithUnit
            propType="number"
            :propUnit="sectorUnit"
            :value.sync="propCreatedObjectCommercial.area"
          />
        </div>
      </div>
    </div>

    <div
      v-if="
        propCreatedObjectCommercial.type
        && propCreatedObjectCommercial.type.slug === 'sector'
      "
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        Фасад
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
            :value.sync="propCreatedObjectCommercial.facade"
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
            Класс здания
          </h3>
          <radioButtons
            key="buildingTypeAddObject"
            radioButtonsView="listVertical"
            radioButtonsId="buildingTypeAddObject"
            :items="filterDataDefaultClone.commercialClass"
            :value.sync="propCreatedObjectCommercial.class"
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
        <div class="form__block-width form__block-width-third">
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
            v-model="floorAll"
            :options="filterDataDefaultClone.appFloorAllList"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Этажей всего"
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
            Этаж*
          </h4>
          <multiselect
            v-model="propCreatedObjectCommercial.floor"
            :options="filterDataDefaultClone.appFloorAllListCurrent"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Этаж"
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
            Наличие арендатора
          </h3>
          <switcher
            switcherId="tenantAddObject"
            :items="filterDataDefaultClone.tenant"
            :value.sync="propCreatedObjectCommercial.tenant"
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
  },
  data() {
    return {
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
        this.propCreatedObjectCommercial.type
        && this.propCreatedObjectCommercial.type.slug === 'sector'
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
        return this.propCreatedObjectCommercial.floorAll;
      },
      set(value) {
        // If a user select floorFull more than floorCurrent.
        if (this.propCreatedObjectCommercial.floor && value.slug < this.propCreatedObjectCommercial.floor.slug) {
          // Then floorCurrent will be a null.
          this.propCreatedObjectCommercial.floor = null;
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
        this.propCreatedObjectCommercial.floorAll = value;
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
};
</script>