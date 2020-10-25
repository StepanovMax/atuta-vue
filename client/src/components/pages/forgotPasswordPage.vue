<template>
  <div
    id="forgotPasswordPage"
    class="help-page"
  >

    <adsLeft />

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

    <adsRight />

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'loginPage',
  components: {
    adsLeft,
    adsRight,
    breadcrumbs,
  },
};
</script>