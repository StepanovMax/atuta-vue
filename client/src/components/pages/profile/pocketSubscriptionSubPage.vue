<template>
  <div
    id=""
    class=""
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        Подписка
      </h3>
    </header>

    <div class="template-page__content">
      <multiselect
        v-model="selectedDuration"
        :options="durationsArray"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        :searchable="true"
        label="label"
        track-by="label"
        placeholder="Период подписки"
      />

      К оплате: {{ selectedDuration.summ }} рублей.

      <p class="paragraph">
        Вашей подписки осталось на 42 дня.
      </p>
    </div>
  </div>
</template>

<script>
import multiselect from 'vue-multiselect';

export default {
  name: 'pocketSubscriptionSubPage',
  components: {
    multiselect,
  },
  data() {
    return {
      selectedDuration: {
        label: '1 месяц',
        slug: '1',
        summ: '1000',
      },
      durationsArray: [
        {
          label: '1 месяц',
          slug: '1',
          summ: '1000',
        },
        {
          label: '2 месяца',
          slug: '2',
          summ: '2000',
        },
        {
          label: '3 месяца',
          slug: '3',
          summ: '3000',
        },
      ],
    }
  },
};
</script>