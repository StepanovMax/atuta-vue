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
                :value.sync="filterDialogsValue"
              />
            </div>
            <div class="dialogs-list__filters-item">
              <multiselect
                class="dialogs-list__multiselect"
                v-model="filterSelectValue"
                :options="filterSelectOptionsValue"
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
                        {{ item.clientTitle }}
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
                          v-if="item.lastItemIsRead"
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

              <div
                v-hide
                class="card-dialog"
              >
                <router-link
                  class="card-dialog__link"
                  :to="{
                    name: 'objectPage',
                  }"
                  title="Перейти подробнее 1"
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
                        class="imgcard-dialog__img"
                        src="http://127.0.0.1:9000/src/images/objects/8993850241.jpg"
                        alt=""
                      >
                    </div>
                    <div class="card-dialog__inner-wrap-center">
                      center
                    </div>
                    <div class="card-dialog__inner-wrap-right">
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
      filterDialogsValue: '',
      filterSelectOptionsValue: [
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
          slug: 'onlyMine',
        },
      ],
      filterSelectValue: '',
    }
  },
  watch: {
    filterDialogsValue: {
      handler(value) {
        this.$store.commit('updateDialogsFilterState', value);
        this.updateDialogsList();
      },
      deep: true
    },
    dialogsListState(newValue, oldValue) {
      // console.log('newValue ::', newValue);
      this.updateDialogsList();
      // this.getFavouritesObjectsByListID(newValue.favouriteObjectsListID);
    },
  },
  computed: {
    ...mapState([
      'dialogsListState',
      'filterDialogsSwitcherValue',
    ]),
  },
  methods: {
    detectCheckedItemsForFilter() {
      this.filterLabels = this.filterLabelsDefault.map(
        item => {
          if (item.slug === this.filterDialogsSwitcherValue.slug) {
            // console.log('item ::', item);
            item.checked = true;
          }
          return item;
        }
      );
    },
    updateDialogsList() {
      if (this.filterDialogsSwitcherValue.slug === 'all') {
        this.dialogsList = this.dialogsListState;
        // console.log('all ::', this.dialogsListState);
      } else if (this.filterDialogsSwitcherValue.slug === 'blackList') {
        const array = [...this.dialogsListState];
        array.forEach(
          item => {
            if (!item.blackList) {
              return item;
            }
          }
        );
        this.dialogsList = array;
        console.log('blackList ::', this.dialogsList);
      }
    },
  },
  beforeMount() {
    this.detectCheckedItemsForFilter();
    this.updateDialogsList();
    this.$store.commit('updateDialogsListState', this.dialogsList);
  },
  mounted() {
    // console.log('this.dialogsList ::', this.dialogsList);
  },
};
</script>