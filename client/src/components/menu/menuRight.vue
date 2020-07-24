<template>
  <ul class="menu">
    <li class="menu__item">
      <router-link
        v-slot="{ href, route, navigate, isActive }"
        :to="{ name: 'favorites' }"
        class="link"
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
        >
          Избранное
        </a>
      </router-link>
    </li>
    <li class="menu__item">
      Мои объекты
    </li>
    <li class="menu__item">
      Вход / регистрация
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menuRight',
};
</script>