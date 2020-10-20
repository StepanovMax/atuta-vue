<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__list-item">
        <router-link
          class="breadcrumbs__link"
          :to="{
            name: 'homePage'
          }"
          title="Главная"
        >
          На главную
        </router-link>
      </li>
      <li
        v-if="propPageName"
        class="breadcrumbs__list-item"
      >
        <router-link
          class="breadcrumbs__link"
          :to="{
            name: pageObject.name
          }"
          :title="`Перейти подробнее ${pageObject.label}`"
        >
          {{ pageObject.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import iconArrowLeft from '../icons/iconArrowLeft.vue'

export default {
  name: 'breadcrumbs',
  props: {
    propPageName: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    iconArrowLeft,
  },
  data() {
    return {
      storedObjects: null,
    }
  },
  computed: {
    ...mapState([
      'mobileQuestionState',
    ]),
    pageObject() {
      let pageObject = {};
      if (this.propPageName === 'companiesPage') {
        pageObject.name = 'companiesPage';
        pageObject.label = 'Cписок компаний';
      } else if (this.propPageName === 'helpPage' && !this.mobileQuestionState) {
        pageObject.name = 'helpPage';
        pageObject.label = 'Помощь';
      } else {
        pageObject.name = '';
        pageObject.label = '';
      }
      console.log('this.mobileQuestionState ::', this.mobileQuestionState);
      return pageObject;
    }
  },
};
</script>