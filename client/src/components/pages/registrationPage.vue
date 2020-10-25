<template>
  <div
    id="registrationPage"
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
            Регистрация
          </h1>

        </div>

      </header>

      <div class="registration-page__content">

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Выберите свою роль
          </h3>

          <switcher
            v-if="true"
            switcherId="registrationSwitcher"
            :items="userRolesModified"
            :value.sync="userData.role"
          />
        </div>

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Название компании
          </h3>

          <inputField
            propType="symbolsWithNumbers"
            propClass="registration-page__input"
            propKey="companyName"
            :value.sync="userData.companyName"
          />
        </div>

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Логин
          </h3>

          <inputField
            propType="symbolsWithNumbers"
            propClass="registration-page__input"
            propKey="login"
            :value.sync="userData.login"
          />

          <p
            v-if="
              formState.login.firstBlur &&
              !userData.login
            "
            class="paragraph paragraph_invalid"
          >
            Логин обязателен к заполнению
          </p>

          <p
            v-if="
              formState.login.firstBlur &&
              !formState.login.length &&
              userData.login
            "
            class="paragraph paragraph_invalid"
          >
            Минимальная длина 6 символов
          </p>
        </div>

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Пароль
          </h3>

          <div class="registration-page__input-wrap">
            <inputField
              class="registration-page__input-block"
              propClass="registration-page__input"
              propType="password"
              propKey="password"
              :value.sync="userData.password"
            />
            <iconOk
              v-if="passwordsCorrect"
              class="registration-page__icon_ok"
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
              !userData.password
            "
            class="paragraph paragraph_invalid"
          >
            Пароль обязателен для заполнения
          </p>
        </div>

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Подтвердить пароль
          </h3>

          <div class="registration-page__input-wrap">
            <inputField
              class="registration-page__input-block"
              propClass="registration-page__input"
              propType="password"
              propKey="repassword"
              :value.sync="userData.repassword"
            />
            <iconOk
              v-if="passwordsCorrect"
              class="registration-page__icon_ok"
            />
          </div>

          <p
            v-if="formState.repassword.firstBlur && !formState.repassword.matched"
            class="paragraph paragraph_invalid"
          >
            Пароль не совпадает
          </p>

          <p
            v-if="
              formState.repassword.firstBlur &&
              !userData.repassword
            "
            class="paragraph paragraph_invalid"
          >
            Пароль обязателен для заполнения
          </p>
        </div>

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Email
          </h3>

          <div class="registration-page__input-wrap">
            <inputField
              propClass="registration-page__input"
              propType="email"
              propKey="email"
              :value.sync="userData.email"
            />
          </div>

          <p
            v-if="
              formState.email.firstBlur &&
              !formState.email.syntax &&
              userData.email
            "
            class="paragraph paragraph_invalid"
          >
            Email должен быть такого типа: info@test.ru
          </p>

          <p
            v-if="
              formState.email.firstBlur &&
              !formState.email.required &&
              !userData.email
            "
            class="paragraph paragraph_invalid"
          >
            Email обязателен к заполнению
          </p>
        </div>

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Телефон
          </h3>
          <div class="registration-page__input-wrap">
            <inputField
              propClass="registration-page__input"
              propType="phone"
              propKey="phone"
              :value.sync="userData.phone"
            />
          </div>

          <p
            v-if="
              formState.phone.firstBlur &&
              !formState.phone.required
            "
            class="paragraph paragraph_invalid"
          >
            Телефон обязателен к заполнению
          </p>
        </div>

        <div class="template-page__content-row">
          <h3 class="registration-page__title_row">
            Телефон
          </h3>
          <upload-images
            id="upload-images"
            :propIsMultiple="false"
            :value.sync="userData.photo"
          />
        </div>

        <div class="template-page__content-row">
          <div
            class="
              registration-page__btn-wrap
              registration-page__btn-wrap_buttons
            "
          >
            <button
              class="
                btn
                btn_blue
                btn_middle
                registration-page__btn
                registration-page__btn_submit
              "
            >
              Регистрация
            </button>
          </div>
          <div
            class="
              registration-page__btn-wrap
              registration-page__btn-wrap_links
            "
          >
            <router-link
              :to="{ name: 'loginPage' }"
              class="link"
            >
              Войти
            </router-link>
            <span class="">
              &nbsp;/&nbsp;
            </span>
            <router-link
              :to="{ name: 'forgotPasswordPage' }"
              class="link"
            >
              Забыли пароль
            </router-link>
          </div>
        </div>

      </div>

      <pre v-local>{{ userData }}</pre>

    </div>

    <adsRight />

  </div>
</template>

<script>
import adsLeft from '../adsLeft.vue';
import adsRight from '../adsRight.vue';
import breadcrumbs from '../common/breadcrumbs.vue';
import switcher from '../common/switcher.vue';
import inputField from '../common/inputField.vue';
import iconOk from '../icons/iconOk.vue';
import uploadImages from '../common/uploadImages.vue';

import { mapState } from 'vuex';

export default {
  name: 'registrationPage',
  components: {
    iconOk,
    adsLeft,
    adsRight,
    breadcrumbs,
    switcher,
    inputField,
    uploadImages,
  },
  data() {
    return {
      switcherValue: '',
      userData: {
        role: null,
        login: null,
        password: null,
        repassword: null,
        companyName: null,
        email: null,
        phone: null,
        photo: null,
      },
      userRolesModified: [],
      formState: {
        companyName: false,
        login: {
          length: 6,
          filled: false,
          firstBlur: false,
        },
        password: {
          filled: false,
          length: 8,
          firstBlur: false,
        },
        repassword: {
          matched: false,
          filled: false,
          length: 8,
          firstBlur: false,
        },
        email: {
          syntax: false,
          required: false,
          firstBlur: false,
        },
        phone: {
          required: false,
          firstBlur: false,
        },
        photo: {
          required: false,
          firstBlur: false,
        },
      },
      email: '',
      correctEmail: '',
      firstValidationCheck: false,
    }
  },
  computed: {
    ...mapState([
      'userRoles',
    ]),
    passwordsCorrect() {
      if (
        this.formState.password.filled &&
        this.formState.repassword.filled &&
        this.userData.password.length === this.userData.repassword.length
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  beforeMount() {
    this.addCheckedPropertyForUserRoles('agent');
  },
  methods: {
    // Add checked property and make Agent as default
    addCheckedPropertyForUserRoles(role) {
      this.userRoles.forEach(
        item => {
          const itemModified = item;
          if (itemModified.slug === role) {
            itemModified.checked = true;
            this.userData.role = itemModified;
          } else {
            itemModified.checked = false;
          }
          this.userRolesModified.push(itemModified);
        }
      );
    },
    detectFieldLength(value) {
      const length = value.length;
      if (value.length < this.formState.password.length) {
        return false;
      } else if (value.length >= this.formState.password.length) {
        return true;
      }
    },
    // Validation the passwords field length.
    validatePasswordLength(value) {
      const isPasswordLengthEnough = this.detectFieldLength(value);
      if (!isPasswordLengthEnough) {
        this.formState.password.filled = false;
        this.formState.password.firstBlur = true;
      } else {
        this.formState.password.filled = true;
      }
    },
    // Validation the repasswords field length.
    validateRepasswordLength(value) {
      const isRepasswordLengthEnough = this.detectFieldLength(value);
      if (!isRepasswordLengthEnough) {
        this.formState.repassword.filled = false;
        this.formState.repassword.firstBlur = true;
      } else {
        this.formState.repassword.filled = true;
      }
    },
    // Checking whether the both passwords are the same.
    validateSamePasswords() {
      if (this.passwordsCorrect) {
        this.formState.repassword.matched = true;
      } else {
        this.formState.repassword.matched = false;
      }
    },
    handleEmail(value) {
      this.email = value;
      this.correctEmail = this.validateEmail(this.email);
      if (this.correctEmail) {
        this.formState.email.syntax = true;
        this.formState.email.requried = true;
      } else {
        this.formState.email.syntax = false;
        this.formState.email.requried = false;
      }
    },
    handleLogin(value) {
      if (value.length >= 6) {
        this.formState.login.length = true;
      } else {
        this.formState.login.length = false;
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    handlePhone(value) {
      if (value.length !== 17) {
        this.formState.phone.required = false;
      } else {
        this.formState.phone.required = true;
      }
    },
  },
  watch: {
    // Watching password typing
    'userData.password'(value) {
      const isPasswordLengthEnough = this.detectFieldLength(value);
      // If user made the first blur action from the password field.
      if (this.formState.password.firstBlur) {
        this.validatePasswordLength(value);
      }
      this.validateSamePasswords();
    },
    // Watching repassword typing
    'userData.repassword'(value) {
      const isRepasswordLengthEnough = this.detectFieldLength(value);
      // If user made the first blur action from the repassword field.
      if (this.formState.repassword.firstBlur) {
        this.validateRepasswordLength(value);
      }
      this.validateSamePasswords();
    },
    'userData.email'(value) {
      this.handleEmail(value);
    },
    'userData.login'(value) {
      this.handleLogin(value);
    },
    'userData.phone'(value) {
      this.handlePhone(value);
    },
  },
  mounted() {
    // Listening the blur action from password fields.
    this.$root.$on('blur', (value, name) => {
      const isPasswordLengthEnough = this.detectFieldLength(value, name);
      if (name === 'password') {
        this.validatePasswordLength(value);
      } else if (name === 'repassword') {
        this.validateRepasswordLength(value);
      } else if (name === 'email') {
        this.formState.email.firstBlur = true;
      } else if (name === 'login') {
        this.formState.login.firstBlur = true;
      } else if (name === 'phone') {
        this.formState.phone.firstBlur = true;
      }
    });
  },
};
</script>