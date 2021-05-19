<template>
  <div
    id="addObject"
  >

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

  </div>
</template>

<script>
import { mapState } from 'vuex';

import objectForm from '@cmp/pages/object/objectForm.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';

export default {
  name: 'addObject',
  components: {
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