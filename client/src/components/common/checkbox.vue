<template>
  <div class="checkbox">
    <div
      v-if="!checkboxArray.checked"
      class="checkbox__icon checkbox__icon_active"
    />
    <iconChecked
      v-else
      class="checkbox__icon"
    />
    <label
      for="asd"
      class="checkbox__label"
    >
      {{ item.label }}
    </label>
    <input
      id="asd"
      class="checkbox__input"
      type="checkbox"
      @change="clickCheckbox()"
    >
  </div>
</template>

<script>
import iconChecked from '../icons/iconChecked.vue'

export default {
  name: 'checkbox',
  components: {
    iconChecked
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    item: {
      default: {},
      type: Object,
      required: true
    },
  },
  data() {
    return {
      checkboxArray: this.item
    }
  },
  methods: {
    clickCheckbox() {
      console.log('this.checkboxArray.checked', this.checkboxArray.checked)
      this.checkboxArray.checked = !this.checkboxArray.checked
      if (this.checkboxArray.checked) {
        this.value = this.checkboxArray.label
      } else {
        this.value = 'Не выбрано'
      }
      this.$emit('change', this.value)
    }
  },
};
</script>