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
      Город
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
// import { mapState } from 'vuex';
import iconSearchGlass from '../icons/iconSearchGlass.vue';

export default {
  name: 'grid',
  data() {
    return {
      // dataObjectData: this.propObjectData,
    }
  },
  components: {
    iconSearchGlass,
  },
  props: {
    // propObjectData: {
    //   type: Object,
    //   default: {},
    //   required: true,
    // },
  },
  methods: {
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
    // ...mapState([
    //   'filterDataSelected',
    // ]),
  },
};
</script>