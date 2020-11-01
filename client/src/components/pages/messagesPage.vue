<template>
  <div
    id="messagesPage"
    class="template-page"
  >

    <adsLeft />

    <div class="template-page__wrap">

      <header class="template-page__header">

        <div class="template-page__header-top">

          <breadcrumbs />

        </div>

        <div class="template-page__header-bottom">

          <h1 class="template-page__title">
            Мои сообщения
          </h1>

        </div>

      </header>

      <div class="template-page__content">

      </div>

    </div>

    <adsRight />

  </div>
</template>

<script>
import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'messagesPage',
  components: {
    adsLeft,
    adsRight,
    breadcrumbs,
  },
};
</script>