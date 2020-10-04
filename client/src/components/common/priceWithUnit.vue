<template>
  <div class="price-with-unit">
    <p class="price-with-unit__number">
      {{ gFormatPrice(propNumber) }}&nbsp;
    </p>
    <iconRouble />
  </div>
</template>

<script>
import unit from './unit.vue';
import iconRouble from '../icons/iconRouble.vue';

export default {
  name: 'priceWithUnit',
  components: {
    unit,
    iconRouble,
  },
  data () {
    return {
      
    }
  },
  props: {
    propNumber: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>