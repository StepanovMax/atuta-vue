<template>
  <div
    id="loginPage"
  >

    <div class="template-page__wrap">

      <header class="template-page__header">

        <div class="template-page__header-top">

          <breadcrumbs />

        </div>

        <div class="template-page__header-bottom">

          <h1 class="template-page__title">
            Войти
          </h1>

        </div>

      </header>

      <div class="login-page__content">

        <div
          ref="login"
          class="template-page__content-row"
        >
          <h3 class="registration-page__title_row">
            Email
          </h3>

          <inputField
            propType="email"
            propClass="login-page__input"
            propKey="login"
            :value.sync="loginData.email"
          />

          <p
            v-if="
              formState.email.firstBlur &&
              !formState.email.syntaxCorrect
            "
            class="paragraph paragraph_invalid"
          >
            Некорректный email(пример: ivanov@mail.ru)
          </p>

          <p
            v-if="
              !formState.email.filled &&
              formState.email.firstBlur
            "
            class="paragraph paragraph_invalid"
          >
            Поле email не должно быть пустым 
          </p>
        </div>

        <div
          ref="password"
          class="template-page__content-row"
        >
          <h3 class="registration-page__title_row">
            Пароль
          </h3>

          <div class="registration-page__input-wrap">
            <inputField
              class="login-page__input-block"
              propClass="login-page__input"
              propType="password"
              propKey="password"
              :value.sync="loginData.password"
            />
          </div>

          <p
            v-if="
              formState.password.firstBlur &&
              !formState.password.filled
            "
            class="paragraph paragraph_invalid"
          >
            Минимальная длина пароля 8 символов
          </p>

          <p
            v-if="
              formState.password.firstBlur &&
              !loginData.password
            "
            class="paragraph paragraph_invalid"
          >
            Пароль обязателен для заполнения
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
              Войти
            </button>
          </div>
        </div>

        <div class="template-page__content-row">
          <div
            class="
              login-page__btn-wrap
              login-page__btn-wrap_buttons
            "
          >
            <router-link
              class="link"
              :to="{ name: 'recoverPasswordPage' }"
              title="Восстановить пароль"
            >
              Восстановить пароль
            </router-link>
          </div>
        </div>

        <p
          v-if="!authResult"
          class="paragraph paragraph_invalid"
        >
          Логин или пароль неверные.
        </p>

      </div>

      <local-output-data
        :object="loginData"
        name="loginData"
      />

      <local-output-data
        :object="formState"
        name="formState"
      />

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState, store } from 'vuex';

import breadcrumbs from '../common/breadcrumbs.vue';
import inputField from '../common/inputField.vue';
import iconOk from '../icons/iconOk.vue';

import localOutputData from '@cmp/common/localOutputData.vue';

export default {
  name: 'loginPage',
  components: {
    breadcrumbs,
    inputField,
    iconOk,
    localOutputData,
  },
  data() {
    return {
      authResult: true,
      loginData: {
        email: null,
        password: null,
      },
      formState: {
        email: {
          filled: false,
          syntaxCorrect: false,
          firstBlur: false,
          required: true,
        },
        password: {
          filled: false,
          length: 8,
          firstBlur: false,
          required: true,
        },
      },
    }
  },
  watch: {
    // Watching email typing
    'loginData.email'(value) {
      this.handleEmail(value);
    },
    // Watching password typing
    'loginData.password'(value) {
      const isPasswordLengthEnough = this.detectFieldLength(value);
      // If user made the first blur action from the password field.
      this.validatePasswordLength(value);
    },
  },
  computed: {
    ...mapState([
      'isLoggedIn',
      'favouriteObjects',
      'routesHistory',
    ]),
    passwordCorrect() {
      if (
        this.formState.password.filled &&
        this.loginData.password.length >= this.formState.password.length
      ) {
        return true;
      } else {
        return false;
      }
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
      this.authResult = true;
      const resultFormValidation = this.formValidation();
      if (resultFormValidation) {
        this.login();
      }
    },
    formValidation() {
      if (this.formState.email.syntaxCorrect === true && this.formState.password.filled === true) {
        return true;
      } else {
        return false;
      }
    },
    // Validation the passwords field length.
    validatePasswordLength(value) {
      const isPasswordLengthEnough = this.detectFieldLength(value);
      if (isPasswordLengthEnough) {
        this.formState.password.filled = true;
      } else {
        this.formState.password.filled = false;
        this.formState.password.firstBlur = true;
      }
    },
    detectFieldLength(value) {
      const length = value.length;
      if (length < this.formState.password.length) {
        return false;
      } else if (value.length >= this.formState.password.length) {
        return true;
      }
    },
    detectErroredElements() {
      const obj = this.formState;
      this.erroredElementsArray = [];
      for (const key in this.formState) {
        if (!obj.hasOwnProperty(key)) continue;
        const subObj = obj[key];
        if (subObj.required && !subObj.filled) {
          this.erroredElementsArray.push(key);
        }
      }
      return this.erroredElementsArray;
    },
    async login() {
      const transport = axios.create({
        withCredentials: true
      });
      console.log('process.env.host_api ::', process.env.host_api);
      const loginResult = await transport.post(
        process.env.host_api + '/auth/login',
        this.loginData,
      )
        .then(function (response) {
          console.log('Response ::', response);
          return response;
        })
          .catch(function (error) {
            console.log('Error login page ::', error);
            return false;
          });
      if (loginResult && loginResult.data) {
        this.authResult = true;
        this.$store.commit('updateLoggedInState', true);
        console.log('loginResult.data ::', loginResult.data);
        this.$store.commit('updateUserDataState', loginResult.data);
        await this.$store.dispatch('getEmployeeByUserID');
        // Call the plugin for fav.objects
        // this.getFavoritesObjectsByListID(loginResult.data.favouriteObjectsListID);
        this.$router.push({
          name: 'settingsSubPage'
        });
        // then update cookie with the TRUE value.
        this.setCookie('isLoggedIn', true, {secure: true, 'max-age': 3600});
      } else {
        this.authResult = false;
      }
    },
  },
  mounted() {
    // Listening the blur action from password fields.
    this.$root.$on('blur', (value, name) => {
      const isPasswordLengthEnough = this.detectFieldLength(value, name);
      if (name === 'password') {
        this.validatePasswordLength(value);
      } else if (name === 'login') {
        this.formState.email.firstBlur = true;
      }
    });
  },
};
</script>