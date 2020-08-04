<template>
  <svg
    width="26"
    height="23"
    viewBox="0 0 26 23"
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon_stroke icon_heart"
    :class="{
      'icon_heart-filled': propIsIconFilled === true
    }"
  >
    <path
      d="M4.14085 13.2825C8.29288 17.9397 13.1998 21.0728 13.1998 21.0728C13.1998 21.0728 18.1068 17.9397 22.2588 13.2825C25.0172 10.6292 25.6269 6.56467 23.8557 3.82675C22.0846 1.08883 19.3153 0.801086 17.497 1.08883C14.4774 2.2461 13.1998 4.05256 13.1998 4.05256C13.1998 4.05256 11.9223 2.2461 8.90262 1.08883C7.08437 0.801086 4.31506 1.08883 2.54392 3.82675C0.772773 6.56467 1.38251 10.6292 4.14085 13.2825Z" 
      stroke-width="2"
      stroke-linecap="round"
      class="icon__path-stroke"
    />
  </svg>
</template>

<script>
export default {
  name: 'iconHeartStroke',
  props: {
    propIsIconFilled: {
      default: false,
      type: Boolean,
      required: true
    },
  },
};
</script>