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

      <router-view
        :key="$route.fullPath"
      />

      <div class="settings-sub-page__content">

        <registrationForm
          :propUserData="userData"
          formType="edit"
        />

      </div>
    </div>


    <div
      v-if="
        userData.role
        || userData.role.slug === 'agency'
        || userData.role.slug === 'builder'
      "
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
                  :value.sync="newUser.phoneNumber"
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
      newUser: {
        name: '',
        phoneNumber: '',
        isEdit: false,
      },
    }
  },
  computed: {
    ...mapState([
      'userData',
      'isLoggedIn',
    ]),
    newUserPhoneNumberCorrect() {
      if (this.newUser.name.length >= 6 && this.newUser.phoneNumber.length === 17) {
        return true
      }
      return false;
    },
    'newUser.phoneNumber'(value) {
      this.handlePhone(value);
    },
  },
  beforeMount() {
    this.userDataLocal = this.userData;
  },
  methods: {
    handlePhone(value) {
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
      console.log('edit ::');
      this.stopEditingAllEmployeingItems();
      this.closeAddingNewUser();
      this.closeAddingEmployeeItem();
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
    addEmployeeItem() {
      this.isAddNewItem = true;
      this.closeAddingNewUser();
    },
    closeAddingEmployeeItem() {
      this.isAddNewItem = false;
    },
    removeNewUser() {
      this.clearNewUser();
      this.addEmployeeItem();
    },
    clearNewUser() {
      this.newUser = {
        name: '',
        phoneNumber: '',
        isEdit: false,
      };
    },
    closeAddingNewUser() {
      this.clearNewUser();
      this.stopEditingAllEmployeingItems();
    },
    addUserToAnother() {
      this.stopEditingAllEmployeingItems();
      this.userData.employees.push(this.newUser);
      this.newUser = {
        name: '',
        phoneNumber: '',
        isEdit: false,
      };
      this.isAddNewItem = !this.isAddNewItem;
    },
  },
};
</script>