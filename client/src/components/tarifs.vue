<template>
  <div
    class="tarifs"
  >
    <div
      class="tarifs__item"
      @click="selectTarif(tarifsArray[0].slug)"
      :id="tarifsArray[0].slug"
    >
      <div
        class="tarifs__image"
        :class="{
          'tarifs__image_active': this.selectedTarifName === tarifsArray[0].slug
        }"
      >
        <p
          class="tarifs__image-text tarifs__image-text_name"
          :class="{
            'tarifs__image-text_active': this.selectedTarifName === tarifsArray[0].slug
          }"
        >
          {{ tarifsArray[0].label }}
        </p>
        <p
          class="tarifs__image-text tarifs__image-text_price"
          :class="{
            'tarifs__image-text_active': this.selectedTarifName === tarifsArray[0].slug
          }"
        >
          {{ tarifsArray[0].price }}
          <unit
            propUnit="rouble"
          />
        </p>
        <iconCrown
          class="tarifs__icon"
          :propColor="this.selectedTarifName === tarifsArray[0].slug ? 'white' : ''"
        />
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
      @click="selectTarif(tarifsArray[1].slug)"
      :id="tarifsArray[1].slug"
    >
      <div
        class="tarifs__image"
        :class="{
          'tarifs__image_active': this.selectedTarifName === tarifsArray[1].slug
        }"
      >
        <p
          class="tarifs__image-text tarifs__image-text_name"
          :class="{
            'tarifs__image-text_active': this.selectedTarifName === tarifsArray[1].slug
          }"
        >
          {{ tarifsArray[1].label }}
        </p>
        <p
          class="tarifs__image-text tarifs__image-text_price"
          :class="{
            'tarifs__image-text_active': this.selectedTarifName === tarifsArray[1].slug
          }"
        >
          {{ tarifsArray[1].price }}
          <unit
            propUnit="rouble"
          />
        </p>
        <iconDiamond
          class="tarifs__icon"
          :propColor="this.selectedTarifName === tarifsArray[1].slug ? 'white' : ''"
        />
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
import iconCrown from './icons/iconCrown.vue';
import iconDiamond from './icons/iconDiamond.vue';
import unit from './common/unit.vue';

export default {
  name: 'tarifs',
  components: {
    unit,
    iconCrown,
    iconDiamond,
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      selectedTarifName: '',
      tarifPrice: '',
      tarifsArray: [
        {
          label: 'VIP',
          slug: 'vip',
          price: 100,
        },
        {
          label: 'Premium',
          slug: 'premium',
          price: 50,
        },
      ]
    }
  },
  watch: {
    selectedTarifName: {
      handler(value) {
        if (value === 'vip') {
          this.$emit('update:value', this.tarifsArray[0]);
        } else if (value === 'premium') {
          this.$emit('update:value', this.tarifsArray[1]);
        } else {
          this.$emit('update:value', 0);
        }
      },
      deep: true
    },
  },
  methods: {
    selectTarif(targetedTarifName) {
      if(this.selectedTarifName === '') {
        this.selectedTarifName = targetedTarifName;
      } else if (this.selectedTarifName !== '' && this.selectedTarifName === targetedTarifName) {
        this.selectedTarifName = '';
      } else if (this.selectedTarifName !== '' && this.selectedTarifName !== targetedTarifName) {
        this.selectedTarifName = targetedTarifName;
      }
    },
  },
};
</script>