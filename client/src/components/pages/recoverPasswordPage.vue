<template>
  <div
    id="recoverPasswordPage"
  >

    <div class="help-page__wrap">

      <header class="help-page__header">

        <div class="help-page__header-top">

          <breadcrumbs />

        </div>

        <div class="help-page__header-bottom">

          <h1 class="help-page__title">
            Восстановление пароля
          </h1>

        </div>

      </header>

      <div class="login-page__content">

        <div
          ref="email"
          class="template-page__content-row"
        >

          <h3 class="registration-page__title_row">
            Email
          </h3>

          <inputField
            propType="email"
            propClass="login-page__input"
            propKey="email"
            :value.sync="formState.email.value"
          />

          <p
            v-if="
              formState.email.required
              && !emailIsEmpty
              && !emailSyntax
              && firstSubmitResult
            "
            class="paragraph paragraph_invalid"
          >
            Некорректный email(пример: ivanov@mail.ru)
          </p>

          <p
            v-if="
              formState.email.required
              && emailIsEmpty
              && firstSubmitResult
            "
            class="paragraph paragraph_invalid"
          >
            Поле email не должно быть пустым
          </p>

        </div>

        <div
          ref="phone"
          class="template-page__content-row"
        >

          <h3 class="registration-page__title_row">
            Телефон
          </h3>

          <inputField
            propType="phone"
            propClass="login-page__input"
            propKey="phone"
            :value.sync="emailValue"
          />

          <p
            v-if="
              formState.phone.required
              && phoneIsEmpty
              && firstSubmitResult
            "
            class="paragraph paragraph_invalid"
          >
            Поле телефон не должен быть пустым
          </p>

          <p
            v-if="
              formState.phone.exist
            "
            class="paragraph paragraph_invalid"
          >
            Такой номер телефона уже существует
          </p>

          <p
            v-if="
              resultRecoverSuccess
            "
            class="
              paragraph
              paragraph_success
            "
          >
            Ссылка на изменение пароля была выслана вам на почту. Срок действия ссылки 10 минут.
          </p>

          <p
            v-if="
              resultRecoverError
            "
            class="
              paragraph
              paragraph_error
            "
          >
            Что-то пошло не так и пароль не был изменён. Попробуйте повторить отправку.
          </p>

        </div>

        <div class="template-page__content-row">
          <div
            class="
              login-page__btn-wrap
              login-page__btn-wrap_buttons
            "
          >
            <button
              class="
                btn
                btn_blue
                btn_middle
                login-page__btn
                login-page__btn_submit
              "
              @click="submit"
            >
              Восстановить пароль
            </button>
          </div>
        </div>

        <br>

        <local-output-data
          :object="formState"
          name="formState"
        />

      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import breadcrumbs from '@cmp/common/breadcrumbs.vue';
import inputField from '@cmp/common/inputField.vue';
import localOutputData from '@cmp/common/localOutputData.vue';

export default {
  name: 'recoverPasswordPage',
  components: {
    breadcrumbs,
    inputField,
    localOutputData,
  },
  data() {
    return {
      resultRecoverSuccess: false,
      resultRecoverError: false,
      firstSubmitResult: null,
      formState: {
        email: {
          value: null,
          exist: false,
          syntax: null,
          required: true,
        },
        phone: {
          value: null,
          exist: false,
          syntax: null,
          length: 11,
          required: true,
        },
      },
    }
  },
  computed: {
    submitedData() {
      const data = {
        email: this.formState.email.value,
        phone: this.formState.phone.value,
      };
      return data;
    },
    emailSyntax() {
      const emailSyntax = this.validateEmail(this.formState.email.value);
      if (emailSyntax) {
        this.formState.email.syntax = true;
      } else {
        this.formState.email.syntax = false;
      }
      return emailSyntax;
    },
    phoneSyntax() {
      if (
        this.formState.phone.value
        && this.formState.phone.value.length === 11
      ) {
        return false;
      } else {
        return true;
      }
    },
    emailIsEmpty() {
      if (
        this.formState.email.value
        && this.formState.email.value.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    phoneIsEmpty() {
      if (
        this.formState.phone.value == null
      ) {
        console.log('phoneIsEmpty true');
        return true;
      } else {
        console.log('phoneIsEmpty false');
        return false;
      }
    },
    emailFullValidation() {
      if (
        this.formState.email.required
        && !this.emailIsEmpty
        && this.emailSyntax
      ) {
        return true;
      } else {
        return false;
      }
    },
    phoneFullValidation() {
      if (
        this.formState.phone.required
        && !this.phoneIsEmpty
        && this.phoneSyntax
      ) {
        return true;
      } else {
        return false;
      }
    },
    emailValue: {
      cache: false,
      get() {
        return this.formState.phone.value;
      },
      set(value) {
        // console.log('value ::', +value, +value === 7);
        if (+value === 7) {
          value = null;
        }
        // console.log('value ::', value);
        this.formState.phone.value = value;
      },
    },
    submitedData() {
      const data = {
        email: this.formState.email.value,
        phone: this.formState.phone.value,
      };
      return data;
    },
  },
  methods: {
    handleEmail(value) {
      const correctEmail = this.validateEmail(value);
      if (correctEmail) {
        this.formState.email.syntaxCorrect = true;
      } else {
        this.formState.email.syntaxCorrect = false;
      }
      if (value) {
        this.formState.email.filled = true;
      } else {
        this.formState.email.filled = false;
      }
    },
    submit() {
      console.log('test');
      this.firstSubmitResult = true;
      const resultFormValidation = this.formValidation();
      if (resultFormValidation) {
        console.log('sendDataToServer');
        this.sendDataToServer();
      }
    },
    formValidation() {
      if (this.emailFullValidation) {
        return true;
      } else {
        return false;
      }
    },
    async sendDataToServer() {
      this.resultRecoverSuccess = false;
      this.resultRecoverError = false;
      const transport = axios.create({
        withCredentials: true
      });
      await transport.post(
        process.env.host_api + '/auth/recoverPassword',
        {
          data: this.submitedData
        },
      )
        .then(
          response => {
            if (response && response.data) {
              this.resultRecoverSuccess = true;
              this.resultRecoverError = false;
              console.log('response.data ::', response.data);
            }
          }
        )
          .catch(
            error => {
              this.resultRecoverSuccess = false;
              this.resultRecoverError = true;
              console.log('Error recoverPassword ::', error);
            }
          );
      // if (sendDataToServerResult && sendDataToServerResult.data) {
      //   this.authResult = true;
      //   this.$store.commit('updateLoggedInState', true);
      //   console.log('loginResult.data ::', sendDataToServerResult.data);
      //   this.$store.commit('updateUserDataState', sendDataToServerResult.data);
      //   await this.$store.dispatch('getEmployeeByUserID');
      //   // Call the plugin for fav.objects
      //   // this.getFavoritesObjectsByListID(loginResult.data.favouriteObjectsListID);
      //   this.$router.push({
      //     name: 'profilePage'
      //   });
      //   // then update cookie with the TRUE value.
      //   this.setCookie('isLoggedIn', true, {secure: true, 'max-age': 3600});
      // } else {
      //   this.authResult = false;
      // }
    },
  },
};
</script>