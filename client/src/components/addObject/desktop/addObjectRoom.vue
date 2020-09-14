<template>
  <Fragment>

    <div
      ref="area"
      class="form__row"
    >
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Площадь комнаты
            </span>
            <span v-if="propCreatedObjectRoom.area.required">
              *
            </span>
          </h3>
          <inputWithUnit
            propType="number"
            propUnit="meterSquare"
            :value.sync="propCreatedObjectRoom.area.value"
            :propErrorClass="{
              'input_error': this.errors.includes('area')
            }"
          />
          <p
            v-if="this.errors.includes('area')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать площадь комнаты
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
            <span v-if="propCreatedObjectRoom.roomsCount.required">
              *
            </span>
          </h3>
          <multiselect
            :class="{
              'multiselect_error': this.errors.includes('roomsCount')
            }"
            v-model="propCreatedObjectRoom.roomsCount.value"
            :options="roomRooms"
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
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            form__title
            form__title_add-object
          ">
            <span>
              Вид дома
            </span>
            <span v-if="propCreatedObjectRoom.view.required">
              *
            </span>
          </h3>
          <radioButtons
            radioButtonsView="wrapHalf"
            radioButtonsId="roomViewAddObject"
            :items="filterDataDefaultClone.appView"
            :value.sync="propCreatedObjectRoom.view.value"
          />
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
        <span v-if="propCreatedObjectRoom.year.required">
          *
        </span>
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <multiselect
            v-model="propCreatedObjectRoom.year.value"
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
        <div
          ref="floor"
          class="form__block-width form__block-width-third"
        >
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
            :class="{
              'multiselect_error': this.errors.includes('floor')
            }"
            v-model="propCreatedObjectRoom.floor.value"
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
          <p
            v-if="this.errors.includes('floor')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать этаж
          </p>
        </div>
        <div
          ref="floorAll"
          class="form__block-width form__block-width-third"
        >
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
            :class="{
              'multiselect_error': this.errors.includes('floorAll')
            }"
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
          <p
            v-if="this.errors.includes('floorAll')"
            class="paragraph paragraph_invalid"
          >
            Необходимо указать общее количество этажей здания
          </p>
        </div>
      </div>
    </div>

    <addObjectComfort
      v-if="
        propCreatedObject.deal.value
        && propCreatedObject.deal.value.slug === 'rent'
      "
      :propCreatedObjectComfort="this.propCreatedObject"
    />

  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import multiselect from 'vue-multiselect';
import { mapState, store, commit } from 'vuex';
import radioButtons from '../../common/radioButtons.vue';
import addObjectComfort from './addObjectComfort.vue';
import inputWithUnit from '../../common/inputWithUnit.vue';

export default {
  name: 'addObjectRoom',
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
  },
  data() {
    return {
      errors: [],
      // createdObject: {},
      propCreatedObjectRoom: this.propCreatedObject.room,
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
    ]),
    roomRooms() {
      let array = this.gConvertRangeToArray(this.filterDataDefaultClone.roomRooms);
      array.push({
        label: '9+',
        slug: '9+',
      });
      return array;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
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
    floorAll: {
      cache: false,
      get() {
        return this.propCreatedObjectRoom.floorAll.value;
      },
      set(value) {
        // If a user select floorFull more than floorCurrent.
        if (this.propCreatedObjectRoom.floor && value.slug < this.propCreatedObjectRoom.floor.slug) {
          // Then floorCurrent will be a null.
          this.propCreatedObjectRoom.floor = null;
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
        this.propCreatedObjectRoom.floorAll.value = value;
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
        console.log('propValidateErrors watch house ::', value);
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