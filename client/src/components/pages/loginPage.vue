<template>
  <div
    id="loginPage"
    class="template-page"
  >

    <adsLeft />

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
            Логин
          </h3>

          <inputField
            propType="symbolsWithNumbers"
            propClass="login-page__input"
            propKey="login"
            :value.sync="loginData.login"
          />

          <p
            v-if="
              formState.login.firstBlur &&
              !formState.login.filled &&
              !loginData.login
            "
            class="paragraph paragraph_invalid"
          >
            Логин обязателен к заполнению
          </p>

          <p
            v-if="
              formState.login.firstBlur &&
              !formState.login.filled &&
              loginData.login
            "
            class="paragraph paragraph_invalid"
          >
            Минимальная длина 6 символов
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

      </div>

      <pre v-local>{{ loginData }}</pre>
      <pre v-local>{{ formState }}</pre>

    </div>

    <adsRight />

  </div>
</template>

<script>
import axios from 'axios';
import { mapState, store } from 'vuex';

import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import breadcrumbs from '../common/breadcrumbs.vue';
import inputField from '../common/inputField.vue';
import iconOk from '../icons/iconOk.vue';

export default {
  name: 'loginPage',
  components: {
    adsLeft,
    adsRight,
    breadcrumbs,
    inputField,
    iconOk,
  },
  data() {
    return {
      loginData: {
        login: null,
        password: null,
      },
      formState: {
        login: {
          length: 2,
          filled: false,
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
    // Watching login typing
    'loginData.login'(value) {
      this.handleLogin(value);
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
    handleLogin(value) {
      if (value.length >= this.formState.login.length) {
        this.formState.login.filled = true;
      } else {
        this.formState.login.filled = false;
      }
    },
    submit() {
      const resultFormValidation = this.formValidation();
      if (resultFormValidation) {
        this.login();
      }
    },
    formValidation() {
      if (this.formState.login.filled === true && this.formState.password.filled === true) {
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
      console.log('process.env.HOST_API ::', process.env.HOST_API);
      console.log('process.env.HOST_API ::', process.env.HOST_API + '/auth/login');
      const loginResult = await transport.post(
        process.env.HOST_API + '/auth/login',
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
        this.$store.commit('updateLoggedInState', true);
        console.log('loginResult.data ::', loginResult.data);
        this.$store.commit('updateUserDataState', loginResult.data);
        // Call the plugin for fav.objects
        // this.getFavouritesObjectsByListID(loginResult.data.favouriteObjectsListID);
        this.$router.push({ name: 'homePage'});
        // then update cookie with the TRUE value.
        this.setCookie('isLoggedIn', true, {secure: true, 'max-age': 3600});
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
        this.formState.login.firstBlur = true;
      }
    });
  },
};
</script>