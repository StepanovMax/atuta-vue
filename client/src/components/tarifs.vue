<template>
  <div
    class="tarifs"
  >
    <div
      class="tarifs__item"
      @click="selectTarif('vip')"
      id="vip"
    >
      <div
        class="tarifs__image"
        :class="{
          'tarifs__image_active': this.tarif === 'vip'
        }"
      >

      </div>
      <div class="tarifs__text">
        <p class="paragraph">
          1. В поиске объявление с этой услугой находится в специальном VIP-блоке.
        </p>
        <p class="paragraph">
          2. На странице может быть 1 или 2 VIP-блока.
        </p>
        <p class="paragraph">
          3. В VIP-блоке может быть от 1-го до 3-х объявлений. «VIP-размещение» действует 7 дней.
        </p>
      </div>
    </div>
    <div
      class="tarifs__item"
      @click="selectTarif('premium')"
      id="premium"
    >
      <div
        class="tarifs__image"
        :class="{
          'tarifs__image_active': this.tarif === 'premium'
        }"
      >

      </div>
      <div class="tarifs__text">
        <p class="paragraph">
          1. Премиум-объявление может отображаться в премиум-блоке и среди обычных объявлений.
        </p>
        <p class="paragraph">
          2. Премиум-блок есть на каждой странице результатов поиска. «Премиум-размещение» действует 7 дней.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tarifs',
  data() {
    return {
      tarif: '',
    }
  },
  methods: {
    selectTarif(target) {
      console.log('el ::', target);
      if(this.tarif === '') {
        this.tarif = target;
      } else if (this.tarif !== '' && this.tarif === target) {
        this.tarif = '';
      } else if (this.tarif !== '' && this.tarif !== target) {
        this.tarif = target;
      }
    },
  },
};
</script>