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
          {{ objectData.description }}
        </p>
      </div>
      <div class="article__side-right">
        <socialSharing
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
  name: 'objectPage',
  components: {
    ads2,
    socialSharing,
    getBackToPrevUrl,
  },
  data() {
    return {
      objectData: {}
    }
  },
  created() {
    if (this.$route.params.objectData) {
      console.log('params good');
      this.objectData = this.$route.params.objectData;
    } else {
      this.objectData = {};
      console.log('params NO');
    }
  },
  mounted() {
  },
};
</script>