<template>
  <ul class="menu menu_right">
    <li class="menu__item">
      <router-link
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'companiesPage' }"
        class="link"
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
        >
          Компании
        </a>
      </router-link>
    </li>
    <li class="menu__item">
      <router-link
        v-slot="{ href, navigate, isActive }"
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
      <router-link
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'addObject' }"
        class="
          btn
          menu__btn
        "
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
        >
          Подать объявление
        </a>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menuRight',
};
</script>