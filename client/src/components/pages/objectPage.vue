<template>
  <div
    id="objectPage"
    class="object-page"
  >
    <div class="article">
      <div class="article__side-left">
        <getBackToPrevUrl />
        <h1 class="title title_h1">
          Страница объекта
        </h1>
        <h2 class="title title_h2">
          ID объекта: {{ $route.params.id }}
        </h2>
        <p class="paragraph">
          {{ message.message }}
        </p>
        <p
          v-if="objectData"
          class="paragraph"
        >
          {{ objectData.description }}
        </p>
      </div>
      <div class="article__side-right">
        <socialSharing
          v-if="objectData"
          class="article_social-sharing"
          :propObjectData="objectData"
        />
        <pre
          v-if="$route.params.objectData"
          style="
            width: 300px;
            height: 400px;
            font-size: 12px;
            overflow-x: scroll;
          "
        >{{ $route.params.objectData }}</pre>
      </div>
    </div>
    <ads2 />
  </div>
</template>

<script>
import ads2 from '../ads-2.vue';
import socialSharing from '../common/socialSharing.vue';
import getBackToPrevUrl from '../common/getBackToPrevUrl.vue';

export default {
  metaInfo: {
    title: 'My Example App',
    meta: [
      {
        vmid: 'description',
        property: 'description',
        content: 'Vue App'
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Vue App'
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Vue App'
      },
    ],
  },
  name: 'objectPage',
  components: {
    ads2,
    socialSharing,
    getBackToPrevUrl,
  },
  data() {
    return {
      objectData: null,
      message: {},
    }
  },
  created() {
    if (this.$route.params.objectData) {
      this.objectData = this.$route.params.objectData;
    } else {
      const url = 'http://localhost:9001/test-message';
      fetch(url)
        .then(
          response => {
            response.json().then(
              data => {
                this.message = data;
                // console.log(data);
              }
            );
            console.log('response', response);
          }
        );
      }
  },
  async mounted() {
  },
};
</script>