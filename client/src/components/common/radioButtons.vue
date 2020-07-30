<template>
  <div
    class="radio-buttons"
    :class="[
      { 'radio-buttons_float-right': radioButtonsView === 'floatRight' }
    ]"
  >
    <ul
      class="radio-buttons__list"
      :class="[
        { 'radio-buttons__list_float-right': radioButtonsView === 'floatRight' }
      ]"
    >
      <li
        class="radio-buttons__list-item"
        :class="[
          { 'radio-buttons__list-item_active': item.checked }
        ]"
        v-for="(item, index) in dataItemsChecked"
        :key="'key-' + radioButtonsId + '-' + index"
      >
        <input
          class="radio-buttons__input-radio"
          :id="'id-' + radioButtonsId + '-' + index"
          type="radio"
          :value="item.slug"
          :name="'name-' + radioButtonsId"
          :checked="item.checked"
          v-model="picked"
        >
        <label
          class="radio-buttons__label"
          :class="[
            { 'radio-buttons__label_active': item.checked }
          ]"
          :for="'id-' + radioButtonsId + '-' + index"
        >
          {{ item.label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'radioButtons',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    items: {
      default: [],
      type: Array,
      required: true
    },
    radioButtonsId: {
      default: '',
      type: String,
      required: true
    },
    radioButtonsView: {
      default: 'default',
      type: String,
      required: false
    },
  },
  data() {
    return {
      picked: [],
      dataItemsChecked: [...this.items].map(function(item) {
        // console.log('radioButtonsView', this.radioButtonsView);
        // if (this.radioButtonsView && (this.radioButtonsView === 'floatRight')) {
        //   console.log('items', this.items);
        // } else {
        // }
        item.checked = false;
        return item;
      }),
    }
  },
  watch: {
    picked: {
      handler() {
        for (let i = 0; i < this.dataItemsChecked.length; i++) {
          if (this.picked === this.dataItemsChecked[i].slug) {
            this.dataItemsChecked[i].checked = true;
            this.removeCheckedAttribute({...this.dataItemsChecked[i]});
          } else {
            this.dataItemsChecked[i].checked = false;
          }
        }
      },
      deep: true
    },
  },
  methods: {
    removeCheckedAttribute(checkedElement) {
      let valueArray = checkedElement;
      delete valueArray.checked;
      this.updateValue(valueArray);
    },
    updateValue(data) {
      this.$emit('update:value', data);
    },
  },
  // mounted() {
  //   if (this.radioButtonsType === 'floatRight') {
  //     console.log('items', this.items);
  //   }
  // },
};
</script>