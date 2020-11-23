<template>
  <div class="switcher">
    <ul
      class="switcher__list"
    >
      <li
        class="switcher__list-item"
        :class="[
          { 'switcher__list-item_active': item.checked }
        ]"
        v-for="(item, index) in dataItemsChecked"
        :key="index"
      >
        <input
          class="switcher__input-radio"
          type="radio"
          :value="item.slug"
          :id="'id-' + switcherId + '-' + index"
          :name="'name-' + switcherId"
          v-model="picked"
        >
        <label
          class="switcher__label"
          :class="[
            { 'switcher__label_active': item.checked },
            { 'switcher__label_my-objects': propClass === 'myObjects' },
            { 'switcher__label_filter-dialogs': propClass === 'filterDialogs' },
          ]"
          :for="'id-' + switcherId + '-' + index"
        >
          {{ item.label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'switcher',
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
    switcherId: {
      default: '',
      type: String
    },
    propClass: {
      default: '',
      type: String,
      required: false,
    },
  },
  data() {
    return {
      picked: [],
      dataItemsChecked: [...this.items].map(function(item) {
        if (!item.hasOwnProperty('checked')) {
          item.checked = false;
        }
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
  mounted() {
    // console.log('mounted sw ::');
    [...this.items].forEach(
      item => {
        if (item.hasOwnProperty('checked')) {
          if (item.checked === true) {
            this.updateValue(item)
          }
        }
      }
    );
  },
};
</script>