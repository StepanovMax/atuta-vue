<template>
  <div
    id="dialogsSubPage"
    class=""
  >
    <header class="template-page__header">
      <h3 class="template-page__subtitle">
        Мои сообщения
      </h3>
    </header>

    <div class="template-page__content">

      <div class="messages-block">

        <div class="">
          <div class="">
            <p class="">
              Все сообщения
            </p>
            <p class="">
              Фильтр
            </p>
          </div>

          <input
            type="text"
            class="input"
            placeholder="Поиск по сообщениям"
          >
        </div>

        <div class="">
          <ul
            v-if="dialogs.length"
            class="list"
          >
            <li
              class="list__item"
              v-for="(item, index) in dialogs"
              :key="'key-' + index"
            >
              <div
                class="card-messages"
              >
                <router-link
                  class="card-messages__link"
                  :to="{
                    name: 'dialogSubPageSingle',
                    params: {
                      id: item.dialogID,
                      data: item,
                    }
                  }"
                  :title="`Перейти в ${item.dialogTitle}`"
                >
                  <div class="card-messages__inner-wrap">
                    <div class="card-messages__inner-wrap-center">
                      <p class="paragraph">
                        {{ item.clientTitle }}
                      </p>
                      <p class="paragraph">
                        {{ item.dialogTitle }}
                      </p>
                    </div>
                    <div class="card-messages__inner-wrap-right">
                      <p class="paragraph">
                        {{ gTimestampToDateConverter(item.dialogDate) }}
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>

              <div
                v-hide
                class="card-messages"
              >
                <router-link
                  class="card-messages__link"
                  :to="{
                    name: 'objectPage',
                  }"
                  title="Перейти подробнее 1"
                >
                  <div class="card-messages__inner-wrap">
                    <div class="card-messages__inner-wrap-left">
                      <img
                        v-if="true"
                        class="img card-messages__img"
                        src="http://127.0.0.1:9000/src/images/objects/8993850241.jpg"
                        alt=""
                      >
                      <img
                        v-else
                        class="imgcard-messages__img"
                        src="http://127.0.0.1:9000/src/images/objects/8993850241.jpg"
                        alt=""
                      >
                    </div>
                    <div class="card-messages__inner-wrap-center">
                      center
                    </div>
                    <div class="card-messages__inner-wrap-right">
                      {{ gTimestampToDateConverter() }}
                    </div>
                  </div>
                </router-link>
              </div>

            </li>
          </ul>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'dialogsSubPage',
  computed: {
    ...mapState([
      'dialogs',
    ]),
  },
  watch: {
    dialogs(newValue, oldValue) {
      // console.log('newValue ::', newValue);
      // this.getFavouritesObjectsByListID(newValue.favouriteObjectsListID);
    },
  },
};
</script>