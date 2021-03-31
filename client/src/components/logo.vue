<template>
  <router-link
    class="logo"
    :class="[
      { 'logo_header': this.location === 'header' },
      { 'logo_footer': this.location === 'footer' }
    ]"
    :to="{ name: 'homePage' }"
    title="Приобретите свою недвижимость вместе с Атута"
  >
    <img
      class="img logo__img"
      :src="hostFront + logo"
    >
  </router-link>
</template>

<script>
import logo from '../images/logo/logo_desktop.png';

export default {
  name: 'logo',
  props: {
    location: {
      default: 'header',
      type: String,
      required: true
    },
  },
  data() {
    return {
      logo: logo,
      hostFront: process.env.host_front,
    }
  },
  mounted() {
    // console.log('location ::', this.location);
  }
};
</script>