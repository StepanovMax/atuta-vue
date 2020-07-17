<template>
  <div class="menu-mobile">
    <ul class="menu-mobile__list list list_horizontal">
      <li class="menu-mobile__list-item list__item">
        <router-link
          :to="{ name: 'home' }"
          class="link"
        >
          Поиск
        </router-link>
      </li>
      <li class="menu-mobile__list-item list__item">
        Избранное
      </li>
      <li class="menu-mobile__list-item list__item">
        Разместить
      </li>
      <li class="menu-mobile__list-item list__item">
        Сообщения
      </li>
      <li class="menu-mobile__list-item list__item">
        Профиль
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'menuMobile',
  // components: {
  //   iconSettings,
  //   iconHamburger,
  // },
  // data() {
  //   return {
  //     isMenuOpen: false
  //   }
  // },
  // methods: {
  //   closeFilterMobile() {
  //     this.isMenuOpen = false;
  //   }
  // }
};
</script>