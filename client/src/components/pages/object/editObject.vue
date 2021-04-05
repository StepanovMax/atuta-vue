<template>
  <div
    id="editObject"
    class="main add-object-page"
  >

    <adsLeft />

    <errorPage403
      v-if="!isLoggedIn"
    />

    <div
      v-if="isLoggedIn"
      class="article article_add"
    >
      <h1
        class="
          title
          title_h3
          title_bold
          form__title_add-object-main
        "
      >
        Редактировать объявление
      </h1>

    </div>

    <adsRight />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import adsLeft from '@cmp/adsLeft.vue';
import adsRight from '@cmp/adsRight.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';

export default {
  name: 'editObject',
  components: {
    adsLeft,
    adsRight,
    errorPage403,
  },
  computed: {
    ...mapState([
      'isLoggedIn',
    ]),
  },
};
</script>