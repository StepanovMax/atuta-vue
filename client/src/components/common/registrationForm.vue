<template>
  <div
    v-if="userDataLocal"
    id="registrationForm"
    class="registration-page__content"
  >
    <form
      autocomplete="off"
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
    >

      <div
        v-if="formType === 'reg'"
        ref="role"
        class="template-page__content-row"
      >
        <h3 class="registration-page__title_row">
          Выберите свой статус
        </h3>

        <switcher
          class="add-object-page__switcher"
          switcherId="registrationSwitcher"
          :items="userRolesModified"
          :value.sync="userDataLocal.role"
        />
      </div>


      <div
        v-if="formType === 'edit'"
        class="template-page__content-row"
      >
        <h3 class="registration-page__title_row">
          Статус
        </h3>

        <p>
          {{ userDataLocal.role.label }}
        </p>
      </div>


      <div
        v-if="formType === 'reg' && (userDataLocal.role.slug === 'agency' || userDataLocal.role.slug === 'builder')"
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
            :value.sync="userDataLocal.name"
            :propValue="userDataLocal.name"
          />
        </div>

        <p
          v-if="
            formState.name.firstBlur &&
            !userDataLocal.name
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
          Некорректный email(пример: ivanov@mail.ru)
        </p>

        <p
          v-if="
            !formState.email.exist &&
            formState.email.firstBlur &&
            !formState.email.filled &&
            !userDataLocal.email
          "
          class="paragraph paragraph_invalid"
        >
          Email обязателен к заполнению
        </p>

        <p
          v-if="
            formState.email.exist
          "
          class="paragraph paragraph_invalid"
        >
          Такой email уже существует
        </p>
      </div>


      <div
        v-if="formType === 'reg'"
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
            !formState.password.filled &&
            firstSending
          "
          class="paragraph paragraph_invalid"
        >
          Минимальная длина пароля 8 символов
        </p>

        <p
          v-if="
            formState.password.firstBlur &&
            formState.password.required &&
            !userDataLocal.password &&
            firstSending
          "
          class="paragraph paragraph_invalid"
        >
          Пароль обязателен для заполнения
        </p>
      </div>


      <div
        v-if="formType === 'reg'"
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
          v-if="
            formState.repassword.firstBlur &&
            !formState.repassword.matched &&
            firstSending
          "
          class="paragraph paragraph_invalid"
        >
          Пароль не совпадает
        </p>

        <p
          v-if="
            formState.repassword.firstBlur &&
            formState.repassword.required &&
            !userDataLocal.repassword &&
            firstSending
          "
          class="paragraph paragraph_invalid"
        >
          Пароль обязателен для заполнения
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

        <p
          v-if="
            formState.phone.exist
          "
          class="paragraph paragraph_invalid"
        >
          Такой номер телефона уже существует
        </p>
      </div>


      <div
        v-if="formType === 'reg'"
        ref="logo"
        class="template-page__content-row"
      >
        <h3 class="registration-page__title_row">
          Логотип
        </h3>

        <upload-images
          id="upload-images"
          :propIsMultiple="false"
          :value.sync="blobImage"
          :propValue="userDataLocal.logo"
        />
      </div>


      <div
        v-if="agencyOrBuilder"
        ref="website"
        class="template-page__content-row"
      >
        <h3 class="registration-page__title_row">
          Сайт
        </h3>

        <div class="registration-page__input-wrap">
          <inputField
            propClass="registration-page__input"
            propType="website"
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
        v-if="agencyOrBuilder"
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
        v-if="agencyOrBuilder"
        ref="description"
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
            :propContentData="userDataLocal.description"
            :value.sync="userDataLocal.description"
          />
        </div>
      </div>

      <div
        v-if="formSended"
        class="template-page__content-row"
      >
        <div class="registration-page__banner">
          <p class="paragraph registration-page__banner-text">
            Для подтверждения регистрации проверьте свою почту.
          </p>
        </div>
      </div>

      <div
        class="template-page__content-row"
      >
        <button
          class="
            btn
            btn_blue
            btn_middle
            login-page__btn
            login-page__btn_submit
          "
          :class="{
            'btn_disabled': !formChanged
          }"
          type="submit"
        >
          {{ buttonName }}
        </button>

        <br>

        <p
          v-if="editResult"
          class="paragraph paragraph_success"
        >
          Ваши данные успешно обновлены.
        </p>

        <br>

        <div
          v-local
          v-if="false && changedUserData"
          class="local-output-data"
        >
          <h6 class="
            title
            title_h6
            title_bold
          ">
            changedUserData
          </h6>
          <pre>
            {{ changedUserData }}
          </pre>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import iconOk from '../icons/iconOk.vue';
import switcher from '../common/switcher.vue';
import inputField from '../common/inputField.vue';
import uploadImages from '../common/uploadImages.vue';
import contentEditor from './contentEditor.vue';

import axios from 'axios';
import { mapState } from 'vuex';

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
    formType: {
      default: 'reg',
      type: String,
      required: true
    },
  },
  data() {
    return {
      editResult: false,
      formChanged: false,
      changedUserData: {},
      userDataForDetection: null,
      firstSending: false,
      formSended: false,
      blobImage: null,
      inputtedFile: null,
      defaultLogo: {
        name: "someName",
        lastModified: "1602838486310",
        size: 51224,
        type: "image/png",
        url: "blob:http://localhost:9000/6ebc2222-a9a5-4210-9ec9-3a733a0abc5d",
        webkitRelativePath: "",
      },
      formIsNotFilled: false,
      userDataEmpty: {
        role: '',
        password: '',
        repassword: '',
        name: '',
        email: '',
        phone: '',
        logo: [],
        website: '',
        address: '',
        description: '',
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
          temporary: false,
        },
        email: {
          exist: false,
          syntax: false,
          filled: false,
          firstBlur: false,
          required: true,
          temporary: false,
        },
        password: {
          filled: false,
          length: 8,
          firstBlur: false,
          required: true,
          temporary: false,
        },
        repassword: {
          matched: false,
          filled: false,
          length: 8,
          firstBlur: false,
          required: true,
          temporary: false,
        },
        phone: {
          exist: false,
          filled: false,
          firstBlur: false,
          required: true,
          temporary: false,
        },
        logo: {
          filled: false,
          firstBlur: false,
          required: false,
          temporary: true,
        },
        website: {
          syntax: false,
          filled: false,
          firstBlur: false,
          required: false,
          temporary: true,
        },
        address: {
          filled: false,
          firstBlur: false,
          required: false,
          temporary: true,
        },
        description: {
          filled: false,
          firstBlur: false,
          required: false,
          temporary: true,
        },
      },
      email: '',
      correctEmail: '',
      website: '',
      correctWebsite: '',
      firstValidationCheck: false,
      buttonName: '',
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
    agencyOrBuilder() {
      if ((this.userDataLocal.role.slug === 'agency') || (this.userDataLocal.role.slug === 'builder')) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    inputFile() {
      console.log('inputFile() ::', this.$refs.file.files[0]);
      this.inputtedFile = this.$refs.file.files[0];
    },
    prepareUserDataForSending() {
      const data = {...this.userDataLocal};
      const role = data.role.slug;
      const name = data.name;
      const phone = this.gFormatPhoneRevert(data.phone);
      if (this.formType === 'reg') {
        data.logo = this.userDataLocal.logo[0].object;
        console.log('data.logo ::', this.userDataLocal.logo[0].object.url);
      }
      data.phone = phone;
      data.role = role;
      data.name = name;
      data.date = Date.now();
      return data;
    },
    async sendUserData() {
      const data = this.prepareUserDataForSending();
      const formData = new FormData();
      // console.log('data.logo ::', data.logo);
      if (this.formType === 'reg') {
        formData.append('file', data.logo);
      }
      formData.append('userData', JSON.stringify(data));
      let userData;
      if (this.formType === 'edit') {
        userData = this.changedUserData;
      } else if (this.formType === 'reg') {
        userData = formData;
      }

      if (this.formType === 'edit') {
        try {
          this.editResult = false;
          const transport = axios.create({
            withCredentials: true
          });
          const sendUserDataResult = await transport.post(
            process.env.host_api + '/user/edit',
            userData
          )
            .then(
              response => {
                console.log('response.data ::', response);
                return response.data;
              }
            )
              .catch(
                error => {
                  console.error('Error [Editing] ::', error);
                  return false;
                }
              );
          if (sendUserDataResult) {
            this.editResult = true;
            this.changedUserData = {};
            this.formChanged = false;
            this.$store.commit('updateUserDataState', sendUserDataResult);
            console.log('sendUserDataResult edit ::', sendUserDataResult);
          }
        } catch(error) {
          console.error('Something went wrong with user editing ::', error);
        }
      } else if (this.formType === 'reg') {
        try {
          const transport = axios.create({
            withCredentials: true
          });
          const sendUserDataResult = await transport.post(
            process.env.host_api + '/auth/registration',
            formData
          )
            .then(
              response => {
                // console.log('response.data ::', response);
                return response.data;
              }
            )
              .catch(
                error => {
                  console.error('Error [Registration] ::', error);
                  return false;
                }
              );
          if (sendUserDataResult.result) {
            this.formSended = true;
            this.formState.phone.exist = false;
            this.formState.email.exist = false;
            console.log('sendUserDataResult 1 ::', sendUserDataResult);
          } else {
            if (sendUserDataResult.type === 'email') {
              this.formState.phone.exist = false;
              this.formState.email.exist = true;
            } else if (sendUserDataResult.type === 'phone') {
              this.formState.phone.exist = true;
              this.formState.email.exist = false;
            } else {
              this.formState.phone.exist = false;
              this.formState.email.exist = false;
            }
            this.formSended = false;
          }
        } catch(error) {
          console.error('Something went wrong with user registration ::', error);
        }
      }
    },
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
    handleWebsite(value) {
      this.website = value;
      this.correctWebsite = this.validateWebsite(this.website);
      if (this.correctWebsite) {
        this.formState.website.syntax = true;
        this.formState.website.filled = true;
      } else {
        this.formState.website.syntax = false;
        this.formState.website.filled = false;
      }
    },
    validateWebsite(website) {
      const anyDomainMask = /^((http:\/\/|https:\/\/)?)((([a-zA-Z\-0-9]+\.)+(([a-zA-Z]{2,})(\/?))))/
      if (anyDomainMask.test(website)) {
        return true;
      }
      return false;
    },
    handlePhone(value) {
      if (value.length !== 17) {
        this.formState.phone.filled = false;
      } else {
        this.formState.phone.filled = true;
      }
    },
    handleLogo(value) {
      console.log('handleLogo ::', value[0].object, value.length);
      if (value && value.length) {
        console.log('handleLogo update ::', this.userDataLocal.logo);
        console.log('handleLogo update ::', value[0].object.url);
        this.formState.logo.filled = true;
        this.userDataLocal.logo = value;
        this.userDataLocal.logo[0].object = value[0].object;
      } else {
        this.formState.logo.filled = false;
      }
    },
    onSubmit() {
      const resultFormValidation = this.formValidation();
      this.firstSending = true;
      if (resultFormValidation) {
        console.log('onSubmit => success!');
        this.sendUserData();
      } else {
        // Make scroll to errored element.
        this.scrollToErroredElement();
        console.log('onSubmit => FAILED');
      }
    },
    updateFormState() {
      this.formState.name.required = true;
    },
    formValidation() {
      const obj = this.formState;
      let formIsFilledArray = [];
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        const subObj = obj[key];
        if (subObj.required && !subObj.filled) {
          subObj.firstBlur = true;
        }
        if (!obj[key].temporary && this.formType === 'edit') {
          if (!(key === 'password' || key === 'repassword')) {
            formIsFilledArray.push(!obj[key].filled);
          }
        } else if (!obj[key].temporary && this.formType === 'reg') {
          formIsFilledArray.push(!obj[key].filled);
        }
      }
      this.formIsNotFilled = formIsFilledArray.some(
        item => item
      );
      return !this.formIsNotFilled;
    },
    scrollToErroredElement() {
      const position = this.detectHighestErroredElement();
      if (position) {
        window.scrollTo(0, position - 50);
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

      let min;
      if (arrayMin.length) {
        min = Math.min( ...arrayMin );
      } else {
        min = null;
      }
      return min;
    },
    handleName(value) {
      if (value) {
        this.formState.name.filled = true;
      } else {
        this.formState.name.filled = false;
      }
      // Detection of the form changes.
      if (value != this.userDataForDetection.name) {
        this.changedUserData.name = value;
      } else if (value === this.userDataForDetection.name) {
        delete this.changedUserData.name;
      }
    },
    watchChangedUserData() {
      if (Boolean(Object.keys(this.changedUserData).length)) {
        this.formChanged = true;
      } else {
        this.formChanged = false;
      }
    },
  },
  watch: {
    'userDataLocal.role'(value) {
      this.updateFormState();
      // Detection of the form changes.
      if (value.slug != this.userDataForDetection.role.slug) {
        this.changedUserData.role = value;
      } else if (value.slug === this.userDataForDetection.role.slug) {
        delete this.changedUserData.role;
      }
      this.watchChangedUserData();
    },
    'userDataLocal.name'(value) {
      if (value) {
        this.formState.name.filled = true;
      } else {
        this.formState.name.filled = false;
      }
      // Detection of the form changes.
      if (value != this.userDataForDetection.name) {
        this.changedUserData.name = value;
      } else if (value === this.userDataForDetection.name) {
        delete this.changedUserData.name;
      }
      this.watchChangedUserData();
    },
    'userDataLocal.email'(value) {
      this.handleEmail(value);
      // Detection of the form changes.
      if (value != this.userDataForDetection.email) {
        this.changedUserData.email = value;
      } else if (value === this.userDataForDetection.email) {
        delete this.changedUserData.email;
      }
      this.watchChangedUserData();
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
    'userDataLocal.address'(value) {
      if (value.length) {
        this.formState.address.filled = true;
      } else {
        this.formState.address.filled = false;
      }
    },
    'userDataLocal.website'(value) {
      if (value != this.userDataForDetection.website) {
        this.changedUserData.website = value;
      } else if (value === this.userDataForDetection.website) {
        delete this.changedUserData.website;
      }
      this.watchChangedUserData();
      this.handleWebsite(value);
    },
    'userDataLocal.phone'(value) {
      this.handlePhone(value);
      // Detection of the form changes.
      if (value != this.userDataForDetection.phone) {
        this.changedUserData.phone = this.gFormatPhoneRevert(value);
      } else if (value === this.userDataForDetection.phone) {
        delete this.changedUserData.phone;
      }
      this.watchChangedUserData();
    },
    'userDataLocal.address'(value) {
      // Detection of the form changes.
      if (value != this.userDataForDetection.address) {
        this.changedUserData.address = value;
      } else if (value === this.userDataForDetection.address) {
        delete this.changedUserData.address;
      }
      this.watchChangedUserData();
    },
    'userDataLocal.description'(value) {
      // Detection of the form changes.
      if (value != this.userDataForDetection.description) {
        this.changedUserData.description = value;
      } else if (value === this.userDataForDetection.description) {
        delete this.changedUserData.description;
      }
      this.watchChangedUserData();
    },
    blobImage: {
      handler(value) {
        this.handleLogo(value);
      },
      deep: true
    },
  },
  beforeMount() {
    this.userDataLocal = JSON.parse(JSON.stringify(this.userData));
    if (!this.userDataLocal) {
      this.userDataLocal = this.userDataEmpty;
    }
    this.addCheckedPropertyForUserRoles(this.userDataLocal.role);
  },
  mounted() {
    this.userDataForDetection = JSON.parse(JSON.stringify(this.userDataLocal));
    if (this.formType === 'reg') {
      this.buttonName = 'Регистрация';
    } else if (this.formType === 'edit') {
      this.buttonName = 'Сохранить';
      this.formState.password.required = false;
      this.formState.repassword.required = false;
    } else {
      this.buttonName = 'Регистрация';
    }
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
      } else if (name === 'phone') {
        this.formState.phone.firstBlur = true;
      } else if (name === 'name') {
        this.formState.name.firstBlur = true;
      } else if (name === 'website') {
        this.formState.website.firstBlur = true;
      }
    });
  },
};
</script>