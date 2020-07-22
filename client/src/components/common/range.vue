<template>
  <div class="range">
    <div class="range__desktop">
      <VueSlider
        v-model="rangeValue"
      />
    </div>
    <div class="range__mobile">
      <div class="range__mobile-item">
        <input
          type="number"
          class="input range__mobile-input range__item range__input range__item"
          :placeholder="placeholderText + ' от'"
          v-model.number="inputValue[0]"
        >
        <p
          v-html="currency"
          class="range__mobile-text range__item"
        />
      </div>
      <div class="range__mobile-item">
        <input
          type="number"
          class="input range__mobile-input range__item range__input range__item"
          :placeholder="placeholderText + ' до'"
          v-model.number="inputValue[1]"
        >
        <p
          v-html="currency"
          class="range__mobile-text range__item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'range',
  components: {
    VueSlider,
  },
  props: {
    rangeType: {
      type: String,
      required: true,
    },
    rangeData: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      inputStart: null,
      inputEnd: null,
      inputValue: [null, null],
      rangeValue: [1, 74],
    }
  },
  watch: {
    inputValue: {
      handler() {
        this.$emit('update:rangeData', this.inputValue);
      },
      deep: true
    },
  },
  computed: {
    currency() {
      let value;
      if (this.rangeType === 'price') {
        value = `<span>₽</span>`;
      } else if(this.rangeType === 'area') {
        value = `<span><span>м</span><sup class="range__mobile-text-sup">2</sup></span>`;
      }
      return value;
    },
    placeholderText() {
      let value;
      if (this.rangeType === 'price') {
        value = 'Цена';
      } else if(this.rangeType === 'area') {
        value = 'Площадь';
      }
      return value;
    },
  },
  created() {
    this.min = 0
    this.max = 100
    this.tooltipMerge = false
    this.bgStyle = {
      backgroundColor: '#fff',
      boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
    }
    this.tooltipStyle = {
      backgroundColor: '#666',
      borderColor: '#666'
    }
    this.processStyle = {
      backgroundColor: '#999'
    }
  },
};
</script>