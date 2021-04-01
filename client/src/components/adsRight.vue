<template>
  <div class="ads ads_right">
    <a
      class="link ads__link"
      href="https://www.open.ru/"
      title="Реклама"
      target="_blank"
    >
      <img
        :src="hostFront + duckduckgo"
        alt="Реклама"
        class="
          image
          ads__img
          ads__img_vertical
        "
      >
      <img
        :src="hostFront + ads_horizontal"
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
import ads_horizontal from '../images/ads/ads_horizontal.png';
import duckduckgo from '../images/ads/corpbank.jpeg';

export default {
  name: 'adsRight',
  data() {
    return {
      duckduckgo: duckduckgo,
      ads_horizontal: ads_horizontal,
      hostFront: process.env.host_front,
    }
  },
};
</script>