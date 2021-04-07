<template>
  <div class="input-with-unit">
    <input
      type="text"
      class="input input-with-unit__input"
      :class="propErrorClass"
      @keypress="gIsNumber($event)"
      v-model="enteredValue"
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
  methods: {
    // inputChange(event) {
    //   this.$emit('update:value', event.target.value);
    // },
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
  mounted() {
    if (this.propValue) {
      this.formattedValue = this.propValue;
    }
  },
};
</script>