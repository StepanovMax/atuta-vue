<template>
  <div class="input-field">
    <input
      type="text"
      class="input-field__input"
      v-model="enteredValue"
      @keypress="gIsNumber($event)"
    >
    <p
      class="input-field__currency"
    >
      ₽
    </p>
  </div>
</template>

<script>
export default {
  name: 'inputField',
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      formattedValue: '',
    }
  },
  computed: {
    enteredValue: {
      cache: false,
      get() {
        return this.formattedValue;
      },
      set(value) {
        this.formattedValue = this.gFormatPrice(value);
        this.$emit('update:value', value.replace(/\s/g, ''));
      }
    },
  },
};
</script>