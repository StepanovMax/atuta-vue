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
        { 'radio-buttons__list_float-right': radioButtonsView === 'floatRight' },
        { 'radio-buttons__list_wrap radio-buttons__list_wrap-add-object': radioButtonsView === 'wrapAddObject' },
        { 'radio-buttons__list_wrap radio-buttons__list_wrap-half': radioButtonsView === 'wrapHalf' },
        { 'radio-buttons__list_wrap radio-buttons__list_vertical': radioButtonsView === 'listVertical' },
        { 'radio-buttons__list_wrap radio-buttons__list_horizontal': radioButtonsView === 'listHorizontal' },
      ]"
    >
      <li
        class="radio-buttons__list-item"
        :class="[
          { 'radio-buttons__list-item_active': item.checked },
          { 'radio-buttons__list-item_wrap radio-buttons__list-item_wrap-add-object': radioButtonsView === 'wrapAddObject' },
          { 'radio-buttons__list-item_wrap radio-buttons__list-item_wrap-half': radioButtonsView === 'wrapHalf' },
          { 'radio-buttons__list-item_vertical': radioButtonsView === 'listVertical' },
          { 'radio-buttons__list-item_horizontal': radioButtonsView === 'listHorizontal' },
        ]"
        v-for="(item, index) in dataItemsChecked"
        :key="'key-' + radioButtonsId + '-' + index"
      >
        <input
          :key="'key-' + radioButtonsId + '-' + index"
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
            { 'radio-buttons__label_active': item.checked },
            { 'radio-buttons__label_error': propErrorClass },
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
    propErrorClass: false,
  },
  data() {
    return {
      picked: [],
    }
  },
  computed: {
    dataItemsChecked() {
      let itemsCopyArray = [...this.items];
      const array = itemsCopyArray.map(
        item => {
          if (!item.checked) {
            item.checked = false;
          }
          return item;
        }
      )
      return array;
    },
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
    items(value) {
      // console.log('>> items / watch ::', value);
    }
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
};
</script>