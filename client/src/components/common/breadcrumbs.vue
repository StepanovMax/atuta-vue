<template>
  <div class="breadcrumbs">
    <router-link
      class="breadcrumbs__link"
      :to="{
        name: pageObject.name
      }"
      :title="`Перейти подробнее ${pageObject.label}`"
    >
      &lt; Назад на {{ pageObject.label }}
    </router-link>
  </div>
</template>

<script>
import iconRouble from '../icons/iconRouble.vue';

export default {
  name: 'breadcrumbs',
  props: {
    propPageName: {
      type: String,
      default: '',
      required: true,
    },
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
      }
      return pageObject;
    }
  },
};
</script>