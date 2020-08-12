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
            Тип объекта*
          </h3>
          <switcher
            class="add-object-page__switcher"
            switcherId="typeAddObject"
            :items="filterDataDefaultClone.appTypes"
            :value.sync="propCreatedObjectApp.type"
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
            radioButtonsId="appViewAddObject"
            :items="filterDataDefaultClone.appView"
            :value.sync="propCreatedObjectApp.view"
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
            v-model="propCreatedObjectApp.roomsCount"
            :options="filterDataDefaultClone.appRooms"
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
            v-model="propCreatedObjectApp.floor"
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
            v-model="propCreatedObjectApp.year"
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
            Общая площадь
          </h4>
          <input
            type="number"
            class="input"
            v-model="appAreaFull"
            :class="{
              'input_error': this.errors.includes('appAreaFull')
            }"
          >
        </div>
        <div class="form__block-width form__block-width-third">
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            Площадь кухни
          </h4>
          <input
            type="number"
            class="input"
            v-model="appAreaKitchen"
            :class="{
              'input_error': this.errors.includes('appAreaKitchen')
            }"
          >
        </div>
        <div class="form__block-width form__block-width-third">
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            Жилая площадь
          </h4>
          <input
            type="number"
            class="input"
            :class="{
              'input_error': this.errors.includes('appAreaLiving')
            }"
            v-model="appAreaLiving"
          >
        </div>
      </div>
      <p
        v-if="this.errors.includes('appAreaFull')"
        class="paragraph paragraph_invalid"
      >
        Сумма жилой площади и площади кухни не может быть больше или равна общей площади
      </p>
      <p
        v-if="this.errors.includes('appAreaLiving')"
        class="paragraph paragraph_invalid"
      >
        Жилая площадь не может быть больше или равна общей площади
      </p>
      <p
        v-if="this.errors.includes('appAreaKitchen')"
        class="paragraph paragraph_invalid"
      >
        Площадь кухни не может быть больше или равна общей площади
      </p>
    </div>

  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import multiselect from 'vue-multiselect';
import { mapState, store, commit } from 'vuex';
import switcher from '../../common/switcher.vue';
import radioButtons from '../../common/radioButtons.vue';

export default {
  name: 'addObjectApp',
  components: {
    switcher,
    Fragment,
    multiselect,
    radioButtons,
  },
  props: {
    propCreatedObjectApp: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      createdObject: {},
      appAreaFullData: null,
      appAreaKitchenData: null,
      appAreaLivingData: null,
      errors: [],
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
      'objectDataSelected',
    ]),
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    floorAll: {
      cache: false,
      get() {
        return this.propCreatedObjectApp.floorAll;
      },
      set(value) {
        // If a user select floorFull more than floorCurrent.
        if (this.propCreatedObjectApp.floor && value.slug < this.propCreatedObjectApp.floor.slug) {
          // Then floorCurrent will be a null.
          this.propCreatedObjectApp.floor = null;
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
        this.propCreatedObjectApp.floorAll = value;
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
    appAreaFull: {
      cache: false,
      get() {
        return this.appAreaFullData;
      },
      set(value) {
        this.appAreaFullData = this.validateNumbers(value);
        this.validateArea();
      }
    },
    appAreaKitchen: {
      cache: false,
      get() {
        return this.appAreaKitchenData;
      },
      set(value) {
        this.appAreaKitchenData = this.validateNumbers(value);
        this.validateArea();
      }
    },
    appAreaLiving: {
      cache: false,
      get() {
        return this.appAreaLivingData;
      },
      set(value) {
        if (value === '0') {
          this.errors.push('appAreaLiving');
        } else {
          const index = this.errors.indexOf('appAreaLiving');
          this.errors.splice(index, 1);
        }
        this.appAreaLivingData = this.validateNumbers(value);
        this.validateArea();
      }
    },
  },
  methods: {
    validateNumbers(value) {
      const trimmedValue = +value.toString().replace(/[^0-9]/g, '');
      return trimmedValue;
    },
    validateArea() {
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaKitchen)) {
        if (this.appAreaFull <= this.appAreaKitchen) {
          this.errors.push('appAreaKitchen');
        } else {
          const indexAppAreaKitchen = this.errors.indexOf('appAreaKitchen');
          this.errors.splice(indexAppAreaKitchen, 1);
          const indexAppAreaFull = this.errors.indexOf('appAreaFull');
          this.errors.splice(indexAppAreaFull, 1);
        }
      }
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaLiving)) {
        if (this.appAreaFull <= this.appAreaLiving) {
          this.errors.push('appAreaLiving');
        } else {
          const indexAppAreaLiving = this.errors.indexOf('appAreaLiving');
          this.errors.splice(indexAppAreaLiving, 1);
          const indexAppAreaFull = this.errors.indexOf('appAreaFull');
          this.errors.splice(indexAppAreaFull, 1);
        }
      }
      if (Boolean(this.appAreaFull) && Boolean(this.appAreaKitchen) && Boolean(this.appAreaLiving)) {
        const sumKitchenWithLiving = +this.appAreaKitchen + +this.appAreaLiving;
        if (this.appAreaFull <= sumKitchenWithLiving) {
          this.errors.push('appAreaFull');
        } else {
          const indexAppAreaKitchen = this.errors.indexOf('appAreaLiving');
          this.errors.splice(indexAppAreaKitchen, 1);
          const indexAppAreaLiving = this.errors.indexOf('appAreaLiving');
          this.errors.splice(indexAppAreaLiving, 1);
          const indexAppAreaFull = this.errors.indexOf('appAreaFull');
          this.errors.splice(indexAppAreaFull, 1);
        }
      }
    },
  },
};
</script>