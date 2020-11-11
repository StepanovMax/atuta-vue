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

      </div>
    </div>


    <div
      v-if="
        userData.role.slug === 'agency'
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

    <pre v-local>
      {{ userData }}
    </pre>

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