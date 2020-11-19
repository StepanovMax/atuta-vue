<template>
  <div class="menu-mobile">
    <ul
      class="menu-mobile__list list list_horizontal"
    >
      <li class="menu-mobile__list-item list__item">
        <router-link
          v-slot="{ href, route, navigate, isActive }"
          :to="{ name: 'homePage' }"
          class="link menu-mobile__link"
          exact
        >
          <a
            :active="isActive"
            :href="href"
            @click="navigate"
          >
            <logoDefault
              class="menu-mobile__icon"
              :class="[
                { 'icon_active': isActive }
              ]"
            />
            <p
              class="menu-mobile__text"
              :class="[
                { 'menu-mobile__text_active': isActive }
              ]"
            >
              Поиск
            </p>
          </a>
        </router-link>
      </li>
      <li class="menu-mobile__list-item list__item">
        <router-link
          v-slot="{ href, navigate, isActive }"
          :to="{ name: 'favoritesSubPage' }"
          class="link menu-mobile__link"
        >
          <a
            :active="isActive"
            :href="href"
            @click="navigate"
          >
            <iconHeart
              class="menu-mobile__icon"
              :class="[
                { 'icon_active': isActive }
              ]"
            />
            <p
              class="menu-mobile__text"
              :class="[
                { 'menu-mobile__text_active': isActive }
              ]"
            >
              Избранное
            </p>
          </a>
        </router-link>
      </li>
      <li class="menu-mobile__list-item list__item">
        <router-link
          v-slot="{ href, route, navigate, isActive }"
          :to="{ name: 'addObject' }"
          class="link menu-mobile__link"
        >
          <a
            :active="isActive"
            :href="href"
            @click="navigate"
          >
            <iconPlusInCircle
              class="menu-mobile__icon"
              :class="[
                { 'icon_active': isActive }
              ]"
            />
            <p
              class="menu-mobile__text"
              :class="[
                { 'menu-mobile__text_active': isActive }
              ]"
            >
              Разместить
            </p>
          </a>
        </router-link>
      </li>
      <li class="menu-mobile__list-item list__item">
        <router-link
          v-slot="{ href, navigate, isActive }"
          :to="{ name: 'dialogsSubPage' }"
          class="link menu-mobile__link"
        >
          <a
            :active="isActive"
            :href="href"
            @click="navigate"
          >
            <iconMessages
              class="menu-mobile__icon"
              :class="[
                { 'icon_active': isActive }
              ]"
            />
            <p
              class="menu-mobile__text"
              :class="[
                { 'menu-mobile__text_active': isActive }
              ]"
            >
              Сообщения
            </p>
          </a>
        </router-link>
      </li>
      <li class="menu-mobile__list-item list__item">
        <router-link
          v-slot="{ href, navigate, isActive }"
          :to="{ name: 'settingsSubPage' }"
          class="link menu-mobile__link"
        >
          <a
            :active="isActive"
            :href="href"
            @click="navigate"
          >
            <iconProfile
              class="menu-mobile__icon"
              :class="[
                { 'icon_active': isActive }
              ]"
            />
            <p
              class="menu-mobile__text"
              :class="[
                { 'menu-mobile__text_active': isActive }
              ]"
            >
              Профиль
            </p>
          </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import logoDefault from '../logo/logoDefault.vue'
import iconHeart from '../icons/iconHeart.vue'
import iconMessages from '../icons/iconMessages.vue'
import iconProfile from '../icons/iconProfile.vue'
import iconPlusInCircle from '../icons/iconPlusInCircle.vue'

export default {
  name: 'menuMobile',
  components: {
    logoDefault,
    iconHeart,
    iconMessages,
    iconProfile,
    iconPlusInCircle,
  },
};
</script>