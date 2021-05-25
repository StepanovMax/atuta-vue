<template>
  <div id="changePasswordPage">

    <div
      class="help-page__wrap"
    >

      <header class="help-page__header">

        <div class="help-page__header-top">

          <breadcrumbs />

        </div>


        <div class="help-page__header-bottom">

          <h1 class="help-page__title">
            Изменение пароля
          </h1>

        </div>

      </header>


      <div class="help-page__wrap">

        <changePasswordForm />

      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

import breadcrumbs from '@cmp/common/breadcrumbs.vue';
import changePasswordForm from '@cmp/pages/changePasswordForm.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';

export default {
  name: 'changePasswordPage',
  components: {
    breadcrumbs,
    changePasswordForm,
    errorPage403,
  },
  computed: {
    ...mapState([
      'isLoggedIn',
    ]),
  },
  async mounted() {
    if (this.isLoggedIn) {
      this.$router.push({
        name: 'changePasswordFromAccountPage'
      });
    }
  }
};
</script>
