<template>
  <div
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
      class="settings-sub-page__row"
    >
      <header class="settings-sub-page__header">
        <h3 class="settings-sub-page__title">
          Пароль
        </h3>
      </header>

      <div class="settings-sub-page__content">
      </div>
    </div>

    <div
      v-if="userData.role === 'agency'"
      class="settings-sub-page__row"
    >
      <header class="settings-sub-page__header">
        <h3 class="settings-sub-page__title">
          Сотрудники
        </h3>
      </header>

      <div class="settings-sub-page__content">
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import multiselect from 'vue-multiselect';

import switcher from '../../common/switcher.vue';
import registrationForm from '../../common/registrationForm.vue';

export default {
  name: 'settings',
  components: {
    switcher,
    multiselect,
    registrationForm,
  },
  data() {
    return {
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
};
</script>