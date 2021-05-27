<template>
  <div
    id=""
    class=""
    v-if="userData"
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
          Текущий баланс: {{ moneyBalance }}р.
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
              'btn_disabled': !activeButtonState
            }"
            @click="cashIn()"
          >
            Пополнить
          </button>
        </div>

      </div>

        <p
          v-if="balanceUpdatedSuccess"
          class="paragraph paragraph_success"
        >
          Ваш баланс пополнен.
        </p>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import inputWithUnit from '../../common/inputWithUnit.vue';

export default {
  name: 'pocketAddMoneySubPage',
  components: {
    inputWithUnit,
  },
  data() {
    return {
      moneyValue: 0,
      balanceUpdatedSuccess: false,
    }
  },
  computed: {
    ...mapState([
      'userData',
    ]),
    userId() {
      let id = null;
      if (this.userData && this.userData.id) {
        id = this.userData.id;
      }
      return id;
    },
    activeButtonState() {
      if (
        this.moneyValue
        && Boolean(this.moneyValue.length)
        && +this.moneyValue !== 0
        && +this.moneyValue >= 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    moneyBalance() {
      let value = 0;
      if (
        this.userData
        && this.userData.moneyBalance
      ) {
        value = this.userData.moneyBalance;
      }
      return value;
    },
  },
  methods: {
    showMessage(message) {
      this.balanceUpdatedSuccess = false;
      if (message === 'ok') {
        this.balanceUpdatedSuccess = true;
      } else {
        this.balanceUpdatedSuccess = false;
      }
      setTimeout(
        () => {
          this.balanceUpdatedSuccess = false;
        },
        5000
      );
    },
    updateMoneyBalaceState(money) {
      let newUserData = {...this.userData};
      newUserData.moneyBalance = money;
      // Fill out userData statement.
      this.$store.commit('updateUserDataState', newUserData);
    },
    async cashIn() {
      const transport = axios.create({
        withCredentials: true
      });

      const sendedData = {
        money: +this.moneyValue,
        userId: this.userData.id,
      };

      await transport.post(
        process.env.host_api + '/money/add',
        {
          data: sendedData
        }
      )
        .then(
          response => {
            this.showMessage(response.data.message);
            this.updateMoneyBalaceState(response.data.money);
          }
        )
          .catch(
            error => {
              console.error('Error [cashIn] ::', error);
            }
          );

    },
  },
  mounted() {
    console.log('userData ::', this.userData);
  }
};
</script>