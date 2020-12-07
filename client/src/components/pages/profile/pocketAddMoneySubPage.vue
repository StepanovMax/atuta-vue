<template>
  <div
    id=""
    class=""
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        Баланс
      </h3>
    </header>

    <div class="template-page__content">
      <div
        class="pocket-page__balance"
      >
        <p class="paragraph">
          Текущий баланс: 551р.
        </p>
      </div>

      <div class="pocket-page__balance-add">
        <h3 class="pocket-page__title">
          Пополнить баланс
        </h3>

        <div class="pocket-page__balance-add-content">
          <inputWithUnit
            class="
              pocket-page__input
              pocket-page__input_money
            "
            propType="number"
            propUnit="rouble"
            :value.sync="moneyValue"
          />

          <button
            class="
              pocket-page__button
              pocket-page__button_submit
            "
            :class="{
              'btn_disabled': !moneyValue.length
            }"
          >
            Пополнить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputWithUnit from '../../common/inputWithUnit.vue';

export default {
  name: 'pocketAddMoneySubPage',
  components: {
    inputWithUnit,
  },
  data() {
    return {
      moneyValue: '',
    }
  },
};
</script>