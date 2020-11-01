<template>
  <ul class="menu">
    <li class="menu__item">
      <router-link
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'helpPage' }"
        class="link"
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
        >
          Помощь
        </a>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menuLeft',
};
</script>