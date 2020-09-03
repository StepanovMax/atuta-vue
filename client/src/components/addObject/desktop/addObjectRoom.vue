<template>
  <Fragment>

    <div class="form__row">
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            title
            title_h5
            title_bold
            form__title
            form__title_add-object
          ">
            Площадь комнаты
          </h3>
          <inputWithUnit
            propType="number"
            propUnit="meterSquare"
            :value.sync="propCreatedObjectRoom.area"
          />
        </div>
      </div>
    </div>

    <div class="form__row">
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            title
            title_h5
            title_bold
            form__title
            form__title_add-object
          ">
            Количество комнат*
          </h3>
          <multiselect
            v-model="propCreatedObjectRoom.roomsCount"
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
        </div>
      </div>
    </div>

    <div class="form__row">
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h3 class="
            title
            title_h5
            title_bold
            form__title
            form__title_add-object
          ">
            Вид дома
          </h3>
          <radioButtons
            radioButtonsView="wrapHalf"
            radioButtonsId="roomViewAddObject"
            :items="filterDataDefaultClone.appView"
            :value.sync="propCreatedObjectRoom.view"
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
        Год постройки
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <multiselect
            v-model="propCreatedObjectRoom.year"
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
            v-model="propCreatedObjectRoom.floor"
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
      </div>
    </div>

    <addObjectComfort
      v-if="
        propCreatedObject.deal
        && propCreatedObject.deal.slug === 'rent'
      "
      :propCreatedObjectComfort="propCreatedObjectRoom"
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
  },
  data() {
    return {
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
        return this.propCreatedObjectRoom.floorAll;
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
        this.propCreatedObjectRoom.floorAll = value;
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