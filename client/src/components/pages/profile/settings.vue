<template>
  <div
    v-if="userData"
    id="settingsSubPage"
    class="settings-sub-page"
  >
    <div class="settings-sub-page__row">
      <header class="settings-sub-page__header">
        <h3 class="settings-sub-page__title">
          Личная информация
        </h3>
      </header>

      <div class="settings-sub-page__content">

        <registrationForm
          :propUserData="userData"
        />

        <pre v-local>
          {{ userData }}
        </pre>


        <div
          v-if="false"
          class="settings-sub-page__form"
        >
          <div class="settings-sub-page__form-row">
            <div class="settings-sub-page__form-row-label-wrap">
              <label
                for="userName"
                class="
                  checkbox__label
                  settings-sub-page__form-row-label
                "
              >
                ФИО
              </label>
            </div>
            <div
              class="
                settings-sub-page__form-row-column
                settings-sub-page__form-row-column_input
              "
            >
              <div class="settings-sub-page__form-row-input-wrap">
                <input
                  key="userName"
                  id="userName"
                  class="
                    input
                    settings-sub-page__form-row-input
                  "
                  type="text"
                  placeholder="Имя"
                >
              </div>
            </div>
          </div>

          <div class="settings-sub-page__form-row">
            <div class="settings-sub-page__form-row-label-wrap">
              <label
                for="userName"
                class="
                  checkbox__label
                  settings-sub-page__form-row-label
                "
              >
                Email
              </label>
            </div>
            <div class="settings-sub-page__form-row-input-wrap">
              <div
                class="
                  settings-sub-page__form-row-column
                  settings-sub-page__form-row-column_input
                "
              >
                <inputField
                  propClass="registration-page__input"
                  propType="email"
                  propKey="email"
                  :value.sync="userData.email"
                />
                <input
                  key="userName"
                  id="userName"
                  class="
                    input
                    settings-sub-page__form-row-input
                  "
                  type="text"
                  placeholder="info@atuta.ru"
                  value="info@atuta.ru"
                >
              </div>

              <div class="settings-sub-page__form-row-column">
                <button
                  class="
                    btn
                    btn_blue
                    btn_mini
                    settings-sub-page__form-row-btn
                  "
                >
                  Изменить email
                </button>
              </div>

              <div class="settings-sub-page__form-row-column">
                <p class="paragraph">
                  Email подтверждён
                </p>
              </div>
            </div>
          </div>

          <div class="settings-sub-page__form-row">
            <div class="settings-sub-page__form-row-label-wrap">
              <label
                for="userName"
                class="
                  checkbox__label
                  settings-sub-page__form-row-label
                "
              >
                Город
              </label>
            </div>
            <div class="settings-sub-page__form-row-input-wrap">
              <div
                class="
                  settings-sub-page__form-row-column
                  settings-sub-page__form-row-column_input
                "
              >
                <multiselect
                  class="multiselect-profile"
                  v-model="townsList"
                  :options="federalRegionsAlphabetical"
                  :show-labels="false"
                  :allow-empty="false"
                  :close-on-select="true"
                  :multiple="false"
                  :searchable="true"
                  label="label"
                  track-by="label"
                  placeholder="Город"
                  :options-limit="3000"
                />
              </div>
            </div>
          </div>

          <div class="settings-sub-page__form-row">
            <div class="settings-sub-page__form-row-label-wrap">
              <label
                for="userName"
                class="
                  checkbox__label
                  settings-sub-page__form-row-label
                "
              >
                Адрес
              </label>
            </div>
            <div class="settings-sub-page__form-row-input-wrap">
              <div
                class="
                  settings-sub-page__form-row-column
                  settings-sub-page__form-row-column_input
                  settings-sub-page__form-row-column_input-address
                "
              >
                <input
                  key="userName"
                  id="userName"
                  class="
                    input
                    settings-sub-page__form-row-input
                  "
                  type="text"
                >
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


    <div
      v-if="userData.role.slug === 'agency'"
      class="settings-sub-page__row"
    >
      <header class="settings-sub-page__header">
        <h3 class="settings-sub-page__title">
          Сотрудники
        </h3>
      </header>

      <div class="settings-sub-page__content">

        <section class="employees">
          <ul
            v-if="userData.employees"
            class="employees__list"
          >
            <li
              class="employees__item"
              v-for="(item, index) in userData.employees"
              :key="'key-' + index"
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
                  v-if="!item.isEdit"
                  class="
                    paragraph
                    employees__text
                    employees__text_phone
                  "
                >
                  {{ gFormatPhone(item.phoneNumber) }}
                </p>
                <inputField
                  v-if="item.isEdit"
                  propClass="
                    employees__input
                    employees__input_phone
                  "
                  propType="phone"
                  propKey="phone"
                  :value.sync="item.phoneNumber"
                  :propValue="item.phoneNumber"
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
                  v-if="!item.isEdit"
                  class="
                    btn
                    btn_grey
                    employees__btn
                  "
                  @click="editEmployeeItem(index)"
                >
                  Редактировать
                </button>
              </div>
              <div class="employees__item-characteristic">
                <button
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
                <inputField
                  propClass="
                    employees__input
                    employees__input_phone
                  "
                  propType="phone"
                  propKey="phone"
                  :value.sync="item.phoneNumber"
                  :propValue="item.phoneNumber"
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
            >
              Добавить сотрудника
            </button>
          </footer>
        </section>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import multiselect from 'vue-multiselect';

import switcher from '../../common/switcher.vue';
import inputField from '../../common/inputField.vue';
import registrationForm from '../../common/registrationForm.vue';

export default {
  name: 'settings',
  components: {
    switcher,
    inputField,
    multiselect,
    registrationForm,
  },
  data() {
    return {
      isAddNewItem: false,
      townsList: null,
      userRolesModified: [],
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
  },
  beforeMount() {
    this.userDataLocal = this.userData;
  },
  methods: {
    handlePhone(value) {
      console.log('value ::', value);
      if (value.length !== 17) {
        this.formState.phone.filled = false;
      } else {
        this.formState.phone.filled = true;
      }
    },
    removeEmployeeItem(index) {
      this.userData.employees.splice(index, 1);
    },
    editEmployeeItem(index) {
      this.stopEditingAllEmployeingItems();
      this.userData.employees[index].isEdit = true;
    },
    stopEditingEmployeeItem(index) {
      this.userData.employees[index].isEdit = false;
    },
    stopEditingAllEmployeingItems() {
      this.userData.employees.forEach(
        item => {
          item.isEdit = false;
        }
      )
    },
    addNewItem() {
      this.isAddNewItem = !this.isAddNewItem;
    },
  },
};
</script>