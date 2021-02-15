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

      <registrationForm
        :propUserData="userData"
        formType="reg"
      />

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
import registrationForm from '../common/registrationForm.vue';

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
    registrationForm,
  },
  data() {
    return {
      switcherValue: '',
      userData: {
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
      },
      userRolesModified: [],
      erroredElementsArray: [],
      formState: {
        name: {
          firstBlur: false,
          filled: false,
          required: true,
        },
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
    // this.addCheckedPropertyForUserRoles('personal');
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
        this.formState.email.filled = true;
      } else {
        this.formState.email.syntax = false;
        this.formState.email.filled = false;
      }
    },
    handleLogin(value) {
      if (value.length >= 6) {
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
      if (this.userData.role.slug === 'personal' || this.userData.role.slug === 'agent') {
        this.formState.name.required = true;
        this.formState.name.required = false;
      } else if (this.userData.role.slug === 'agency' || this.userData.role.slug === 'builder') {
        this.formState.name.required = false;
        this.formState.name.required = true;
      }
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
    handlename(value) {
      if (value) {
        this.formState.name.filled = true;
      } else {
        this.formState.name.filled = false;
      }
    },
    handlename(value) {
      if (value) {
        this.formState.name.filled = true;
      } else {
        this.formState.name.filled = false;
      }
    },
  },
  watch: {
    'userData.role'() {
      this.updateFormState();
    },
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
    'userData.logo'(value) {
      this.handleLogo(value);
    },
    'userData.name'(value) {
      this.handlename(value);
    },
    'userData.name'(value) {
      this.handlename(value);
    },
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
      }
    });
  },
};
</script>