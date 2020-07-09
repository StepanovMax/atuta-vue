<template>
  <ul class="menu">
    <li class="menu__item">
      Избранное
    </li>
    <li class="menu__item">
      Мои объявления
    </li>
    <li class="menu__item">
      Войти / Регистрация
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