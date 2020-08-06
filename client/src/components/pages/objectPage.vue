<template>
  <div
    id="objectPage"
    class="object-page"
  >
    <div class="article">
      <getBackToPrevUrl />
      <h1 class="title title_h1">
        Страница объекта
      </h1>
      <p class="paragraph">
        Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности позволяет оценить значение форм развития. Задача организации, в особенности же постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки соответствующий условий активизации. Товарищи! дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации модели развития.
      </p>
    </div>
    <ads />
  </div>
</template>

<script>
import ads from '../ads.vue';
import getBackToPrevUrl from '../common/getBackToPrevUrl.vue';

export default {
  name: 'objectPage',
  components: {
    ads,
    getBackToPrevUrl,
  },
};
</script>