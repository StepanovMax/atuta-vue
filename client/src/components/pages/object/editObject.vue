<template>
  <div
    id="editObject"
  >

    <errorPage404
      v-if="
        isLoggedIn
        && !doesThisObjectIsMyObject
      "
    />

    <errorPage403
      v-if="!isLoggedIn"
    />

    <objectForm
      v-if="
        isLoggedIn
        && doesThisObjectIsMyObject
      "
      :propObjectData="objectData"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import objectForm from '@cmp/pages/object/objectForm.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';
import errorPage404 from '@cmp/pages/errors/notFoundComponent.vue';

export default {
  name: 'editObject',
  components: {
    objectForm,
    errorPage403,
    errorPage404,
  },
  data() {
    return {
      objectData: null,
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
    doesThisObjectIsMyObject() {
      if (
        this.objectData
        && (this.objectData.userId === this.userData.id)
      ) {
        console.log('doesThisObjectIsMyObject true ::');
        return true;
      } else {
        console.log('doesThisObjectIsMyObject false ::');
        return false;
      }
    },
  },
  beforeMount() {
    if (this.$route.params.objectData) {
      this.objectData = this.$route.params.objectData;
    }
  },
};
</script>