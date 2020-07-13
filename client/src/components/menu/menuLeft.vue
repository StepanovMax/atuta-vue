<template>
  <ul class="menu">
    <li class="menu__item">
      Companies
    </li>
    <li class="menu__item">
      Help
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'styleGuide' }" class="link">
        Common style
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menu',
};
</script>