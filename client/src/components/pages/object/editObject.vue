<template>
  <div
    id="editObject"
  >

    <errorPage403
      v-if="!isLoggedIn"
    />

    <objectForm
      v-if="isLoggedIn"
      :propObjectData="objectData"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import objectForm from '@cmp/pages/object/objectForm.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';

export default {
  name: 'editObject',
  components: {
    objectForm,
    errorPage403,
  },
  data() {
    return {
      objectData: null,
    }
  },
  computed: {
    ...mapState([
      'isLoggedIn',
    ]),
  },
  beforeMount() {
    if (this.$route.params.objectData) {
      this.objectData = this.$route.params.objectData;
    }
  },
};
</script>