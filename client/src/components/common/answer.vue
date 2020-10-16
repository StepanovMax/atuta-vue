<template>
  <div
    id=""
    class=""
  >
    <p class="paragraph">
      {{ $route.params.data }}
      {{ data }}
    </p>
  </div>
</template>

<script>

export default {
  name: 'answer',
  data() {
    return {
      data: this.$route.params.data,
    }
  },
  components: {

  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
};
</script>