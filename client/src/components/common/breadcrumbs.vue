<template>
  <div class="breadcrumbs">
    <router-link
      class="breadcrumbs__link"
      :to="{
        name: pageObject.name
      }"
      :title="`Перейти подробнее ${pageObject.label}`"
    >
      <iconArrowLeft
        class="get-back-to-prev-url__icon"
      />
      <span>
        Назад на {{ pageObject.label }}
      </span>
    </router-link>
  </div>
</template>

<script>
import iconArrowLeft from '../icons/iconArrowLeft.vue'

export default {
  name: 'breadcrumbs',
  props: {
    propPageName: {
      type: String,
      default: '',
      required: true,
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
    pageObject() {
      let pageObject = {};
      if (this.propPageName === 'companiesPage') {
        pageObject.name = 'companiesPage';
        pageObject.label = 'список компаний';
      } else if (this.propPageName === 'home') {
        pageObject.name = 'home';
        pageObject.label = 'главную';
      }
      return pageObject;
    }
  },
};
</script>