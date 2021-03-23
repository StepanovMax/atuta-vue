<template>
  <div class="ads ads_left">
    <a
      class="link ads__link"
      href="https://www.open.ru/"
      title="Реклама"
      target="_blank"
    >
      <img
        :src="hostFront + '/src/images/ads/external-content.duckduckgo.com2.jpeg'"
        alt="Реклама"
        class="
          image
          ads__img
          ads__img_vertical
        "
      >
      <img
        :src="hostFront + '/src/images/ads/ads_horizontal_mubarak.png'"
        alt="Реклама"
        class="
          image
          ads__img
          ads__img_horizontal
        "
      >
    </a>
  </div>
</template>

<script>

export default {
  name: 'adsLeft',
  data() {
    return {
      hostFront: process.env.host_front,
    }
  },
};
</script>