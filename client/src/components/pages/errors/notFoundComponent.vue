<template>
  <div
    id="notFoundPage"
  >

    <div class="not-found-page__wrap">

      <header class="not-found-page__header">

        <div class="not-found-page__header-top">

          <breadcrumbs />

        </div>

        <div class="not-found-page__header-bottom">

          <h1 class="not-found-page__title">
            404
          </h1>

          <h2 class="not-found-page__subtitle">
            Страница не найдена
          </h2>

        </div>

      </header>

      <div class="not-found-page__content">
        <p class="paragraph">
          Ой! Такой страницы на нашем сайте нет :(
        </p>

        <p class="paragraph">
          Вероятно, данная страница была удалена либо она исчезла по другой причине.
        </p>

        <p class="paragraph">
          Перейти на <router-link :to="{name: 'homePage'}" title="Главная">главную страницу</router-link>.
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