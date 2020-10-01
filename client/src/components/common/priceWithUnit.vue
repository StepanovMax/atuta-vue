<template>
  <div class="price-with-unit">
    <p class="price-with-unit__number">
      {{ gFormatPrice(propNumber) }}&nbsp;
    </p>
    <font-awesome-icon
      class="price-with-unit__text"
      :icon="myIcon"
    />
  </div>
</template>

<script>
import unit from './unit.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'priceWithUnit',
  components: {
    unit,
    FontAwesomeIcon,
  },
  data () {
    return {
      myIcon: faRubleSign,
    }
  },
  props: {
    propNumber: {
      type: Number,
      default: 0,
      required: true,
    },
    propUnit: {
      type: String,
      default: '',
      required: true,
    },
  },
};
</script>