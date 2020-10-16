<template>
  <div
    id="helpPage"
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
            Помощь
          </h1>

        </div>

      </header>

      <div class="help-page__content">

        <div class="help-page__questions">
          <ul class="help-page__questions-list">
            <li
              class="help-page__questions-list-item"
              v-for="(item, index) in questionsData"
              :key="index"
            >
              <router-link
                class="help-page__link"
                :to="{
                  name: 'answer',
                  params: {
                    id: index + 1,
                    data: item.answer,
                  }
                }"
              >
                {{ item.question }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="help-page__answers">
          <router-view></router-view>
        </div>

      </div>

    </div>

    <adsRight />

  </div>
</template>

<script>
import axios from 'axios';

import grid from '../grid.vue';
import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'companyPage',
  components: {
    adsLeft,
    adsRight,
    breadcrumbs,
  },
  data() {
    return {
      storedObjects: null,
      questionsData: [
        {
          question: 'Почему не получается дозвониться до поддержки?',
          answer: 'Сейчас мы периодически отключаем голосовую линию и отвечаем только на письма. Мы понимаем, что это не всегда удобно — некоторые вопросы быстрее объяснить по телефону и тут же получить решение. Поэтому мы приносим свои извинения и хотим рассказать, из-за чего это происходит и как мы решаем проблему.',
        },
        {
          question: 'Почему заблокировали мой профиль?',
          answer: 'Если ваш аккаунт заблокирован, при входе в него вы увидите оповещение и причину блокировки.',
        },
        {
          question: 'Почему объявление не видно в поиске?',
          answer: 'Возможные причины, по которым вы не видите свое объявление: Оно еще на проверке. Обычно объявление появляется на Авито уже спустя пару минут, но в редких случаях это может занять до 2 суток. Чтобы проверить, появилось ли объявление в поиске, поищите его по номеру.',
        },
      ],
    }
  },
  computed: {

  },
  beforeMount(){

  },
  methods: {

  },
};
</script>