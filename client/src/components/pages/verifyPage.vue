<template>
  <div
    id="verifyPage"
  >

    <div class="template-page__wrap">

      <header class="template-page__header">

        <div class="template-page__header-top">

          <breadcrumbs />

        </div>

        <div class="template-page__header-bottom">

          <h1 class="template-page__title">
            Подтверждение регистрации
          </h1>

        </div>

      </header>

      <div class="login-page__content">
        <div
          v-if="verifyRegistrationFlag === 'ok'"
        >
          <p class="paragraph">
            Регистрация прошла успешно.
          </p>
          <p class="paragraph">
            Сейчас вы будете перенаправлены на страницу входа.
          </p>
          <p class="paragraph">
            <span>
              Если этого не произошло, кликните сюда:
            </span>
            <router-link
              :to="{ name: 'loginPage' }"
              title="Вход на сайт"
            >
              Войти на сайт
            </router-link>
          </p>
        </div>
        <div
          v-if="verifyRegistrationFlag === 'expired'"
        >
          <p class="paragraph">
            Время действия ссылки истекло.
          </p>
          <p class="paragraph">
            <span>
              Пожалуйста, повторите регистрацию ещё раз:
            </span>
            <router-link
              :to="{ name: 'registrationPage' }"
              title="Регистрация"
            >
              Перейти на страницу регистрации
            </router-link>
          </p>
        </div>
        <div
          v-if="verifyRegistrationFlag === 'wrongCode'"
        >
          <p class="paragraph">
            Код ссылки неверен.
          </p>
          <p class="paragraph">
            <span>
              Пожалуйста, повторите регистрацию ещё раз:
            </span>
            <router-link
              :to="{ name: 'registrationPage' }"
              title="Регистрация"
            >
              Перейти на страницу регистрации
            </router-link>
          </p>
        </div>
        <div
          v-if="verifyRegistrationFlag === 'somethingWrong'"
        >
          <p class="paragraph">
            Произошла непредвиденная ошибка.
          </p>
          <p class="paragraph">
            <span>
              Пожалуйста, повторите регистрацию ещё раз:
            </span>
            <router-link
              :to="{ name: 'registrationPage' }"
              title="Регистрация"
            >
              Перейти на страницу регистрации
            </router-link>
          </p>
        </div>
        <div
          v-if="verifyRegistrationFlag === 'created'"
        >
          <p class="paragraph">
            Пользователь уже активирован.
          </p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';

import breadcrumbs from '../common/breadcrumbs.vue';

export default {
  name: 'verifyPage',
  components: {
    breadcrumbs,
  },
  data() {
    return {
      verifyRegistrationFlag: '',
    }
  },
  async mounted() {
    const transport = axios.create({
      withCredentials: true
    });
    await transport.get(
      process.env.host_api + '/auth/verify/' + this.$route.params.userId + '/' + this.$route.params.secretCode
    )
      .then(
        async response => {
          console.log('response user ::', response.data.user);
          if (response.data.message === 'ok') {
            this.verifyRegistrationFlag = 'ok';

            setTimeout(
              () => {
                // Redirect after success.
                this.$router.push({ name: 'loginPage' });
              },
              5000
            );
            console.log('response user ::', response.data.user);
          } else if (response.data.message === 'expired') {
            this.verifyRegistrationFlag = 'expired';
            console.log('expired ::');
          } else if (response.data.message === 'wrong code') {
            this.verifyRegistrationFlag = 'wrongCode';
          } else {
            this.verifyRegistrationFlag = 'somethingWrong';
          }
          return response;
        }
      )
        .catch(
          error => {
            console.log('Error verifyRegistration ::', error);
            return false;
          }
        );
  },
};
</script>