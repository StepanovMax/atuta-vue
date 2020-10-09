<template>
  <svg 
    width="20"
    height="16"
    viewBox="0 0 20 12"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <rect
      y="12"
      width="20"
      height="2"
      class="icon__path"
      :class="{
        'icon__path_white': propColor === 'white',
      }"
    />
    <rect
      y="6"
      width="20"
      height="2"
      class="icon__path"
      :class="{
        'icon__path_white': propColor === 'white',
      }"
    />
    <rect
      y="0"
      width="20"
      height="2"
      class="icon__path"
      :class="{
        'icon__path_white': propColor === 'white',
      }"
    />
  </svg>
</template>

<script>
export default {
  name: 'iconHamburger',
  props: {
    propColor: {
      default: '',
      type: String,
      required: false
    },
  },
};
</script>