<template>
  <div class="ads ads_left">
    <a
      class="link ads__link"
      href="https://www.open.ru/"
      title="Реклама"
      target="_blank"
    >
      <img
        :src="hostFront + ally_bank"
        alt="Реклама"
        class="
          image
          ads__img
          ads__img_vertical
        "
      >
      <img
        :src="hostFront + ads_horizontal_mubarak"
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
import ads_horizontal_mubarak from '../images/ads/ads_horizontal_mubarak.png';
import ally_bank from '../images/ads/ally_bank.jpeg';

export default {
  name: 'adsLeft',
  data() {
    return {
      ads_horizontal_mubarak: ads_horizontal_mubarak,
      ally_bank: ally_bank,
      hostFront: process.env.host_front,
    }
  },
};
</script>