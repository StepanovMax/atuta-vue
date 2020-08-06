<template>
  <div class="checkbox">
    <div
      v-if="!checkboxArray.checked"
      class="checkbox__icon checkbox__icon_active"
      :class="propClass + '-icon'"
    />
    <iconChecked
      v-else
      class="checkbox__icon"
      :class="propClass + '-icon'"
    />
    <label
      :for="checkboxId"
      class="checkbox__label"
      :class="propClass + '-label'"
    >
      {{ item.label }}
    </label>
    <input
      :key="checkboxId"
      :id="checkboxId"
      class="checkbox__input"
      :class="propClass + '-input'"
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
    checkboxId: {
      type: String,
      default: '',
      required: true
    },
    propClass: {
      type: String,
      default: '',
      required: false
    },
  },
  data() {
    return {
      checkboxArray: this.item
    }
  },
  methods: {
    clickCheckbox() {
      this.checkboxArray.checked = !this.checkboxArray.checked;
      if (this.checkboxArray.checked) {
        this.value = this.checkboxArray.slug;
      } else {
        this.value = null;
      }
      this.$emit('update:value', this.value);
    }
  },
};
</script>