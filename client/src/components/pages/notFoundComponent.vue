<template>
  <div
    id="notFoundPage"
    class="not-found-page"
  >

    <adsLeft />

    <div class="not-found-page__wrap">

      <header class="not-found-page__header">

        <h1 class="not-found-page__title">
          404
        </h1>

        <h1 class="not-found-page__subtitle">
          Страница не найдена
        </h1>

      </header>

    </div>

    <adsRight />

  </div>
</template>

<script>
import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';

export default {
  name: 'notFoundComponent',
  components: {
    adsLeft,
    adsRight,
  },
};
</script>