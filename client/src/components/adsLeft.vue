<template>
  <div class="sda sda_left">
    <a
      class="link sda__link"
      href="https://www.open.ru/"
      title="Реклама"
      target="_blank"
    >
      <img
        :src="hostFront + ally_bank"
        alt="Реклама"
        class="
          image
          sda__img
          sda__img_vertical
        "
      >
      <img
        :src="hostFront + sda_horizontal_mubarak"
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
import sda_horizontal_mubarak from '../images/sda/sda_horizontal_mubarak.png';
import ally_bank from '../images/sda/ally_bank.jpeg';

export default {
  name: 'sdaLeft',
  data() {
    return {
      sda_horizontal_mubarak: sda_horizontal_mubarak,
      ally_bank: ally_bank,
      hostFront: process.env.host_front,
    }
  },
};
</script>