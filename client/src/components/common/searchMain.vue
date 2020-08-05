<template>
  <div
    class="search-main"
  >
    <div class="
      search-main__item
      search-main__item_input
    ">
      <iconSearchGlass
        class="search-main__icon-search-glass"
      />
      <input
        type="text"
        class="
          input
          search-main__input
        "
      >
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
      Район
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import multiselect from 'vue-multiselect';
import iconSearchGlass from '../icons/iconSearchGlass.vue';

export default {
  name: 'grid',
  data() {
    return {
      filterSelected: {},
    }
  },
  components: {
    multiselect,
    iconSearchGlass,
  },
  props: {
    // propObjectData: {
    //   type: Object,
    //   default: {},
    //   required: true,
    // },
  },
  watch: {
    filterSelected: {
      handler() {
        this.updateFilterState(this.filterSelected);
      },
      deep: true
    },
  },
  methods: {
    updateFilterState(data) {
      this.$store.commit('updateFilterState', data);
    },
    // timeConverter(UNIX_timestamp){
    //   const a = new Date(UNIX_timestamp * 1000);
    //   const year = a.getFullYear();
    //   let month = a.getMonth();
    //   if (month < 10) {
    //     month = '0' + month;
    //   }
    //   let day = a.getDate();
    //   if (day < 10) {
    //     day = '0' + day;
    //   }
    //   const time = day + '.' + month + '.' + year;
    //   return time;
    // },
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