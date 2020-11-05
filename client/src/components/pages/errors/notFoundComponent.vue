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
          Наверное, вы ошиблись при наборе адреса или перешли по неверной ссылке.
        </p>

        <p class="paragraph">
          Не расстраивайтесь, выход есть!<br/>
          Перейдите на <router-link :to="{name: 'homePage'}" title="Главная">главную страницу</router-link>.
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