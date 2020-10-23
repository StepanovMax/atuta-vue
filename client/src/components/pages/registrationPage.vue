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
            v-if="formState.password.firstBlur && !formState.password.filled"
            class="paragraph paragraph_invalid"
          >
            Минимальная длина пароля 8 символов.
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
        </div>

      </div>

      <pre v-if="false">{{ userData }}</pre>

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
      },
      userRolesModified: [],
      formState: {
        companyName: false,
        login: false,
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
      },
      firstValidationCheck: false,
    }
  },
  computed: {
    ...mapState([
      'userRoles',
    ]),
    passwordsCorrect() {
      console.log(this.formState.password.filled, this.formState.repassword.filled, this.formState.password.length === this.formState.repassword.length);
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
    }
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
  },
  mounted() {
    // Listening the blur action from password fields.
    this.$root.$on('blur', (value, name) => {
      const isPasswordLengthEnough = this.detectFieldLength(value, name);
      if (name === 'password') {
        this.validatePasswordLength(value);
      } else if (name === 'repassword') {
        this.validateRepasswordLength(value);
      }
    });
  },
};
</script>