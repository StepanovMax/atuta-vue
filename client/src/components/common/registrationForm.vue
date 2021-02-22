<template>
  <div
    v-if="userDataLocal"
    id="registrationForm"
    class="registration-page__content"
  >
    <form
      autocomplete="off"
      @submit.prevent
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
        v-if="
          formType === 'edit'
          &&
          (
            userDataLocal.role
            || userDataLocal.role.slug === 'agency'
            || userDataLocal.role.slug === 'builder'
          )
        "
        class="template-page__content-row"
      >
        <header class="settings-sub-page__header">
          <h3 class="registration-page__title_row">
            Сотрудники
          </h3>
        </header>

        <div class="settings-sub-page__content">

          <section class="employees">
            <ul
              v-if="employees"
              class="employees__list"
            >
              <li
                class="employees__item"
                :class="[
                  {'employees__item_updated': item.isUpdated && !item.isDeleted },
                  {'employees__item_created': item.isCreated },
                ]"
                v-for="(item, index) in employees"
                :key="'key-' + index + '-' + item.phone"
              >
                <div
                  class="
                    employees__item-characteristic
                    employees__item-characteristic_name
                  "
                >
                  <p
                    v-if="!item.isEdit"
                    class="
                      paragraph
                      employees__text
                      employees__text_name
                    "
                  >
                    {{ item.name }}
                  </p>
                  <inputField
                    v-if="item.isEdit"
                    propType="symbolsWithNumbers"
                    propClass="employees__input"
                    propKey="login"
                    :value.sync="item.name"
                    :propValue="item.name"
                  />
                </div>
                <div
                  class="
                    employees__item-characteristic
                    employees__item-characteristic_phone
                  "
                >
                  <p
                    v-if="!item.isEdit && item.phone"
                    class="
                      paragraph
                      employees__text
                      employees__text_phone
                    "
                  >
                    {{ gFormatPhone(item.phone) }}
                  </p>
                  <inputField
                    v-if="item.isEdit"
                    propClass="
                      employees__input
                      employees__input_phone
                    "
                    propType="phone"
                    propKey="phone"
                    :value.sync="item.phone"
                    :propValue="item.phone"
                    :propFilterPhoneNumber="false"
                  />
                </div>
                <div
                  v-if="!item.isDeleted"
                  class="
                    employees__item-characteristic
                    employees__item-characteristic_edit-btn
                  "
                >
                  <button
                    v-if="item.isEdit"
                    class="
                      btn
                      btn_grey
                      employees__btn
                    "
                    @click="stopEditingEmployeeItem(index)"
                  >
                    Готово
                  </button>
                  <button
                    v-if="!item.isEdit && !item.isDeleted"
                    class="
                      btn
                      btn_grey
                      employees__btn
                    "
                    @click.prevent="editEmployeeItem(index)"
                  >
                    Редактировать
                  </button>
                </div>
                <div class="employees__item-characteristic">
                  <button
                    v-if="item.isDeleted"
                    class="
                      btn
                      btn_grey
                      employees__btn
                    "
                    @click="recoverEmployeeItem(index)"
                  >
                    Восстановить
                  </button>
                  <button
                    v-else
                    class="
                      btn
                      btn_grey
                      employees__btn
                    "
                    @click="removeEmployeeItem(index)"
                  >
                    Удалить
                  </button>
                </div>
              </li>
              <li
                v-if="isAddNewItem"
                class="employees__item"
              >
                <div
                  class="
                    employees__item-characteristic
                    employees__item-characteristic_name
                  "
                >
                  <inputField
                    propType="symbolsWithNumbers"
                    propClass="employees__input"
                    propKey="login"
                    :value.sync="newUser.name"
                  />
                </div>
                <div
                  class="
                    employees__item-characteristic
                    employees__item-characteristic_phone
                  "
                >
                  <inputField
                    propClass="
                      employees__input
                      employees__input_phone
                    "
                    propType="phone"
                    propKey="phone"
                    :value.sync="newUser.phone"
                    :propFilterPhoneNumber="false"
                  />
                </div>
                <div
                  class="
                    employees__item-characteristic
                    employees__item-characteristic_edit-btn
                  "
                >
                  <button
                    class="
                      btn
                      btn_grey
                      employees__btn
                    "
                    @click="addUserToAnother()"
                  >
                    Готово
                  </button>
                </div>
                <div class="employees__item-characteristic">
                  <button
                    class="
                      btn
                      btn_grey
                      employees__btn
                    "
                    @click="removeNewUser()"
                  >
                    Удалить
                  </button>
                </div>
              </li>
            </ul>
            <footer class="employees__footer">
              <button
                class="
                  btn
                  btn_grey
                  employees__btn
                "
                @click="addEmployeeItem()"
              >
                Добавить сотрудника
              </button>
            </footer>
          </section>

        </div>
      </div>

      <br>


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
          @click.prevent="onSubmit"
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
          v-if="true && userData"
          class="local-output-data"
        >
          <h6 class="
            title
            title_h6
            title_bold
          ">
            userData
          </h6>
          <pre>
            {{ userData }}
          </pre>
        </div>

        <br>

        <div
          v-local
          v-if="true && employees"
          class="local-output-data"
        >
          <h6 class="
            title
            title_h6
            title_bold
          ">
            employees
          </h6>
          <pre>
            {{ employees }}
          </pre>
        </div>

      </div>

    </form>
  </div>
</template>

<script>
import iconOk from '../icons/iconOk.vue';
import switcher from '../common/switcher.vue';
import contentEditor from './contentEditor.vue';
import inputField from '../common/inputField.vue';
import uploadImages from '../common/uploadImages.vue';

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
      employees: [],
      employeesChanged: [],
      isAddNewItem: false,
      userRolesModified: [],
      newUser: {
        name: null,
        phone: null,
        isEdit: false,
        isUpdated: false,
        isDeleted: false,
        isCreated: true,
      },
      editResult: false,
      formChanged: false,
      changedUserData: {},
      userDataForDetection: null,
      firstSending: false,
      formSended: false,
      blobImage: null,
      inputtedFile: null,
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
      'userEmployees',
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
    newUserPhoneNumberCorrect() {
      if (this.newUser.name.length >= 6 && this.newUser.phone.length === 17) {
        return true
      }
      return false;
    },
    'newUser.phone'(value) {
      this.handlePhone(value);
      console.log('value ::', value);
      // if (!value.length) {
      //   return null;
      // }
    },
    employeesComparison() {
      console.log('this.employees, this.userEmployees ::', this.employees, this.userEmployees);
      return this.compareArrays(this.employees, this.userEmployees);
    },
  },
  methods: {
    handlePhone(value) {
      if (value.length !== 11) {
        this.formState.phone.filled = false;
      } else {
        this.formState.phone.filled = true;
      }
    },
    removeEmployeeItem(index) {
      if (this.employees[index].isCreated === true) {
        this.employees.splice(index, 1)
      } else if (this.employees[index].isCreated === false) {
        this.employees[index].isUpdated = false;
        this.employees[index].isDeleted = true;
      }
      this.watchChangedUserData();
    },
    recoverEmployeeItem(index) {
      this.employees[index].isDeleted = false;

      let item = this.employees[index];
      if ((item.name === this.userEmployees[index].name && item.phone === this.userEmployees[index].phone)) {
        this.employees[index].isUpdated = false;
      } else {
        this.employees[index].isUpdated = true;
      }
      this.watchChangedUserData()
    },
    editEmployeeItem(index) {
      console.log('edit ::');
      this.stopEditingAllEmployeingItems();
      this.closeAddingNewUser();
      this.closeAddingEmployeeItem();
      this.employees[index].isEdit = true;
    },
    stopEditingEmployeeItem(index) {
      this.employees[index].isEdit = false;

      let item = this.employees[index];
      console.log(' >>', item.name === this.userEmployees[index].name, item.name, this.userEmployees[index].name);
      console.log(' >>', item.phone === this.userEmployees[index].phone, item.phone, this.userEmployees[index].phone);
      if (!(item.name === this.userEmployees[index].name && item.phone === this.userEmployees[index].phone)) {
        console.log('isUpdated true ::');
        this.employees[index].isUpdated = true;
      } else {
        console.log('isUpdated false ::');
        this.employees[index].isUpdated = false;
      }
      if (item.phone !== this.userEmployees[index].phone) {
        item.phone = this.gFormatPhoneRevert(item.phone);
        // console.log('item.phone ::', typeof this.gFormatPhoneRevert(item.phone).toString());
        // console.log('item.phone ::', typeof +this.gFormatPhoneRevert(item.phone).toString());
      }
      this.watchChangedUserData();
    },
    stopEditingAllEmployeingItems() {
      this.employees.forEach(
        item => {
          item.isEdit = false;
        }
      )
    },
    closeAddingEmployeeItem() {
      this.isAddNewItem = false;
    },
    removeNewUser() {
      console.log('removeNewUser ::');
      this.clearNewUser();
      this.closeAddingEmployeeItem();
    },
    clearNewUser() {
      console.log('clearNewUser ::');
      this.newUser = {
        name: null,
        phone: null,
        isEdit: false,
        isUpdated: false,
        isDeleted: false,
        isCreated: true,
      };
    },
    addUserToAnother() {
      this.stopEditingAllEmployeingItems();

      let newUser = JSON.parse(JSON.stringify(this.newUser));
      let number = newUser.phone;
      newUser.phone = this.gFormatPhoneRevert(number);

      this.employees.push(newUser);
      this.clearNewUser();
      this.isAddNewItem = !this.isAddNewItem;

      // newUser.new = true;
      // this.employeesChanged.push(newUser);
    },
    closeAddingNewUser() {
      this.clearNewUser();
      this.stopEditingAllEmployeingItems();
    },
    addEmployeeItem() {
      console.log('addEmployeeItem ::');
      this.isAddNewItem = true;
      this.closeAddingNewUser();
    },
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
        console.log('data.logo 1 ::', this.userDataLocal.logo);
        if (this.userDataLocal.logo.length) {
          data.logo = this.userDataLocal.logo[0].object;
          console.log('data.logo 2 ::', this.userDataLocal.logo);
        }
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

      // If we edit the profile page.
      if (this.formType === 'edit') {
        // Trying to send user info.
        try {
          this.editResult = false;
          const transport = axios.create({
            withCredentials: true
          });
          const sendUserDataResult = await transport.post(
            process.env.host_api + '/user/update',
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
        // Trying to send employees info.
        if (this.employees.length) {
          try {
            this.editResult = false;
            const transport = axios.create({
              withCredentials: true
            });
            const sendEmployeesDataResult = await transport.post(
              process.env.host_api + '/employee/update',
              this.employees
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
            // if (sendEmployeesDataResult) {
            //   this.editResult = true;
            //   this.changedUserData = {};
            //   this.formChanged = false;
            //   this.$store.commit('updateEmployeesDataState', sendEmployeesDataResult);
            // }
          } catch(error) {
            console.error('[Employee edit error] ::', error);
          }
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
    handleLogo(value) {
      console.log('handleLogo ::', value[0].object, value);
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
      if (Boolean(Object.keys(this.changedUserData).length) || !this.employeesComparison) {
        this.formChanged = true;
      } else {
        this.formChanged = false;
      }
      console.log('this.employeesComparison ::', this.employeesComparison);
    },
  },
  watch: {
    'employees'(value) {
      // Detection of the form changes.
      if (!this.compareArrays(value, this.userEmployees)) {
        // this.detectChangedEmployees(value);
        // this.userDataLocal.employees = value;
        // this.changedUserData.employees = value;
      } else {
        delete this.changedUserData.employees;
      }
      this.watchChangedUserData();
    },
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
        console.log('blobImage ::', value);
        this.handleLogo(value);
      },
      deep: true
    },
  },
  beforeMount() {
    this.userDataLocal = JSON.parse(JSON.stringify(this.userData));
    this.employees = JSON.parse(JSON.stringify(this.userEmployees));
    // console.log('this.userEmployees ::', this.userEmployees);
    // console.log('this.employees ::', this.employees);
    if (!this.userDataLocal) {
      this.userDataLocal = this.userDataEmpty;
    }
    this.addCheckedPropertyForUserRoles(this.userRoles[2].slug);
  },
  async mounted() {
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