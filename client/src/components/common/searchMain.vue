<template>
  <div
    class="search-main"
  >
    <div
      class="
        search-main__item
        search-main__item_input
      "
    >
      <iconSearchGlass
        class="search-main__icon-search-glass"
      />
      <input
        type="text"
        class="
          input
          search-main__input
        "
        @focus="focusInput()"
        v-model="searchMainInputValue"
      >
      <button
        v-if="isButtonShow"
        class="
          btn
          search-main__btn
        "
        @click="searchBtnClick()"
      >
        Искать
      </button>
      <div
        class="search-main__item-checkboxes"
      >
        <ul class="search-main__item-checkboxes-list">
          <li class="search-main__item-checkboxes-list-item">
            <checkbox
              key="searchInTitleDesktop"
              class="search-main__checkbox"
              checkboxId="searchInTitleDesktop"
              :propClass="'search-main__checkbox'"
              :item="filterDataDefaultClone.searchInTitle"
              :value.sync="filterSelected.searchInTitle"
            />
          </li>
          <li class="search-main__item-checkboxes-list-item">
            <checkbox
              key="searchWithImagesDesktop"
              class="search-main__checkbox"
              checkboxId="searchWithImagesDesktop"
              :propClass="'search-main__checkbox'"
              :item="filterDataDefaultClone.searchWithImages"
              :value.sync="filterSelected.searchWithImages"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="
      search-main__item
      search-main__item_town
    ">
      <multiselect
        class="multiselect-search-main"
        v-model="filterSelected.town"
        :options="filterDataDefaultClone.town"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        :searchable="true"
        label="city"
        track-by="city"
        placeholder="Город"
      />
    </div>
    <div class="
      search-main__item
      search-main__item_district
    ">
      <multiselect
        class="multiselect-search-main"
        v-model="filterSelected.district"
        :options="filterDataDefaultClone.district"
        :show-labels="false"
        :allow-empty="false"
        :close-on-select="true"
        :multiple="false"
        :searchable="true"
        label="label"
        track-by="label"
        placeholder="Район"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import multiselect from 'vue-multiselect';
import checkbox from '../common/checkbox.vue'
import iconSearchGlass from '../icons/iconSearchGlass.vue';

export default {
  name: 'grid',
  data() {
    return {
      filterSelected: {},
      isButtonShow: false,
      searchMainInputValue: null,
    }
  },
  components: {
    checkbox,
    multiselect,
    iconSearchGlass,
  },
  watch: {
    filterSelected: {
      handler() {
        this.updateFilterState(this.filterSelected);
      },
      deep: true
    },
    filterDataSelected: {
      handler() {
        this.filterSelected = this.filterDataSelected;
      },
      deep: true
    },
    searchMainInputValue: {
      handler(value) {
        if (value) {
          this.isButtonShow = true;
        } else if (!value) {
          this.isButtonShow = false;
        }
      },
      deep: true
    },
  },
  methods: {
    updateFilterState(data) {
      this.$store.commit('updateFilterState', data);
    },
    searchBtnClick(event){
      console.log('searchSubmit');
    },
    focusInput(){
      this.isButtonShow = true;
    },
  },
  computed: {
    ...mapState([
      'filterDataDefault',
      'filterDataSelected',
    ]),
    filterDataDefaultClone() {
      return JSON.parse(JSON.stringify(this.filterDataDefault));
    },
  },
  created() {
    this.filterSelected = JSON.parse(JSON.stringify(this.filterDataSelected));
  },
};
</script>