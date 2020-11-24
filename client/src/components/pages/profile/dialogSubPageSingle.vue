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
      v-if="isDialogDataLoaded"
      class="template-page__content"
    >
      <h3 class="title title_h4">
        {{ dialogData.dialogTitle }}
      </h3>
      <ul
        v-if="dialogData.dialogArray.length"
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
      <p
        v-else
        class="paragraph"
      >
        Что-то пошло не так с самими диалогами...
      </p>
    </div>
    <p
      v-else
      class="paragraph"
    >
      Что-то пошло не так с данными диалога...
    </p>
  </div>
</template>

<script>
// import axios from 'axios';
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
      'currentDialogsListOfUserState',
      'userData',
    ]),
    isPropsWereSended() {
      const flag = Boolean(this.$route && this.$route.params && this.$route.params.data && this.$route.params.data.dialogArray);
      return flag;
    },
    isDialogDataLoaded() {
      const flag = !this.isObjectEmpty(this.dialogData);
      return flag;
    },
  },
  watch: {
    dialogs(newValue) {
      // this.dialogData = this.$route.params.data;
      newValue.forEach(
        item => {
          if (item.dialogID === parseInt(this.$route.params.id)) {
            this.dialogData = item;
            // Sort dialog messages when the data is here.
            this.dialogData.dialogArray = this.sortDialogsArray(item.dialogArray);
          }
        }
      );
    },
    userData(newValue) {
      if (!this.isPropsWereSended) {
        // then loading user's dialogs.
        this.getDialogsByUserID(newValue.id);
      }
    },
  },
  methods: {
    // Sort dialog messages by date.
    sortDialogsArray(array) {
      const sortedDialogsArray = array.sort(
        (a, b) => {
          return a.date > b.date ? 1 : -1;
        }
      );
      return sortedDialogsArray;
    },
  },
  mounted() {
    if (this.isPropsWereSended) {
      this.dialogData = this.$route.params.data;
      // Sort dialog messages when the data is here.
      this.dialogData.dialogArray = this.sortDialogsArray(this.$route.params.data.dialogArray);
    }
  },
};
</script>