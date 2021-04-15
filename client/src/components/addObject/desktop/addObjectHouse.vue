<template>
  <Fragment>

    <div
      ref="type"
      class="form__row"
    >
      <div class="form__row form__row_block-width form__row_block-width-half">
        <div class="form__block-width form__block-width-half">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Вид объекта
            </span>
            <span v-if="propCreatedObjectHouse.type.required">
              *
            </span>
          </h3>
          <radioButtons
            :propErrorClass="errors.includes('type')"
            radioButtonsView="wrapHalf"
            radioButtonsId="objectViewAddObject"
            :items="typeOfHouse"
            :value.sync="propCreatedObjectHouse.type.value"
          />
          <p
            v-if="this.errors.includes('type')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать вид объекта
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
            <span v-if="propCreatedObjectHouse.roomsCount.required">
              *
            </span>
          </h3>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('roomsCount')
            }"
            v-model="propCreatedObjectHouse.roomsCount.value"
            :options="filterDataDefaultClone.houseRoomsCount"
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

    <div class="form__row">
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Год постройки
        </span>
        <span v-if="propCreatedObjectHouse.year.required">
          *
        </span>
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <multiselect
            v-model="propCreatedObjectHouse.year.value"
            :options="houseYearsList"
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
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Материал стен
            </span>
            <span v-if="propCreatedObjectHouse.wall.required">
              *
            </span>
          </h3>
          <multiselect
            v-model="propCreatedObjectHouse.wall.value"
            :options="houseWallMaterial"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Материал стен"
          />
        </div>
      </div>
    </div>

    <div
      ref="areaHouse"
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        <span>
          Площадь
        </span>
        <span v-if="propCreatedObjectHouse.areaHouse.required">
          *
        </span>
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div
          ref="areaHouse"
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
              Площадь дома
            </span>
            <span v-if="propCreatedObjectHouse.areaHouse.required">
              *
            </span>
          </h4>
          <div class="">
            <inputWithUnit
              propType="number"
              propUnit="meterSquare"
              :value.sync="propCreatedObjectHouse.areaHouse.value"
              :propValue="livingAreaOfHouse"
              :propErrorClass="{
                'input_error': this.errors.includes('areaHouse')
              }"
            />
            <p
              v-if="this.errors.includes('areaHouse')"
              class="paragraph paragraph_invalid"
            >
              Необходимо указать площадь дома
            </p>
          </div>
        </div>
        <div
          ref="areaLand"
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
              Площадь участка
            </span>
            <span v-if="propCreatedObjectHouse.areaLand.required">
              *
            </span>
          </h4>
          <inputWithUnit
            propType="number"
            propUnit="acr"
            :value.sync="propCreatedObjectHouse.areaLand.value"
            :propValue="landAreaOfHouse"
            :propErrorClass="{
              'input_error': this.errors.includes('areaLand')
            }"
          />
          <p
            v-if="this.errors.includes('areaLand')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать площадь участка
          </p>
        </div>
      </div>
    </div>

    <div
      ref="floorAll"
      class="form__row"
    >
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Этажей всего
            </span>
            <span v-if="propCreatedObjectHouse.floorAll.required">
              *
            </span>
          </h3>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('floorAll')
            }"
            v-model="floorAll"
            :options="houseFloors"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
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
            <span v-if="propCreatedObjectHouse.distance.required">
              *
            </span>
          </h3>
          <multiselect
            v-model="propCreatedObjectHouse.distance.value"
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

    <addObjectComfort
      v-if="
        propCreatedObject.deal.value
        && propCreatedObject.deal.value.slug === 'rent'
      "
      :propCreatedObjectComfort="this.propCreatedObject"
      :propDefaultValue="propDefaultValue"
    />

  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import multiselect from 'vue-multiselect';
import { mapState, mapGetters, store, commit } from 'vuex';
import radioButtons from '@cmp/common/radioButtons.vue';
import addObjectComfort from '@cmp/addObject/desktop/addObjectComfort.vue';
import inputWithUnit from '@cmp/common/inputWithUnit.vue';

export default {
  name: 'addObjectHouse',
  components: {
    Fragment,
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
  },
  data() {
    return {
      errors: [],
      createdObject: {},
      propCreatedObjectHouse: this.propCreatedObject.house,
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
    ]),
    ...mapGetters([
      'getDistanceArray',
    ]),
    houseDistance() {
      return this.gConvertRangeToArray(this.filterDataDefaultClone.houseDistance);
    },
    houseFloors() {
      return this.gConvertRangeToArray(this.filterDataDefaultClone.houseFloorAll);
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    houseYearsList() {
      const currentYear = new Date().getFullYear();
      const startYear = this.filterDataDefaultClone.appYearsStartPosition;
      let yearsArray = [];
      for (let i = startYear; i <= currentYear; i++) {
        if (i === this.propDefaultValue.year) {
          this.propCreatedObjectHouse.year.value = {
            'slug': i,
            'label': i
          };
        }
        yearsArray.push(
          {
            'slug': i,
            'label': i
          }
        );
      }
      return yearsArray.reverse();
    },
    // Object type
    typeOfHouse() {
      let resultArray;
      const objectHouseTypesArrayCopy = [...this.filterDataDefaultClone.houseTypes];
      if (this.propDefaultValue.houseTypeSlug) {
        resultArray = objectHouseTypesArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.houseTypeSlug) {
              item.checked = true;
              this.propCreatedObjectHouse.type.value = item;
            } else {
              item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = objectHouseTypesArrayCopy;
      }
      return resultArray;
    },
    // Object wall material
    houseWallMaterial() {
      let resultArray;
      const objectHouseWallArrayCopy = [...this.filterDataDefaultClone.houseWall];
      if (this.propDefaultValue.houseWallSlug) {
        resultArray = objectHouseWallArrayCopy.map(
          item => {
            if (item.slug === this.propDefaultValue.houseWallSlug) {
              this.propCreatedObjectHouse.wall.value = item;
              // item.checked = true;
            } else {
              // item.checked = false;
            }
            return item;
          }
        )
      } else {
        resultArray = objectHouseTypesArrayCopy;
      }
      return resultArray;
    },
    // Object floor all
    floorAll: {
      cache: false,
      get() {
        return this.propCreatedObjectHouse.floorAll.value;
      },
      set(value) {
        console.log('value ::', value);
        // If a user select floorFull more than floorCurrent.
        if (this.propCreatedObjectHouse.floor && value.slug < this.propCreatedObjectHouse.floor.slug) {
          // Then floorCurrent will be a null.
          this.propCreatedObjectHouse.floor = null;
        }
        // console.log('this.filterDataDefaultClone ::', this.filterDataDefaultClone);
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
        this.propCreatedObjectHouse.floorAll.value = value;
      }
    },
    landAreaOfHouse() {
      this.propCreatedObjectHouse.areaLand.value = +this.propDefaultValue.houseAreaLand;
      return +this.propDefaultValue.houseAreaLand;
    },
    livingAreaOfHouse() {
      this.propCreatedObjectHouse.areaHouse.value = +this.propDefaultValue.houseAreaHouse;
      return +this.propDefaultValue.houseAreaHouse;
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
        console.log('propValidateErrors watch house ::', value);
        this.errors = value;
      },
      deep: true
    },
  },
  methods: {
    fillTheFormWithObjectData() {
      this.filterDataDefaultClone.houseRoomsCount.map(
        item => {
          if (item.slug === this.propDefaultValue.roomsCountSlug) {
            this.propCreatedObjectHouse.roomsCount.value = item;
          }
        }
      );
      if (this.propDefaultValue.floorAll) {
        this.floorAll = {
          label: this.propDefaultValue.floorAll,
          slug: this.propDefaultValue.floorAll,
        };
      }
      this.propCreatedObjectHouse.distance.value = {
        slug: this.propDefaultValue.distanceSlug,
        label: this.propDefaultValue.distanceLabel,
      };
    },
    validateNumbers(value) {
      const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
      return trimmedValue;
    },
  },
  mounted() {
    if (this.propDefaultValue) {
      this.fillTheFormWithObjectData();
    }
  },
};
</script>