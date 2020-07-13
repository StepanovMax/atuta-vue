<template>
  <router-link
    class="logo"
    :to="{ name: 'home' }"
    title="Приобретите свою недвижимость вместе с Атута"
  >
    <img src="src/images/logo/logo_desktop.png">
  </router-link>
</template>

<script>
export default {
  name: 'logo',
};
</script>