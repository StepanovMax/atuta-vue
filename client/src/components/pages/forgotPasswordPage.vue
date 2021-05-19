<template>
  <div
    id="forgotPasswordPage"
  >

    <div class="help-page__wrap">

      <header class="help-page__header">

        <div class="help-page__header-top">

          <breadcrumbs />

        </div>

        <div class="help-page__header-bottom">

          <h1 class="help-page__title">
            Забыли пароль
          </h1>

        </div>

      </header>

      <div class="help-page__content">

      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'loginPage',
  components: {
    breadcrumbs,
  },
};
</script>