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
        v-for="(item, index) in this.dataItems"
        :key="index"
      >
        <input
          class="switcher__input-radio"
          type="radio"
          :id="'id-' + switcherId + '-' + index"
          :name="'name-' + switcherId"
          :checked="item.checked"
          @change="clickRadioButton(index)"
        >
        <label
          class="switcher__label"
          :class="[
            { 'switcher__label_active': item.checked }
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
    }
  },
  data() {
    return {
      selectedRadioArray: [],
      dataItems: this.items
    }
  },
  methods: {
    clickRadioButton(index) {
      for (let i = 0; i < this.dataItems.length; i++) {
        if (i === index) {
          this.dataItems[i].checked = true;
          this.value = this.dataItems[i].label
        } else {
          this.dataItems[i].checked = false;
        }
      }
      this.$emit('change', this.value)
    }
  },
};
</script>