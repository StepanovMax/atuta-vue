<template>
  <div
    id="editObject"
    class="main add-object-page"
  >

    <adsLeft />

    <errorPage403
      v-if="!isLoggedIn"
    />

    <objectForm
      v-if="isLoggedIn"
      :propObjectData="objectData"
    />

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
  name: 'editObject',
  components: {
    adsLeft,
    adsRight,
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