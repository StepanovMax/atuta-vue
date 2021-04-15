<template>
  <div
    id="addObject"
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

      <objectForm
        v-if="isLoggedIn"
      />

    </div>

    <adsRight />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import adsLeft from '@cmp/adsLeft.vue';
import adsRight from '@cmp/adsRight.vue';
import objectForm from '@cmp/pages/object/objectForm.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';

export default {
  name: 'addObject',
  components: {
    adsLeft,
    adsRight,
    objectForm,
    errorPage403,
  },
  computed: {
    ...mapState([
      'isLoggedIn',
    ]),
  },
};
</script>