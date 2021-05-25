<template>
  <div
    v-if="userData"
    id="settingsSubPage"
    class="settings-sub-page"
  >
    <div class="settings-sub-page__row">
      <header class="settings-sub-page__header">
        <h3 class="settings-sub-page__title">
          Личная информация
        </h3>
      </header>

      <router-view
        :key="$route.fullPath"
      />

      <div class="settings-sub-page__content">

        <registrationForm
          :propUserData="userData"
          formType="edit"
        />

      </div>
    </div>


    <local-output-data
      :object="userData"
      name="userData"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex';
import registrationForm from '../../common/registrationForm.vue';
import localOutputData from '@cmp/common/localOutputData.vue';

export default {
  name: 'settings',
  components: {
    registrationForm,
    localOutputData,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'userData',
    ]),
  },
  methods: {
  },
};
</script>