<template>
  <div
    id="favorites"
    class="main"
  >
    <div class="filter">
      <filterDesktop />
    </div>

    <div class="article">
      <h1 class="title title_h1">
        Избранное
      </h1>
      <p class="paragraph">
        Товарищи! начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке модели развития. С другой стороны дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке новых предложений.
      </p>
    </div>
    <ads2 />
  </div>
</template>

<script>
import ads2 from '../ads-2.vue';
import filterDesktop from '../filters/filterDesktop.vue';

export default {
  name: 'favoritesPage',
  components: {
    ads2,
    filterDesktop,
  },
};
</script>