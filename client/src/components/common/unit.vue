<template>
  <p
    v-html="unitName"
    class="unit"
  />
</template>

<script>

export default {
  name: 'unit',
  props: {
    propUnit: {
      type: String,
      default: '',
      required: true,
    },
  },
  computed: {
    unitName() {
      let unit;
      if (this.propUnit === 'meterSquare') {
        unit = `
          <span class="unit">
            <span class="unit__name">
              м
            </span>
            <sup class="unit__sup">
              2
            </sup>
          </span>
        `;
      } else if (this.propUnit === 'meterSquare') {
        unit = `
          <span class="unit">
            <span class="unit__name">
              сот.
            </span>
          </span>
        `;
      } else if (this.propUnit === 'meter') {
        unit = `
          <span class="unit">
            <span class="unit__name">
              м
            </span>
          </span>
        `;
      }
      return unit;
    },
  },
};
</script>