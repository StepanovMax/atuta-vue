<template>
  <div class="input-with-unit">
    <input
      type="text"
      class="input input-with-unit__input"
      :class="propErrorClass"
      @keypress="gIsNumber($event)"
      v-model="enteredValue"
      @paste.prevent
    >
    <unit
      :propUnit="propUnit"
    />
  </div>
</template>

<script>
import unit from '../common/unit.vue';

export default {
  name: 'inputWithUnit',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    unit,
  },
  props: {
    propType: {
      type: String,
      default: '',
      required: true,
    },
    propUnit: {
      type: String,
      default: '',
      required: true,
    },
    propErrorClass: null,
    propValue: {
      type: Number,
      default: null,
      required: false,
    },
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
        // console.log('>> this.formattedValue', this.formattedValue);
        return this.formattedValue;
      },
      set(value) {
        let newValue;
        if (this.propType === 'number') {
          newValue = this.gFilterSymbolsFromNumbers(value);
        }
        this.formattedValue = this.gFormatPrice(newValue);
        this.$emit('update:value', this.formattedValue);
      }
    },
  },
  mounted() {
    if (this.propValue) {
      this.enteredValue = this.propValue;
    }
  },
};
</script>