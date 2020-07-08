<template>
  <ul class="menu">
    <li class="menu__item">
      <router-link :to="{ name: 'home' }">
        Главная
      </router-link>
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'styleGuide' }">
        Общий стиль
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menu',
};
</script>