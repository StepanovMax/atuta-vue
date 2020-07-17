<template>
  <div class="header-bottom">
    <div class="header-bottom__container">
      <Logo location="header" />
    </div>
  </div>
</template>

<script>
import Logo from '../logo.vue'

export default {
  name: 'HeaderBottom',
  components: {
    Logo,
  },
};
</script>