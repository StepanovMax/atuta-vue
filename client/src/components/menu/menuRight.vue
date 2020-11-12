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
          :class="{'link_active-menu': isActive}"
        >
          Компании
        </a>
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      class="menu__item"
    >
      <router-link
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'favoritesSubPage' }"
        class="link"
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
          :class="{'link_active-menu': isActive}"
        >
          Избранное
        </a>
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      class="menu__item"
    >
      <router-link
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'myObjectsSubPage' }"
        class="link"
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
          :class="{'link_active-menu': isActive}"
        >
          Мои объявления
        </a>
      </router-link>
    </li>
    <li
      v-if="isLoggedIn"
      class="menu__item"
    >
      <router-link
        v-slot="{ href, navigate, isActive }"
        :to="{ name: 'addObject' }"
      >
        <a
          :active="isActive"
          :href="href"
          @click="navigate"
          class="link_active-menu-create-object"
        >
          Подать объявление
        </a>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'menuRight',
  computed: {
    ...mapState([
      'isLoggedIn',
    ]),
  },
};
</script>