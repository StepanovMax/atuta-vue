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
    <p class="paragraph">
      Quisque malesuada placerat nisl. Quisque id mi. Fusce neque. Nam at tortor in tellus interdum sagittis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.

      Ut id nisl quis enim dignissim sagittis. Pellentesque auctor neque nec urna. Praesent ac sem eget est egestas volutpat. Praesent blandit laoreet nibh. Sed cursus turpis vitae tortor.

      Praesent blandit laoreet nibh. Morbi nec metus. Pellentesque auctor neque nec urna. Aenean viverra rhoncus pede. Sed aliquam ultrices mauris.

      Vivamus laoreet. Ut non enim eleifend felis pretium feugiat. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.

      Morbi mollis tellus ac sapien. Praesent vestibulum dapibus nibh. Curabitur at lacus ac velit ornare lobortis. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
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
    // console.log('NODE_ENV ::', process.env.NODE_ENV);
    // console.log('VUE_APP_DOMAIN ::', process.env.VUE_APP_DOMAIN);
    // console.log('env ::', process.env);
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