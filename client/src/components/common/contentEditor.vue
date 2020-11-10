<template>
  <div
    class="content-editor"
  >
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
      <div class="content-editor__header">

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          Жирный
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          Наклонный
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          Подчёркивание
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          Параграф
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          Список
        </button>

        <button
          class="content-editor__button"
          :class="{ 'is-active': isActive.link() }"
          @click="showLinkMenu(getMarkAttrs('link'))"
        >
          <span>{{ isActive.link() ? 'Обновить ссылку' : 'Добавить ссылку'}}</span>
        </button>

        <button
          class="content-editor__button"
          @click="commands.undo"
        >
          Назад
        </button>

        <button
          class="content-editor__button"
          @click="commands.redo"
        >
          Вперёд
        </button>

      </div>
    </editor-menu-bar>


    <editor-menu-bubble
      class="menububble"
      :editor="editor"
      @hide="hideLinkMenu"
      v-slot="{ commands, menu, isActive }"
      :keep-in-bounds="keepInBounds"
    >
      <div
        class="content-editor__float-menu"
        :class="{ 'is-active': menu.isActive }"
      >

        <form
          v-if="linkMenuIsActive"
          class="content-editor__form"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="input content-editor__input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @hide="hideLinkMenu"
            @keydown.esc="hideLinkMenu"
          />
          <button
            class="content-editor__button"
            @click="setLinkUrl(commands.link, linkUrl)"
            type="button"
          >
            {{ isActive.link() ? 'Обновить' : 'Добавить'}}
          </button>
          <button
            class="content-editor__button"
            @click="setLinkUrl(commands.link, null)"
            type="button"
          >
            Удалить ссылку
          </button>
        </form>

      </div>
    </editor-menu-bubble>


    <editor-content
      class="content-editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

export default {
  name: 'contentEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    Editor,
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  props: {
    propContentData: {
      default: '',
      type: String,
      required: false
    },
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        content: this.propContentData,
        injectCSS: true,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [2, 3, 4] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link({
            openOnClick: false
          }),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        onUpdate: ({ getHTML }) => {
          // console.log(getHTML(), getJSON());
          this.$emit('update:value', getHTML());
        }
      }),
      linkUrl: null,
      linkMenuIsActive: false,
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
  },
};
</script>