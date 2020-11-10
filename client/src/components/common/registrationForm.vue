<template>
  <div
    v-if="userDataLocal"
    id="registrationForm"
    class="registration-page__content"
  >

    <div class="template-page__content-row">
      <h3 class="registration-page__title_row">
        Выберите свой статус
      </h3>

      <switcher
        switcherId="registrationSwitcher"
        :items="userRolesModified"
        :value.sync="userDataLocal.role"
      />
    </div>

    <div
      v-if="userDataLocal.role.slug === 'agency' || userDataLocal.role.slug === 'builder'"
      class="template-page__content-row"
    >
      <div class="registration-page__banner">
        <p class="paragraph registration-page__banner-text">
          Внимание!
        </p>
        <p class="paragraph registration-page__banner-text">
          Статус "{{ userDataLocal.role.label }}" платное - 1000руб
        </p>
      </div>
    </div>


    <div
      ref="name"
      class="template-page__content-row"
    >
      <h3
        v-if="userDataLocal.role.slug === 'agency' || userDataLocal.role.slug === 'builder'"
        class="registration-page__title_row"
      >
        Название компании
      </h3>
      <h3
        v-if="userDataLocal.role.slug === 'personal' || userDataLocal.role.slug === 'agent'"
        class="registration-page__title_row"
      >
        ФИО
      </h3>

      <div class="registration-page__input-wrap">
        <inputField
          propType="symbolsWithNumbers"
          propClass="registration-page__input"
          propKey="name"
          key="name"
          :value.sync="userDataLocal.name.label"
          :propValue="userDataLocal.name.label"
        />
      </div>

      <p
        v-if="
          formState.name.firstBlur &&
          !userDataLocal.name.label
        "
        class="paragraph paragraph_invalid"
      >
        <span
          v-if="
            userDataLocal.role.slug === 'agency' || userDataLocal.role.slug === 'builder'
          "
        >
          Название компании обязательно к заполнению
        </span>
        <span
          v-if="
            userDataLocal.role.slug === 'personal' || userDataLocal.role.slug === 'agent'
          "
        >
          ФИО обязательно к заполнению
        </span>
      </p>
    </div>


    <div
      ref="login"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Логин
      </h3>

      <div class="registration-page__input-wrap">
        <inputField
          propType="symbolsWithNumbers"
          propClass="registration-page__input"
          propKey="login"
          :value.sync="userDataLocal.login"
          :propValue="userDataLocal.login"
        />
      </div>

      <p
        v-if="
          formState.login.firstBlur &&
          !formState.login.filled &&
          !userDataLocal.login
        "
        class="paragraph paragraph_invalid"
      >
        Логин обязателен к заполнению
      </p>

      <p
        v-if="
          formState.login.firstBlur &&
          !formState.login.filled &&
          userDataLocal.login
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
          class="registration-page__input-block"
          propClass="registration-page__input"
          propType="password"
          propKey="password"
          :value.sync="userDataLocal.password"
          :propValue="userDataLocal.password"
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
          !userDataLocal.password
        "
        class="paragraph paragraph_invalid"
      >
        Пароль обязателен для заполнения
      </p>
    </div>


    <div
      ref="repassword"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Подтвердить пароль
      </h3>

      <div class="registration-page__input-wrap">
        <inputField
          class="registration-page__input-block"
          propClass="registration-page__input"
          propType="password"
          propKey="repassword"
          :value.sync="userDataLocal.repassword"
          :propValue="userDataLocal.password"
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
          !userDataLocal.repassword
        "
        class="paragraph paragraph_invalid"
      >
        Пароль обязателен для заполнения
      </p>
    </div>


    <div
      ref="email"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Email
      </h3>

      <div class="registration-page__input-wrap">
        <inputField
          propClass="registration-page__input"
          propType="email"
          propKey="email"
          :value.sync="userDataLocal.email"
          :propValue="userDataLocal.email"
        />
      </div>

      <p
        v-if="
          formState.email.firstBlur &&
          !formState.email.syntax &&
          userDataLocal.email
        "
        class="paragraph paragraph_invalid"
      >
        Email должен быть такого типа: info@test.ru
      </p>

      <p
        v-if="
          formState.email.firstBlur &&
          !formState.email.filled &&
          !userDataLocal.email
        "
        class="paragraph paragraph_invalid"
      >
        Email обязателен к заполнению
      </p>
    </div>


    <div
      ref="phone"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Телефон
      </h3>
      <div class="registration-page__input-wrap">
        <inputField
          propClass="registration-page__input"
          propType="phone"
          propKey="phone"
          :value.sync="userDataLocal.phone"
          :propValue="userDataLocal.phone"
        />
      </div>

      <p
        v-if="
          formState.phone.firstBlur &&
          !formState.phone.filled
        "
        class="paragraph paragraph_invalid"
      >
        Телефон обязателен к заполнению
      </p>
    </div>


    <div
      ref="logo"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Логотип
      </h3>

      <upload-images
        id="upload-images"
        :propIsMultiple="false"
        :value.sync="userDataLocal.logo"
        :propValue="userDataLocal.logo"
      />

      <p
        v-if="
          formState.logo.firstBlur &&
          !formState.logo.filled
        "
        class="paragraph paragraph_invalid"
      >
        Логотип нужен обязательно
      </p>
    </div>


    <div
      ref="website"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Сайт
      </h3>

      <div class="registration-page__input-wrap">
        <inputField
          propClass="registration-page__input"
          propType="symbolsWithNumbers"
          propKey="website"
          :value.sync="userDataLocal.website"
          :propValue="userDataLocal.website"
        />
      </div>

      <p
        v-if="
          formState.website.firstBlur &&
          !formState.website.syntax &&
          userDataLocal.website
        "
        class="paragraph paragraph_invalid"
      >
        Сайт должен быть такого типа: test.ru
      </p>
    </div>


    <div
      ref="address"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Адрес
      </h3>

      <div class="registration-page__input-wrap">
        <inputField
          propClass="registration-page__input"
          propType="symbolsWithNumbers"
          propKey="address"
          :value.sync="userDataLocal.address"
          :propValue="userDataLocal.address"
        />
      </div>
    </div>


    <div
      ref="address"
      class="template-page__content-row"
    >
      <h3 class="registration-page__title_row">
        Описание
      </h3>

      <div
        class="
          registration-page__input-wrap
          registration-page__input-wrap_full-width
        "
      >
        <content-editor
          :propContentData="userDataLocal.description ? userDataLocal.description.label : ''"
          :value.sync="userDataLocal.description.label"
        />
      </div>
    </div>


    <pre v-local>{{ userDataLocal }}</pre>


  </div>
</template>

<script>
import iconOk from '../icons/iconOk.vue';
import switcher from '../common/switcher.vue';
import inputField from '../common/inputField.vue';
import uploadImages from '../common/uploadImages.vue';
import contentEditor from './contentEditor.vue';

import { mapState } from 'vuex';
import { transliterate as tr, slugify } from 'transliteration';

export default {
  name: 'registrationPage',
  components: {
    iconOk,
    switcher,
    inputField,
    uploadImages,
    contentEditor,
  },
  props: {
    propUserData: {
      default: {},
      type: Object,
      required: true
    },
  },
  data() {
    return {
      userDataEmpty: {
        role: {},
        login: '',
        password: '',
        repassword: '',
        name: {
          label: '',
          slug: '',
        },
        email: '',
        phone: '',
        logo: [],
        website: '',
        address: '',
        description: {
          label: '',
        },
      },
      userDataLocal: {},
      switcherValue: '',
      userRolesModified: [],
      erroredElementsArray: [],
      formState: {
        name: {
          firstBlur: false,
          filled: false,
          required: true,
        },
        login: {
          length: 4,
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
        repassword: {
          matched: false,
          filled: false,
          length: 8,
          firstBlur: false,
          required: true,
        },
        email: {
          syntax: false,
          filled: false,
          firstBlur: false,
          required: true,
        },
        phone: {
          filled: false,
          firstBlur: false,
          required: true,
        },
        logo: {
          filled: false,
          firstBlur: false,
          required: true,
        },
        website: {
          filled: false,
          firstBlur: false,
          required: false,
        },
        address: {
          filled: false,
          firstBlur: false,
          required: false,
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
      'userData',
    ]),
    passwordsCorrect() {
      if (
        this.formState.password.filled &&
        this.formState.repassword.filled &&
        this.userDataLocal.password.length === this.userDataLocal.repassword.length
      ) {
        return true;
      } else {
        return false;
      }
    },
  }, 
  methods: {
    // Add checked property and make Agent as default
    addCheckedPropertyForUserRoles(role) {
      this.userRoles.forEach(
        item => {
          const itemModified = item;
          if (itemModified.slug === role) {
            itemModified.checked = true;
            this.userDataLocal.role = itemModified;
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
        this.formState.email.filled = true;
      } else {
        this.formState.email.syntax = false;
        this.formState.email.filled = false;
      }
    },
    handleLogin(value) {
      if (value.length >= this.formState.login.length) {
        this.formState.login.filled = true;
      } else {
        this.formState.login.filled = false;
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    handlePhone(value) {
      if (value.length !== 17) {
        this.formState.phone.filled = false;
      } else {
        this.formState.phone.filled = true;
      }
    },
    handleLogo(value) {
      if (value.length) {
        this.formState.logo.filled = true;
      } else {
        this.formState.logo.filled = false;
      }
    },
    submit() {
      const resultFormValidation = this.formValidation();
    },
    updateFormState() {
      this.formState.name.required = true;
    },
    formValidation() {
      const obj = this.formState;
      for (const key in this.formState) {
        if (!obj.hasOwnProperty(key)) continue;
        const subObj = obj[key];
        if (subObj.required && !subObj.filled) {
          subObj.firstBlur = true;
        }
      }
      this.scrollToErroredElement();
    },
    scrollToErroredElement() {
      const position = this.detectHighestErroredElement();
      window.scrollTo(0, position - 50);
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
    detectHighestErroredElement() {
      let arrayMin = [];
      const erroredItemsArray = this.detectErroredElements();
      erroredItemsArray.forEach(
        item => {
          let position;
          let selectedObject;
          let element = this.$refs[item];

          if (element) {
            position = element.offsetTop;
            arrayMin.push(position);
          }
        }
      )

      const min = Math.min( ...arrayMin );
      return min;
    },
    handleName(value) {
      if (value) {
        this.formState.name.filled = true;
        this.userDataLocal.name.slug = slugify(value);
        this.userDataLocal.name.checked = true;
      } else {
        this.formState.name.filled = false;
        this.userDataLocal.name.slug = '';
      }
    },
  },
  watch: {
    'userDataLocal.role'() {
      this.updateFormState();
    },
    // Watching password typing
    'userDataLocal.password'(value) {
      const isPasswordLengthEnough = this.detectFieldLength(value);
      // If user made the first blur action from the password field.
      if (this.formState.password.firstBlur) {
        this.validatePasswordLength(value);
      }
      this.validateSamePasswords();
    },
    // Watching repassword typing
    'userDataLocal.repassword'(value) {
      const isRepasswordLengthEnough = this.detectFieldLength(value);
      // If user made the first blur action from the repassword field.
      if (this.formState.repassword.firstBlur) {
        this.validateRepasswordLength(value);
      }
      this.validateSamePasswords();
    },
    'userDataLocal.email'(value) {
      this.handleEmail(value);
    },
    'userDataLocal.login'(value) {
      this.handleLogin(value);
    },
    'userDataLocal.phone'(value) {
      this.handlePhone(value);
    },
    'userDataLocal.logo'(value) {
      this.handleLogo(value);
    },
    'userDataLocal.name.label'(value) {
      this.handleName(value);
    },
  },
  beforeMount() {
    this.userDataLocal = this.userData;
    if (this.userDataLocal) {
      this.addCheckedPropertyForUserRoles(this.userDataLocal.role);
    } else {
      this.userDataLocal = this.userDataEmpty;
    }
  },
  mounted() {
    this.updateFormState();
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
      } else if (name === 'name') {
        this.formState.name.firstBlur = true;
      } else if (name === 'website') {
        this.formState.website.firstBlur = true;
      }
    });
    // console.log('process.env.host ::', process.env.HOST);
  },
};
</script>