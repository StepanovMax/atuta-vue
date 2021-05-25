<template>
  <div
    id="changePasswordPage"
  >

    <errorPage403
      v-if="!isLoggedIn"
    />

    <div
      v-else
      class="help-page__wrap"
    >

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

      <div class="help-page__wrap">
        <changePasswordForm />
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import breadcrumbs from '@cmp/common/breadcrumbs.vue';
import inputField from '@cmp/common/inputField.vue';
import localOutputData from '@cmp/common/localOutputData.vue';
import changePasswordForm from '@cmp/pages/changePasswordForm.vue';
import errorPage403 from '@cmp/pages/errors/userNotLoggedInComponent.vue';

export default {
  name: 'changePasswordFromAccountPage',
  components: {
    breadcrumbs,
    inputField,
    localOutputData,
    errorPage403,
    changePasswordForm,
  },
  data() {
    return {
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
    ...mapState([
      'isLoggedIn',
    ]),
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
