<template>
  <div class="input-field">
    <input
      v-if="propType === 'symbolsWithNumbers'"
      type="text"
      class="input symbolsWithNumbers"
      :class="propClass"
      v-model="filteredValue"
      @input="handleInput($event)"
      :key="propKey"
      :name="propKey"
    >
    <input
      v-if="propType === 'numbers'"
      type="number"
      class="input numbers"
      :class="propClass"
      v-model="enteredValue"
      :key="propKey"
      :name="propKey"
    >
    <input
      v-if="propType === 'password'"
      type="password"
      class="input password"
      :class="propClass"
      v-model="filteredValue"
      @input="handleInput($event)"
      :key="propKey"
      :name="propKey"
      @blur="blur($event)"
    >
  </div>
</template>

<script>
export default {
  name: 'inputField',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    propType: {
      type: String,
      default: '',
      required: true,
    },
    propClass: {
      type: String,
      default: '',
      required: false,
    },
    propKey: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      filteredValue: '',
    }
  },
  computed: {
    enteredValue: {
      cache: false,
      get() {
        console.log('this.filteredValue 2 ::', this.filteredValue);
        return this.filteredValue;
      },
      set(value) {
        console.log('value ::', value);
        if (this.propType === 'numbers') {
          this.filteredValue = this.gFormatPrice(value);
        }
        console.log('this.filteredValue 1 ::', this.filteredValue);
        this.$emit('update:value', this.filteredValue);
      }
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      if (this.propType === 'symbolsWithNumbers') {
        this.filteredValue = value.replace(/[^\w\s]/gi, '') // /\W|_/g
      } else if (this.propType === 'password') {
        this.filteredValue = value;
      }
      this.$emit('update:value', this.filteredValue);
    },
    blur(event) {
      this.$root.$emit('blur', event.target.value, event.target.name);
    },
  },
};
</script>