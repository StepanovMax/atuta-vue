<template>
  <div
    v-local
    v-if="propObjectData"
    class="local-output-data"
  >
    <h6 class="
      title
      title_h6
      title_bold
    ">
      propObjectData
    </h6>
    <pre>
      {{ propObjectData }}
    </pre>
  </div>
</template>

<script>

export default {
  name: 'localOutputData',
  props: {
    propObjectData: {
      type: Object,
      default: {},
      required: true,
    },
  },
};
</script>