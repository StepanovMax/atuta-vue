<template>
  <Fragment>

    <div class="form__row">
      <div class="form__row form__row_block-width form__row_block-width-half">
        <div class="form__block-width form__block-width-half">
          <h3 class="
            form__title
            form__title_add-object
          ">
            Вид объекта*
          </h3>
          <radioButtons
            radioButtonsView="wrapHalf"
            radioButtonsId="objectViewAddObject"
            :items="filterDataDefaultClone.houseTypes"
            :value.sync="propCreatedObjectHouse.type"
          />
        </div>
      </div>
    </div>

    <div class="form__row">
      <h3 class="
        form__title
        form__title_add-object
      ">
        Год постройки
      </h3>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <multiselect
            v-model="propCreatedObjectHouse.year"
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
            Количество комнат*
          </h3>
          <multiselect
            v-model="propCreatedObjectHouse.roomsCount"
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
            Материал стен
          </h3>
          <multiselect
            v-model="propCreatedObjectHouse.wall"
            :options="filterDataDefaultClone.houseWall"
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

    <div class="form__row">
      <h3 class="
        title
        title_h5
        title_bold
        form__title
        form__title_add-object
      ">
        Площадь
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
            Площадь дома
          </h4>
          <div class="">
            <inputWithUnit
              propType="number"
              propUnit="meterSquare"
              :value.sync="propCreatedObjectHouse.areaHouse"
            />
          </div>
        </div>
        <div class="form__block-width form__block-width-third">
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            Площадь участка
          </h4>
          <inputWithUnit
            propType="number"
            propUnit="acr"
            :value.sync="propCreatedObjectHouse.areaLand"
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
            Этажей всего
          </h3>
          <multiselect
            v-model="propCreatedObjectHouse.floorAll"
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
            Расстояние до города
          </h3>
          <multiselect
            v-model="propCreatedObjectHouse.distance"
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
        propCreatedObject.deal
        && propCreatedObject.deal.slug === 'rent'
      "
      :propCreatedObjectComfort="propCreatedObjectHouse"
    />

  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import multiselect from 'vue-multiselect';
import { mapState, mapGetters, store, commit } from 'vuex';
import radioButtons from '../../common/radioButtons.vue';
import addObjectComfort from './addObjectComfort.vue';
import inputWithUnit from '../../common/inputWithUnit.vue';

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
  },
  data() {
    return {
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
  methods: {
    validateNumbers(value) {
      const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
      return trimmedValue;
    },
  },
};
</script>