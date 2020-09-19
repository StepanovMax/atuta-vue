<template>
  <div class="">
    <p
      v-if="propUnit === 'meterSquare'"
      class="unit"
    >
      <span class="unit">
        <span class="unit__name unit__name_meter-square">
          м
        </span>
        <sup class="unit__sup">
          2
        </sup>
      </span>
    </p>
    <p
      v-if="propUnit === 'acr'"
      class="unit"
    >
      <span class="unit">
        <span class="unit__name unit__name_acr">
          сот.
        </span>
      </span>
    </p>
    <p
      v-if="propUnit === 'meter'"
      class="unit"
    >
      <span class="unit">
        <span class="unit__name unit__name_meter">
          м
        </span>
      </span>
    </p>
    <p
      v-if="propUnit === 'rouble'"
      class="unit"
    >
      <span class="unit">
        <span class="unit__name unit__name_rouble">
          <iconRouble
            :propColor="propColor"
          />
        </span>
      </span>
    </p>
  </div>
</template>

<script>
import iconRouble from '../icons/iconRouble.vue';

export default {
  name: 'unit',
  components: {
    iconRouble,
  },
  props: {
    propUnit: {
      type: String,
      default: '',
      required: true,
    },
    propColor: {
      type: String,
      default: '',
      required: false,
    },
  },
  computed: {
    unitName() {
      let unit;
      if (this.propUnit === 'meterSquare') {
        unit = `
          <span class="unit">
            <span class="unit__name unit__name_meter-square">
              м
            </span>
            <sup class="unit__sup">
              2
            </sup>
          </span>
        `;
      } else if (this.propUnit === 'acr') {
        unit = `
          <span class="unit">
            <span class="unit__name unit__name_acr">
              сот.
            </span>
          </span>
        `;
      } else if (this.propUnit === 'meter') {
        unit = `
          <span class="unit">
            <span class="unit__name unit__name_meter">
              м
            </span>
          </span>
        `;
      } else if (this.propUnit === 'rouble') {
        unit = `
          <span class="unit">
            <span class="unit__name unit__name_rouble">
              <iconRouble />
            </span>
          </span>
        `;
      }
      return unit;
    },
  },
};
</script>