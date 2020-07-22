<template>
  <div class="range">
    <div class="range__desktop">
      <VueSlider
        v-model="rangeValue"
      />
    </div>
    <div class="range__mobile">
      <input
        type="number"
        class="input range__item range__input range__item"
        placeholder="Площадь от"
        v-model.number="inputValue[0]"
      >
      <input
        type="number"
        class="input range__item range__input range__item"
        placeholder="Площадь до"
        v-model.number="inputValue[1]"
      >
      <p
        class="range__text range__item"
        v-if="false"
      >
        ₽
      </p>
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
    rangeData: {
      type: Array,
      required: false
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
  // computed: {
  //   rangeInputsValue() {
  //     console.log('this.inputValue ::', this.inputValue);
  //     this.$emit('update:rangeData', this.inputValue);
  //     return this.inputValue;
  //   },
  // },
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