<template>
  <router-link
    class="logo"
    :class="[
      { 'logo_header': this.location === 'header' },
      { 'logo_footer': this.location === 'footer' }
    ]"
    :to="{ name: 'home' }"
    title="Приобретите свою недвижимость вместе с Атута"
  >
    <img
      class="img logo__img"
      src="src/images/logo/logo_desktop.png"
    >
  </router-link>
</template>

<script>
export default {
  name: 'logo',
  props: {
    location: {
      default: 'header',
      type: String,
      required: true
    },
  },
  mounted() {
    // console.log('location ::', this.location);
  }
};
</script>