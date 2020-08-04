<template>
  <a
    href="javascript: history.go(-1)"
    class="get-back-to-prev-url"
  >
    <iconArrowLeft
      class="get-back-to-prev-url__icon"
    />
    <span class="get-back-to-prev-url__text">
      Вернуться
    </span>
  </a>
</template>

<script>
import iconArrowLeft from '../icons/iconArrowLeft.vue'

export default {
  name: 'getBackToPrevUrl',
  components: {
    iconArrowLeft,
  },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    // item: {
    //   default: {},
    //   type: Object,
    //   required: true
    // },
  },
  data() {
    return {
      // dataIsIconFilled: false
    }
  },
  methods: {
    // returnToPreviousUrl() {
    //   console.log('dataIsIconFilled', this.dataIsIconFilled);
    //   this.dataIsIconFilled = !this.dataIsIconFilled;
    // }
  },
};
</script>