<template>
  <div
    id=""
    class=""
    v-if="helpData"
    :key="helpID"
  >
    <router-link
      class="
        link
        help-page__back-link
      "
      :to="{
        name: 'helpPage'
      }"
      title="Назад на Помощь"
    >
      Назад
    </router-link>

    <h3 class="title title_h3">
      {{ helpData.question }}
    </h3>

    <p class="paragraph">
      {{ helpData.answer }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'answer',
  data() {
    return {
      helpData: null,
      helpID: this.$route.params.id,
    }
  },
  components: {

  },
  computed: {
    urlGetHelpById() {
      const host = this.getHost();
      const url = `${host.api}` + '/help/get-help-by-id';
      return url;
    },
  },
  watch: {
    '$route.params': function(id) {
      console.log('$route.params ::');
    }
  },
  methods: {
    // Get an help when the page has been reload.
    async getHelpOnPageReload() {
      const result = await axios.post(
        this.urlGetHelpById,
        {
          id: this.helpID
        }
      )
        .then(function (response) {
          return response;
        })
          .catch(function (error) {
            console.error(error);
          });
      if (result) {
        this.helpData = result.data;
      }
    },
  },
  beforeMount() {
    // console.log('beforeMount ::');
    // If it's a route transition then load an object through params.
    if (this.$route.params.data) {
      this.helpData = this.$route.params.data;
    } else {
      this.getHelpOnPageReload();
    }
  },
  mount() {
    console.log('answer mount ::');
  },
};
</script>