<template>
  <div
    v-local
    v-if="object"
    class="local-output-data"
  >
    <h6 class="
      title
      title_h6
      title_bold
    ">
      {{ name }}
    </h6>
    <pre>
      {{ object }}
    </pre>
  </div>
</template>

<script>

export default {
  name: 'localOutputData',
  props: {
    object: {
      required: true
    },
    name: {
      default: '',
      type: String,
      required: true
    },
  },
};
</script>