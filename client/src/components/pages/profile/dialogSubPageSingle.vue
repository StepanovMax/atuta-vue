<template>
  <div
    id="dialogsSubPage"
    class=""
  >
    <header class="template-page__header">
      <h2 class="template-page__subtitle">
        Диалог
      </h2>
    </header>

    <div
      class="template-page__content"
    >
      <section class="dialog-single">
        <header class="dialog-single__header">
          <h3 class="dialog-single__title">
            {{ dialogData.dialogTitle }}
          </h3>
        </header>
        <div class="dialog-single__content">
          <ul
            v-if="dialogData && dialogData.dialogArray && dialogData.dialogArray.length"
            class="list"
          >
            <li
              class="list__item"
              v-for="(item, index) in dialogData.dialogArray"
              :key="'key-' + index"
            >
              <p
                v-if="item.position === 'user'"
                class="paragraph paragraph_bold"
              >
                Я
              </p>
              <p
                v-if="item.position === 'client'"
                class="paragraph paragraph_bold"
                :class="{
                  'paragraph_align-right': item.position === 'client'
                }"
              >
                {{ dialogData.clientName }}
              </p>
              <p
                class="paragraph"
                :class="{
                  'paragraph_align-right': item.position === 'client'
                }"
              >
                {{ item.text }}
              </p>
            </li>
          </ul>
        </div>
        <footer class="dialog-single__footer">
          <div class="send-messages">
            <input
              type="text"
              class="input"
              v-model="currentMessageValue"
              @keyup.enter="sendMessage()"
            >
            <button
              class="
                btn
                btn_blue
                btn_middle
              "
              :class="{
                'btn_active': this.newMessage
              }"
              @click="sendMessage()"
            >
              Отправить
            </button>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'dialogSubPageSingle',
  data() {
    return {
      dialogData: {
        dialogTitle: '',
        dialogArray: [],
      },
      dialogsArray: [],
      currentMessageValue: '',
    }
  },
  computed: {
    ...mapState([
      'allDialogsListOfUserState',
      'userData',
    ]),
    isPropsWereSended() {
      const flag = Boolean(this.$route && this.$route.params && this.$route.params.dialogArray);
      return flag;
    },
    isDialogDataLoaded() {
      const flag = !this.isObjectEmpty(this.dialogData);
      return flag;
    },
    newMessage() {
      return this.currentMessageValue !== '';
    }
  },
  watch: {
    'allDialogsListOfUserState'(value) {
      const dialogFindResult = this.getDialog(value);
      if (!dialogFindResult) {
        const cookieResult = this.getCookie('objectForDialog');
        console.log('cookieResult ::', JSON.parse(cookieResult));
        if (cookieResult) {
          const cookieResultJSON = JSON.parse(cookieResult);
          this.dialogData.dialogTitle = cookieResultJSON.title;
        }
      }
    },
  },
  methods: {
    // Sort dialog messages by date.
    sortDialogMessages(array) {
      const sortedDialogsArray = array.sort(
        (a, b) => {
          return a.date > b.date ? 1 : -1;
        }
      );
      return sortedDialogsArray;
    },
    getDialog(value) {
      return value.some(
        item => {
          if (item.dialogID === parseInt(this.$route.params.id)) {
            this.dialogData = item;
            // Sort dialog messages when the data is here.
            this.dialogData.dialogArray = this.sortDialogMessages(item.dialogArray);
            return true;
          } else {
            // this.dialogData.dialogTitle = this.$route.params.objectData.title;
          }
        }
      );
    },
    sendMessage() {
      if (this.currentMessageValue) {
        const messageObject = {
          text: this.currentMessageValue,
          date: Date.now(),
          position: 'user',
        };
        this.dialogData.dialogArray.push(messageObject);
      }
    },
  },
  created() {
    this.getDialog(this.allDialogsListOfUserState);
  },
};
</script>