<template>
  <div
    id=""
    class=""
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        История операций
      </h3>
    </header>

    <div class="template-page__content">
      <ul class="pocket-page__list">
        <li class="pocket-page__list-item">
          <div
            class="
              pocket-page__list-item-cell
              pocket-page__list-item-cell_date
              pocket-page__list-item-cell_head
            "
          >
            Дата
          </div>
          <div
            class="
              pocket-page__list-item-cell
              pocket-page__list-item-cell_name
              pocket-page__list-item-cell_head
            "
          >
            Операция
          </div>
          <div
            class="
              pocket-page__list-item-cell
              pocket-page__list-item-cell_summ
              pocket-page__list-item-cell_head
            "
          >
            Сумма
          </div>
        </li>
        <li
          class="pocket-page__list-item"
          v-for="(item, index) in historyArray"
          :key="'key-' + index"
        >
          <div
            class="
              pocket-page__list-item-cell
              pocket-page__list-item-cell_date
            "
          >
            <p class="pocket-page__list-paragraph">
              {{ gTimestampToDateConverter(item.date) }}
            </p>
          </div>
          <div
            class="
              pocket-page__list-item-cell
              pocket-page__list-item-cell_name
            "
          >
            <p class="pocket-page__list-paragraph">
              {{ item.name }}
            </p>
            <p class="pocket-page__list-paragraph">
              Объявление № {{ item.number }}
            </p>
          </div>
          <div
            class="
              pocket-page__list-item-cell
              pocket-page__list-item-cell_summ
            "
          >
            <p class="pocket-page__list-paragraph">
              {{ item.summ }}
            </p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

export default {
  name: 'pocketOperationsSubPage',
  data() {
    return {
      historyArray: [
        {
          date: 1607350495,
          name: 'Пакет услуг «Турбо-продажа»',
          number: 394898380,
          summ: 550,
        },
        {
          date: 1606350495,
          name: 'Пакет услуг «Турбо-продажа»',
          number: 394898380,
          summ: 450,
        },
        {
          date: 1605350495,
          name: 'Пакет услуг «Турбо-продажа»',
          number: 394898380,
          summ: 350,
        },
        {
          date: 1604350495,
          name: 'Пакет услуг «Турбо-продажа»',
          number: 394898380,
          summ: 250,
        },
        {
          date: 1603350495,
          name: 'Пакет услуг «Турбо-продажа»',
          number: 394898380,
          summ: 150,
        },
      ],
    }
  },
};
</script>