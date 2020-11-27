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
                {{ dialogData.clientTitle }}
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
          Отправка сообщений
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
      dialogData: {},
      dialogsArray: [],
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
  },
  watch: {
    'allDialogsListOfUserState'(value) {
      console.log('watch allDialogsListOfUserState');
      this.getDialog(value);
    },
    // 'userData'(value) {
    //   if (!this.isPropsWereSended) {
    //     // In case reloading the page
    //     // we need to load all dialogs for this 
    //     this.getDialogsByUserID(value.id);
    //   }
    // },
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
      value.forEach(
        item => {
          if (item.dialogID === parseInt(this.$route.params.id)) {
            // console.log('YYES dialogs');
            this.dialogData = item;
            // Sort dialog messages when the data is here.
            this.dialogData.dialogArray = this.sortDialogMessages(item.dialogArray);
          } else {
            // this.dialogData.dialogTitle = this.$route.params.objectData.title;
          }
        }
      );
    },
  },
  created() {
    console.log('dialog ID ::', this.$route.params.id);
    console.log('all dialogs array ::', this.allDialogsListOfUserState);
    this.getDialog(this.allDialogsListOfUserState);
  },
};
</script>