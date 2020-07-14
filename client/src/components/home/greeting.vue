<template>
  <div
    id="greeting"
    class="greeting"
  >
    <h1 class="title title_h1">
      Привет!
    </h1>
    <h2 class="title title_h2">
      Это сайт Атута.
    </h2>
    <p class="paragraph">
      Добро пожаловать.
    </p>
  </div>
</template>

<script>
export default {
  name: 'greeting',
  data() {
    return {
      message: null
    }
  },
  methods: {
    fetchMessage() {
      fetch('http://127.0.0.1:9001/test')
        /*
          Converting to json
        */
        .then(response => response.json())
        /*
          Output the result of the executing response.json() to the console.
        */
        .then(data => {
          // console.log('Data ::', data)
          this.message = data.message
        })
        .catch(
          error => console.log('Error ::', error)
        )
    }
  },
  mounted() {
    console.log('NODE_ENV ::', process.env.NODE_ENV);
    console.log('VUE_APP_DOMAIN ::', process.env.VUE_APP_DOMAIN);
    console.log('env ::', process.env);
  }
};
</script>

<style lang="scss">
.greeting {
  text-align: left;

  &__h1 {
    color: blue;
  }
}
</style>