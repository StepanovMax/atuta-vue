<template>
  <div
    id="objectPage"
    class="object-page"
  >
    <div class="article">
      <div class="article__side-left">

        <getBackToPrevUrl />

        <h2
          v-if="objectData"
          class="title title_h2"
        >
          {{ objectData.metaTitle }}
        </h2>

        <p class="paragraph">
          {{ message.message }}
        </p>

        <pre
          v-if="objectData"
          style="
            width: 500px;
            height: 600px;
            font-size: 12px;
            overflow-x: scroll;
          "
        >{{ objectData }}</pre>

      </div>
      <div class="article__side-right">
        <socialSharing
          v-if="objectData"
          class="article_social-sharing"
          :propObjectData="objectData"
        />
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
      objectID: this.$route.params.id,
    }
  },
  created() {
    this.getObjectOnPageReload();
  },
  methods: {
    // Get an object when the page has been reload.
    getObjectOnPageReload() {
      // If it's a route transition then load an object through params.
      if (this.$route.params.objectData) {
        this.objectData = this.$route.params.objectData;
      } else {
        const url = 'http://localhost:9001/objects/get-object-by-id';
        fetch(
          url,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              id: this.objectID
            })
          }
        )
          .then(
            response => {
              if (response.status !== 200) {
                console.error('Looks like there was a problem. :: ' + 'Status Code ' + response.status);
                return;
              }
              response.json()
                .then(
                  response => {
                    this.objectData = response;
                  }
                )
                .catch(
                  err => {
                    console.error('Request failed ::', err)
                  }
                );
            }
          );
      }
    }
  },
};
</script>