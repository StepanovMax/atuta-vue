<template>
  <div
    id="dialogsSubPage"
    class="dialogs-sub-page"
  >
    <header
      class="
        template-page__header
        template-page__header_subtitle
      "
    >
      <h3 class="template-page__subtitle">
        Мои сообщения
      </h3>
    </header>

    <div class="template-page__content">

      <div class="dialogs-list">

        <div class="dialogs-list__filter-bar">
          <div
            class="
              dialogs-list__filter-bar-item
              dialogs-list__filters
            "
          >
            <div class="dialogs-list__filters-item">
              <switcher
                class="dialogs-list__switcher"
                switcherId="filterDialogs"
                propClass="filterDialogs"
                :items="filterLabels"
                :value.sync="filterDialogsBlacklistValue"
              />
            </div>
            <div class="dialogs-list__filters-item">
              <multiselect
                class="dialogs-list__multiselect"
                v-model="filterDialogsDropdownValue"
                :options="filterDialogsDropdownOptionsValue"
                :show-labels="false"
                :allow-empty="false"
                :close-on-select="true"
                :multiple="false"
                :searchable="false"
                label="label"
                track-by="slug"
                placeholder="Фильтр"
              />
            </div>
          </div>

          <div
            v-if="false"
            class="
              dialogs-list__filter-bar-item
              dialogs-list__search
            "
          >
            <input
              type="text"
              class="
                input
                dialogs-list__input
              "
              placeholder="Поиск по сообщениям"
            >
          </div>
        </div>

        <div class="dialogs-list__items">
          <ul
            v-if="dialogsList.length"
            class="
              list
              dialogs-list__items-list
            "
          >
            <li
              class="
                list__item
                dialogs-list__items-list-item
              "
              v-for="(item, index) in dialogsList"
              :key="'key-' + index"
            >
              <div
                class="card-dialog"
              >
                <router-link
                  class="card-dialog__link"
                  :to="{
                    name: 'dialogSubPageSingle',
                    params: {
                      id: item.dialogID,
                      data: item,
                    }
                  }"
                  :title="`Перейти в ${item.dialogTitle}`"
                >
                  <div class="card-dialog__inner-wrap">
                    <div class="card-dialog__inner-wrap-left">
                      <img
                        v-if="true"
                        class="img card-dialog__img"
                        src="http://127.0.0.1:9000/src/images/objects/8993850241.jpg"
                        alt=""
                      >
                      <img
                        v-else
                        class="img card-dialog__img"
                        src="http://127.0.0.1:9000/src/images/objects/8993850241.jpg"
                        alt=""
                      >
                    </div>
                    <div class="card-dialog__inner-wrap-center">
                      <h3
                        class="
                          title
                          title_h5
                          card-dialog__title
                        "
                      >
                        {{ item.dialogTitle }}
                      </h3>
                      <h4
                        class="
                          title
                          title_h6
                          card-dialog__subtitle
                        "
                      >
                        {{ item.clientName }}
                      </h4>
                    </div>
                    <div class="card-dialog__inner-wrap-right">
                      <p
                        class="
                          paragraph
                          card-dialog__date
                        "
                      >
                        {{ gTimestampToDateConverter(item.dialogDate) }}
                      </p>
                      <div class="card-dialog__icon-marked">
                        <iconMarkedDouble
                          v-if="!item.unread"
                          class="
                            card-dialog__icon-read
                            card-dialog__icon-read_double
                          "
                        />
                        <iconMarkedSingle
                          v-else
                          class="
                            card-dialog__icon-read
                            card-dialog__icon-read_single
                          "
                        />
                      </div>
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
import multiselect from 'vue-multiselect';
import switcher from '../../common/switcher.vue';
import iconMarkedDouble from '../../icons/iconMarkedDouble.vue';
import iconMarkedSingle from '../../icons/iconMarkedSingle.vue';

export default {
  name: 'dialogsSubPage',
  components: {
    switcher,
    multiselect,
    iconMarkedDouble,
    iconMarkedSingle,
  },
  data() {
    return {
      filterLabels: [],
      dialogsList: [],
      filterLabelsDefault: [
        {
          label: 'Все',
          slug: 'all',
        },
        {
          label: 'Чёрный список',
          slug: 'blackList',
        },
      ],
      filterDialogsBlacklistValue: '',
      filterDialogsDropdownOptionsValue: [
        {
          label: 'Все',
          slug: 'all',
        },
        {
          label: 'Непрочитанные',
          slug: 'unread',
        },
        {
          label: 'Только мои',
          slug: 'mine',
        },
      ],
      filterDialogsDropdownValue: '',
      currentDialogsListOfUserValue: [],
    }
  },
  computed: {
    ...mapState([
      'allDialogsListOfUserState',
      'currentDialogsListOfUserState',
      'filterDialogsBlacklistState',
      'filterDialogsDropdownState',
    ]),
  },
  watch: {
    // Listen the Switcher
    filterDialogsBlacklistValue: {
      handler(value) {
        this.$store.commit('updateFilterDialogsBlacklistState', value);
        this.updateDialogsList();
        // this.$store.commit('updateCurrentDialogsListOfUserState', this.dialogsList);
      },
      deep: true
    },
    filterDialogsDropdownValue: {
      handler(value) {
        this.$store.commit('updateFilterDialogsDropdownState', value);
        this.updateDialogsList();
      },
      deep: true
    },
    'allDialogsListOfUserState'() {
      this.updateDialogsListToDefault();
    },
    'currentDialogsListOfUserState'() {
      this.dialogsList = this.currentDialogsListOfUserState;
    },
  },
  methods: {
    detectCheckedItemsForFilter() {
      this.filterLabels = this.filterLabelsDefault.map(
        item => {
          if (item.slug === this.filterDialogsBlacklistState.slug) {
            item.checked = true;
          }
          return item;
        }
      );
    },
    updateDialogsListToDefault() {
      this.dialogsList = this.allDialogsListOfUserState;
      this.$store.commit('updateCurrentDialogsListOfUserState', this.dialogsList);
    },
    updateDialogsList() {
      this.updateDialogsListWithBlacklist()
        .then(this.updateDialogsListWithDropdown())
        .then(this.$store.commit('updateCurrentDialogsListOfUserState', this.currentDialogsListOfUserValue));
    },
    async updateDialogsListWithBlacklist() {
      if (this.filterDialogsBlacklistState.slug === 'all') {
        this.currentDialogsListOfUserValue = this.allDialogsListOfUserState;
      } else if (this.filterDialogsBlacklistState.slug === 'blackList') {
        const array = [...this.allDialogsListOfUserState];
        this.currentDialogsListOfUserValue = array.filter(
          item => item.blackList
        );
      }
    },
    updateDialogsListWithDropdown() {
      const array = [...this.currentDialogsListOfUserValue];
      if (this.filterDialogsDropdownState.slug === 'unread') {
        this.currentDialogsListOfUserValue = array.filter(
          item => item.unread
        );
      } else if (this.filterDialogsDropdownState.slug === 'mine') {
        this.currentDialogsListOfUserValue = array.filter(
          item => item.mine
        );
      }
    },
  },
  beforeMount() {
    this.detectCheckedItemsForFilter();
    this.$store.commit('updateCurrentDialogsListOfUserState', this.dialogsList);
  },
};
</script>