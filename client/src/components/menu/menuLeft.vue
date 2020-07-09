<template>
  <ul class="menu">
    <li class="menu__item">
      Компании
    </li>
    <li class="menu__item">
      Помощь
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'styleGuide' }" class="link">
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