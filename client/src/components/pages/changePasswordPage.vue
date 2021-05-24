<template>
  <div
    id="changePasswordPage"
  >

    <div class="help-page__wrap">

      <header class="help-page__header">

        <div class="help-page__header-top">

          <breadcrumbs />

        </div>

        <div class="help-page__header-bottom">

          <h1 class="help-page__title">
            Изменение пароля
          </h1>

        </div>

      </header>

      <div
        v-if="linkWasVerified"
        class="
          form
        "
      >

        <div
          class="
            form__row
            form__row_block-width
            form__row_block-width-half
          "
        >

          <div
            class="
              form__block-width
              form__block-width-half
            "
          >

            <div
              ref="password"
              class="
                form__row
                form__row_block-width
              "
            >

              <div
                class="
                  form__block-width
                "
              >

                <h3 class="registration-page__title_row">
                  Пароль
                </h3>

                <inputField
                  propClass="login-page__input"
                  propType="password"
                  propKey="password"
                  :value.sync="formState.password.value"
                />

              </div>

            </div>



            <div
              ref="repassword"
              class="
                form__row
                form__row_block-width
              "
            >

              <div
                class="
                  form__block-width
                "
              >

                <h3 class="registration-page__title_row">
                  Подтверждение пароля
                </h3>

                <inputField
                  propClass="login-page__input"
                  propType="password"
                  propKey="password"
                  :value.sync="formState.repassword.value"
                />

                <p
                  v-if="
                    firstSubmit
                    && passwordLengthIsOk
                    && repasswordLengthIsOk
                    && !passwordsIsEqual
                  "
                  class="
                    paragraph
                    paragraph_invalid
                  "
                >
                  Значения полей не совпадают
                </p>

                <p
                  v-if="
                    firstSubmit
                    && passwordsIsEmpty
                  "
                  class="
                    paragraph
                    paragraph_invalid
                  "
                >
                  Поля пароля обязательны для заполнения
                </p>

                <p
                  v-if="
                    firstSubmit
                    && passwordLengthIsOk
                    && repasswordLengthIsOk
                    && passwordsIsEqual
                    && !passwordHasOneNumber
                  "
                  class="
                    paragraph
                    paragraph_invalid
                  "
                >
                  В пароле не хватает одной цифры
                </p>

                <p
                  v-if="
                    firstSubmit
                    && passwordLengthIsOk
                    && repasswordLengthIsOk
                    && passwordsIsEqual
                    && !passwordHasOneLetterInUppercase
                  "
                  class="
                    paragraph
                    paragraph_invalid
                  "
                >
                  В пароле не хватает одной буквы в верхнем регистре
                </p>

                <p
                  v-if="
                    firstSubmit
                    && passwordLengthIsOk
                    && repasswordLengthIsOk
                    && passwordsIsEqual
                    && !passwordHasOneLetterInLowercase
                  "
                  class="
                    paragraph
                    paragraph_invalid
                  "
                >
                  В пароле не хватает одной буквы в нижнем регистре
                </p>

                <p
                  v-if="
                    firstSubmit
                    && passwordLengthIsOk
                    && repasswordLengthIsOk
                    && passwordsIsEqual
                    && !passwordHasOneSpecialSymbol
                  "
                  class="
                    paragraph
                    paragraph_invalid
                  "
                >
                  В пароле не хватает одного специального символа (!@#$%^&*)
                </p>

                <p
                  v-if="
                    resultChangesSuccess
                  "
                  class="
                    paragraph
                    paragraph_success
                  "
                >
                  Пароль был успешно изменён
                </p>

                <p
                  v-if="
                    resultChangesError
                  "
                  class="
                    paragraph
                    paragraph_error
                  "
                >
                  Что-то пошло не так и пароль не был изменён. Попробуйте повторить отправку.
                </p>

              </div>

            </div>

            <div
              class="
                form__row
                form__row_block-width
              "
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
                  'btn_disabled': !(passwordValidation && repasswordValidation)
                }"
                @click="submit"
              >
                Изменить пароль
              </button>
            </div>

          </div>

          <div
            class="
              form__block-width
              form__block-width-half
            "
          >

            <div
              class="
                form__row
                form__row_block-width
              "
            >

              <div
                class="
                  form__block-width
                "
              >

                <p class="paragraph">
                  Пароль должен в себе содержать:
                </p>

                <ul class="
                  list
                  list_passwords
                ">
                  <li class="
                    list__item
                    text
                  ">
                    1 число
                  </li>
                  <li class="
                    list__item
                    text
                  ">
                    1 буква в верхнем регистре
                  </li>
                  <li class="
                    list__item
                    text
                  ">
                    1 буква в нижнем регистре
                  </li>
                  <li class="
                    list__item
                    text
                  ">
                    1 символ(!@#$%^&*)
                  </li>
                </ul>

                <p
                  class="
                    paragraph
                  "
                >
                  Длина пароля: от 8 до 32 символов.
                </p>

              </div>

            </div>

          </div>

        </div>

        <br>

        <div
          v-local
          v-if="true && formState"
          class="local-output-data"
        >
          <h6 class="
            title
            title_h6
            title_bold
          ">
            formState
          </h6>
          <pre>
            {{ formState }}
          </pre>
        </div>

      </div>

      <div
        v-else
      >
        <p class="paragraph">
          <span
            v-if="serverText === 'expired'"
          >
            Время действия ссылки восстановления пароля истекло.<br>
            Попробуйте восстановить пароль <router-link
              class="link"
              :to="{
                name: 'recoverPasswordPage'
              }"
              title="Страница восстановления пароля"
            >ещё раз</router-link>
          </span>

          <span
            v-if="serverText === 'notUpdated'"
          >
            Пароль не был обновлён
          </span>

          <span
            v-if="serverText === 'userNotFound'"
          >
            Пользователь не был найден
          </span>
        </p>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

import breadcrumbs from '@cmp/common/breadcrumbs.vue';
import inputField from '@cmp/common/inputField.vue';

export default {
  name: 'changePasswordPage',
  components: {
    breadcrumbs,
    inputField,
  },
  data() {
    return {
      dynamicTo: '/recover-password',
      serverText: '',
      linkWasVerified: false,
      resultChangesSuccess: false,
      resultChangesError: false,
      firstSubmit: false,
      formState: {
        password: {
          value: null,
          syntax: null,
          length: 8,
        },
        repassword: {
          value: null,
          syntax: null,
          length: 8,
        },
      },
    }
  },
  computed: {
    submitedData() {
      const data = {
        password: this.formState.password.value,
        userId: this.$route.params.userId,
      };
      return data;
    },
    passwordsIsEqual() {
      if (this.formState.password.value === this.formState.repassword.value) {
        return true;
      } else {
        return false;
      }
    },
    passwordsIsEmpty() {
      if (
        (
          this.formState.password.value
          && this.formState.password.value.length > 0
        )
        && (
          this.formState.repassword.value
          && this.formState.repassword.value.length > 0
        )
      ) {
        return false;
      } else {
        return true;
      }
    },
    passwordLengthIsOk() {
      if (
        this.formState.password.value
        && this.formState.password.value.length >= this.formState.password.length
        && this.formState.password.value.length < 33
      ) {
        return true;
      } else {
        return false;
      }
    },
    repasswordLengthIsOk() {
      console.log('y', this.formState.repassword.value);
      if (
        this.formState.repassword.value
        && this.formState.repassword.value.length >= this.formState.repassword.length
        && this.formState.repassword.value.length < 33
      ) {
        return true;
      } else {
        return false;
      }
    },
    passwordValidation() {
      if (
        this.passwordLengthIsOk
        && this.passwordSyntaxIsOk
      ) {
        return true;
      } else {
        return false;
      }
    },
    repasswordValidation() {
      if (
        this.repasswordLengthIsOk
        && this.repasswordSyntaxIsOk
      ) {
        return true;
      } else {
        return false;
      }
    },
    passwordSyntaxIsOk() {
      return this.gValidatePassword(this.formState.password.value);
    },
    repasswordSyntaxIsOk() {
      return this.gValidatePassword(this.formState.repassword.value);
    },
    passwordHasOneNumber() {
      const boolean = this.gValidatePasswordForOneNumber(this.formState.password.value);
      return boolean;
    },
    passwordHasOneLetterInUppercase() {
      const boolean = this.gValidatePasswordForOneLetterInUppercase(this.formState.password.value);
      return boolean;
    },
    passwordHasOneLetterInLowercase() {
      const boolean = this.gValidatePasswordForOneLetterInLowercase(this.formState.password.value);
      return boolean;
    },
    passwordHasOneSpecialSymbol() {
      const boolean = this.gValidatePasswordForOneSpecialSymbol(this.formState.password.value);
      return boolean;
    },
  },
  methods: {
    submit() {
      this.firstSubmit = true;
      const resultFormValidation = this.formValidation();
      if (resultFormValidation) {
        this.sendChangedPasswordToServer();
      }
    },
    formValidation() {
      if (
        this.passwordValidation
        && this.repasswordValidation
      ) {
        return true;
      } else {
        return false;
      }
    },
    async sendChangedPasswordToServer() {
      const transport = axios.create({
        withCredentials: true
      });
      await transport.post(
        process.env.host_api + '/auth/changePassword',
        {
          data: this.submitedData
        },
      )
        .then(
          response => {
            if (response && response.data) {
              console.log('response.data ::', response.data);
              this.resultChangesSuccess = true;
              this.resultChangesError = false;

              setTimeout(
                () => {
                  // Redirect after success.
                  this.$router.push({ name: 'loginPage' });
                },
                5000
              );
            }
            return response;
          }
        )
          .catch(
            error => {
              this.resultChangesSuccess = false;
              this.resultChangesError = true;
              console.log('Error changePassword ::', error);
              return false;
            }
          );
    },
    async verifyRecoverLink() {
      console.log('verifyRecoverLink ::');
      const result = await axios.get(
        process.env.host_api + '/auth/verifyRecover/' + this.$route.params.userId + '/' + this.$route.params.secretCode
      )
        .then(
          success => {
            console.log('success VerifyRecoverLink ::', success.data.message);
            console.log('success VerifyRecoverLink ::', success.data.result);
            this.serverText = success.data.message;
            return success.data.result;
          }
        )
          .catch(
            () => {
              return false;
            }
          );
      console.log('result VerifyRecoverLink ::', result);
      return result;
    },
  },
  async mounted() {
    this.linkWasVerified = await this.verifyRecoverLink();
  }
};
</script>
