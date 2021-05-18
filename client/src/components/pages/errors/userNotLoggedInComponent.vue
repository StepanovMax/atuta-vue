<template>
  <div
    id="notFoundPage"
    class="not-found-page"
  >

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
          Вероятно, ваша сессия кончилась или вы не вошли на сайт.
        </p>

        <p class="paragraph">
         Попробуйте <router-link :to="{name: 'loginPage'}" title="Вход на сайт">залогиниться</router-link> и ещё раз открыть страницу.
        </p>
      </div>

    </div>

  </div>
</template>

<script>
import breadcrumbs from '../../common/breadcrumbs.vue';

export default {
  name: 'notFoundComponent',
  components: {
    breadcrumbs,
  },
};
</script>