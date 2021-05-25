<template>
  <div
    id="changePasswordPage"
  >

    <errorPage403
      v-if="!isLoggedIn"
    />

    <div
      v-else
      class="help-page__wrap"
    >

      <header class="help-page__header">

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
  name: 'changePasswordFromAccountPage',
  components: {
    breadcrumbs,
    errorPage403,
    changePasswordForm,
  },
  computed: {
    ...mapState([
      'isLoggedIn',
    ]),
  },
};
</script>
