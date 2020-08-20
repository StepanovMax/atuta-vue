<template>
  <div class="input-with-unit">
    <input
      :type="propType"
      class="input input-with-unit__input"
      @input="inputChange($event)"
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
  },
  components: {
    unit,
  },
  methods: {
    inputChange(event) {
      this.$emit('update:value', event.target.value);
    },
  },
};
</script>