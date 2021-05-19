<template>
  <div class="sda sda_right">
    <a
      class="link sda__link"
      href="https://www.open.ru/"
      title="Реклама"
      target="_blank"
    >
      <img
        :src="hostFront + duckduckgo"
        alt="Реклама"
        class="
          image
          sda__img
          sda__img_vertical
        "
      >
      <img
        :src="hostFront + sda_horizontal"
        alt="Реклама"
        class="
          image
          sda__img
          sda__img_horizontal
        "
      >
    </a>
  </div>
</template>

<script>
import sda_horizontal from '../images/sda/sda_horizontal.png';
import duckduckgo from '../images/sda/corpbank.jpeg';

export default {
  name: 'sdaRight',
  data() {
    return {
      duckduckgo: duckduckgo,
      sda_horizontal: sda_horizontal,
      hostFront: process.env.host_front,
    }
  },
};
</script>