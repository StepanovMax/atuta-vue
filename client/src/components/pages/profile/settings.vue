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


    <div
      v-local
      v-if="false && userData"
      class="local-output-data"
    >
      <h6 class="
        title
        title_h6
        title_bold
      ">
        userData
      </h6>
      <pre>
        {{ userData }}
      </pre>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import registrationForm from '../../common/registrationForm.vue';

export default {
  name: 'settings',
  components: {
    registrationForm,
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