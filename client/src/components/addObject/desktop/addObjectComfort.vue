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
            Вид удобств
          </h3>
          <radioButtons
            radioButtonsView="listVertical"
            radioButtonsId="roomСomfortAddObject"
            :items="filterDataDefaultClone.comfortType"
            :value.sync="сreatedObjectComfort.comfortType.value"
          />
        </div>
      </div>
    </div>

    <div
      v-if="
        Boolean(сreatedObjectComfort.comfortType.value)
        && Boolean(сreatedObjectComfort.comfortType.value.slug === 'personal')
      "
      class="form__row"
    >
      <h3 class="
        form__title
        form__title_add-object
      ">
        Удобства
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
            Количество кроватей
          </h4>
          <multiselect
            v-model="сreatedObjectComfort.bedCount.value"
            :options="roomBedCount"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Количество кроватей"
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
            Количество спальных мест
          </h4>
          <multiselect
            v-model="сreatedObjectComfort.sleepingPlacesCount.value"
            :options="roomSleepingPlacesCount"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :multiple="false"
            :searchable="true"
            label="label"
            track-by="label"
            placeholder="Количество спальных мест"
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
            Мультимедиа
          </h4>
          <checkboxes
            checkboxId="appMultimediaDesktop"
            checkboxType="listVertical"
            :items="filterDataDefaultClone.roomMultimedia"
            :value.sync="сreatedObjectComfort.roomMultimedia.value"
          />
        </div>
      </div>
      <div class="form__row form__row_block-width form__row_block-width-third">
        <div class="form__block-width form__block-width-third">
          <h4 class="
            title
            title_h6
            title_bold
            form__title
            form__title_add-object
          ">
            Бытовая техника
          </h4>
          <checkboxes
            checkboxId="appEquipmentDesktop"
            checkboxType="listVertical"
            :items="filterDataDefaultClone.roomEquipment"
            :value.sync="сreatedObjectComfort.roomEquipment.value"
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
            Комфорт
          </h4>
          <checkboxes
            checkboxId="appComfortDesktop"
            checkboxType="listVertical"
            :items="filterDataDefaultClone.roomComfort"
            :value.sync="сreatedObjectComfort.roomComfort.value"
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
            Дополнительно
          </h4>
          <checkboxes
            checkboxId="appAdditionalDesktop"
            checkboxType="listVertical"
            :items="filterDataDefaultClone.roomAdditional"
            :value.sync="сreatedObjectComfort.roomAdditional.value"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Fragment } from 'vue-fragment';
import multiselect from 'vue-multiselect';
import { mapState, store, commit } from 'vuex';
import checkboxes from '../../common/checkboxes.vue';
import radioButtons from '../../common/radioButtons.vue';

export default {
  name: 'addObjectComfort',
  components: {
    Fragment,
    checkboxes,
    multiselect,
    radioButtons,
  },
  props: {
    propCreatedObjectComfort: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      createdObject: {},
      сreatedObjectComfort: this.propCreatedObjectComfort,
    }
  },
  computed: {
    ...mapState([
      'filterDataDefault',
      'objectDataSelected',
    ]),
    roomBedCount() {
      const array = this.gConvertRangeToArray(this.filterDataDefaultClone.roomBedCount);
      const resultedArray = this.gAddPlusLastValueToArray(array);
      return resultedArray;
    },
    roomSleepingPlacesCount() {
      const array = this.gConvertRangeToArray(this.filterDataDefaultClone.roomSleepingPlacesCount);
      const resultedArray = this.gAddPlusLastValueToArray(array);
      return resultedArray;
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
  },
};
</script>