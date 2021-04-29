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
            :items="comfortTypeArray"
            :value.sync="comfortTypeSelectedValue"
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
            v-model="roomBedSelectedValue"
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
            v-model="sleepingPlacesCountSelectedValue"
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
    propDefaultValue: {
      type: Object,
      default: function () {
        return {};
      },
      required: true,
    },
    propIsComfortObjectDataEdited: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      createdObject: {},
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
    roomBedSelectedValue: {
      cache: false,
      get() {
        return this.propCreatedObjectComfort.bedCount.value;
      },
      set(value) {
        console.log('value ::', value.slug, +this.propDefaultValue.comfortBedCount);
        // this.compareDataForEdit(+value.slug, +this.propDefaultValue.comfortBedCount, 'bedCount');
        this.propCreatedObjectComfort.bedCount.value = value;
      }
    },
    roomSleepingPlacesCount() {
      const array = this.gConvertRangeToArray(this.filterDataDefaultClone.roomSleepingPlacesCount);
      const resultedArray = this.gAddPlusLastValueToArray(array);
      return resultedArray;
    },
    sleepingPlacesCountSelectedValue: {
      cache: false,
      get() {
        return this.propCreatedObjectComfort.sleepingPlacesCount.value;
      },
      set(value) {
        console.log('value ::', value.slug, +this.propDefaultValue.comfortSleepingPlacesCount);
        // this.compareDataForEdit(+value.slug, +this.propDefaultValue.comfortBedCount, 'bedCount');
        this.propCreatedObjectComfort.sleepingPlacesCount.value = value;
      }
    },
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
    comfortTypeArray() {
      let returnedData;
      const array = [...this.filterDataDefault.comfortType];
      // console.log('>> this.propDefaultValue.comfortType ::', this.propDefaultValue.comfortType);
      if (this.propDefaultValue.comfortType) {
        let newArray = [];
        array.map(
          item => {
            let newItem = {
              slug: item.slug,
              label: item.label,
            }
            if (item.slug === this.propDefaultValue.comfortType) {
              newItem.checked = true;
              this.сreatedObjectComfort.comfortType.value = item;
              // console.log('>> 11 ::', item.slug);
            } else {
              newItem.checked = false;
              // console.log('>> 22 ::', item.slug);
            }
            // console.log('>> newItem ::', newItem);
            newArray.push(newItem);
          }
        )
        returnedData = newArray;
        // console.log('>> returnedData 1 newArray ::', newArray);
      } else {
        returnedData = array;
        // console.log('>> returnedData 2', returnedData);
      }
      // console.log('>> returnedData', returnedData);
      return returnedData;
    },
    comfortTypeSelectedValue: {
      cache: false,
      get() {
        return this.сreatedObjectComfort.comfortType.value;
      },
      set(value) {
        this.compareDataForEdit(value.slug, this.propDefaultValue.comfortType, 'comfortType');
        this.сreatedObjectComfort.comfortType.value = value;
      }
    },
    сreatedObjectComfort() {
      let objectCopy = {...this.propCreatedObjectComfort};


      // Object "comfort" bed count.
      const newComfortBedCount = {
        slug: this.propDefaultValue.comfortBedCount,
        label: this.propDefaultValue.comfortBedCount,
      };
      objectCopy.bedCount.value = newComfortBedCount;


      // Add an 'edited' property to the object.
      const editedObject = this.addEditedPropertyToObjectItems(objectCopy);
      return editedObject;
    },
  },
  watch: {
    comfortTypeArray(value) {
      // console.log('>> comfortType / watch', value);
    },
  },
  methods: {
    // Add an 'edited' property to the object.
    addEditedPropertyToObjectItems(object) {
      for(const key in object) {
        if (typeof object[key] === 'object') {
          object[key].edited = false;
        }
      }
      return object;
    },
    // // Compare each property whether it was edited or not.
    // compareDataForEdit(value1, value2, key) {
    //   if (value1 === value2) {
    //     this.сreatedObjectComfort[key].edited = false;
    //   } else {
    //     this.сreatedObjectComfort[key].edited = true;
    //   }
    //   this.checkFullObjectForEditedProperties(this.сreatedObjectComfort);
    // },
    // // Check all properties of the object whether they were edited or not.
    // checkFullObjectForEditedProperties(object) {
    //   let count = 0;
    //   for (const key in object) {
    //     if (object[key].edited === true) {
    //       count++;
    //     }
    //     if (count > 0) {
    //       this.objectIsEdited(true);
    //     } else {
    //       this.objectIsEdited(false);
    //     }
    //   }
    // },
    // objectIsEdited(flag) {
    //   console.log('flag ::', flag);
    //   this.$emit('update:propIsComfortObjectDataEdited', flag)
    // },
  },
  mounted() {
    console.log('>> this.сreatedObjectComfort ::', this.сreatedObjectComfort);
  },
};
</script>