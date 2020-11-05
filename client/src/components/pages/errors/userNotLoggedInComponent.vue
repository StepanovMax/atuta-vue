<template>
  <div
    id="notFoundPage"
    class="not-found-page"
  >

    <adsLeft />

    <div class="not-found-page__wrap">

      <header class="not-found-page__header">

        <div class="not-found-page__header-top">

          <breadcrumbs />

        </div>

        <div class="not-found-page__header-bottom">

          <h1 class="not-found-page__title">
            403
          </h1>

          <h2 class="not-found-page__subtitle">
            Не хватает прав для просмотра страницы.
          </h2>

        </div>

      </header>

      <div class="not-found-page__content">
        <p class="paragraph">
          Вероятно, вы не вошли на сайт.
        </p>

        <p class="paragraph">
         Попробуйте залогиниться и ещё раз открыть страницу.
        </p>

        <p class="paragraph">
          Не расстраивайтесь, выход есть!<br/>
          Перейдите на <router-link :to="{name: 'loginPage'}" title="Вход на сайт">страницу логина</router-link>.
        </p>
      </div>

    </div>

    <adsRight />

  </div>
</template>

<script>
import adsLeft from '../../adsLeft.vue';
import adsRight from '../../adsRight.vue';
import breadcrumbs from '../../common/breadcrumbs.vue';

export default {
  name: 'notFoundComponent',
  components: {
    adsLeft,
    adsRight,
    breadcrumbs,
  },
};
</script>