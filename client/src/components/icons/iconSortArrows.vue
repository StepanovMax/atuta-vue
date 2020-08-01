<template>
  <svg
    width="3"
    height="7"
    viewBox="0 0 3 7"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    :class="propClass"
  >
    <path
      d="M1.5 7L3 4L-2.38498e-08 4L1.5 7Z"
      class="icon__path icon__path-arrow"
      :class="{'icon__path-arrow_active': arrowWay === 'less'}"
    />
    <path
      d="M1.5 0L0 3H3L1.5 0Z"
      class="icon__path icon__path-arrow"
      :class="{'icon__path-arrow_active': !(arrowWay === 'less')}"
    />
  </svg>
</template>

<script>
export default {
  name: 'iconSortArrows',
  props: {
    arrowWay: {
      type: String,
      default: 'less',
      required: true,
    },
    propClass: {
      type: String,
      default: '',
      required: false,
    },
  },
};
</script>