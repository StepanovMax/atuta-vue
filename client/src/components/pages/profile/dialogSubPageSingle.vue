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

    <div class="template-page__content">
      <h3 class="title title_h4">
        {{ $route.params.data.dialogTitle }}
      </h3>
      <ul
        v-if="dialogsArray.length"
        class="list"
      >
        <li
          class="list__item"
          v-for="(item, index) in dialogsArray"
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
            {{ $route.params.data.clientTitle }}
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
  </div>
</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'dialogSubPageSingle',
  data() {
    return {
      dialogsArray: [],
    }
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
    // Sort dialog messages when the data is here.
    this.dialogsArray = this.sortDialogsArray(this.$route.params.data.dialogArray);
    // console.log();
  },
};
</script>