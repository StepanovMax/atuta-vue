<template>
  <div class="range">
    <div class="range__desktop">
      <div class="range__price">
        <p class="range__price-digit range__price-digit-from">
          <span>
            {{ rangeValueFormatted[0] }}
          </span>
          <span
            v-html="currency"
          />
        </p>
        <p class="range__price-digit range__price-digit-to">
          <span>
            {{ rangeValueFormatted[1] }}
          </span>
          <span
            v-html="currency"
          />
        </p>
      </div>
      <VueSlider
        v-bind="options"
        v-model="rangeValue"
        :tooltip="'none'"
      />
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
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    rangeType: {
      type: String,
      default: 'price',
      required: true,
    },
    rangeData: {
      type: Array,
      default: [0, 100],
      required: true,
    },
  },
  data() {
    return {
      rangeValue: [this.rangeData[0], this.rangeData[1]],
      options: {
        dotSize: 20,
        width: 'auto',
        height: 2,
        contained: false,
        direction: 'ltr',
        data: null,
        min: this.rangeData[0],
        max: this.rangeData[1],
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
        tooltipMerge: false,
      },
    }
  },
  watch: {
    rangeValue: {
      handler() {
        this.$emit('update:value', this.rangeValue);
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
    rangeValueFormatted() {
      console.log('this.rangeValue[0]', this.rangeValue[0]);
      console.log('this.rangeValue[1]', this.rangeValue[1]);
      const value0 = this.formatPrice(this.rangeValue[0]);
      const value1 = this.formatPrice(this.rangeValue[1]);
      const value = [value0, value1];
      console.log('value', value);
      return value;
    },
  },
  methods: {
    formatPrice(price) {
      const priceString = price.toString();
      const value = priceString.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
      return value;
    },
  },
  created() {
    this.min = 9;
    this.max = 127;
    this.tooltipMerge = false;
    this.bgStyle = {
      backgroundColor: '#fff',
      boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
    };
    this.tooltipStyle = {
      backgroundColor: '#666',
      borderColor: '#666'
    };
    this.processStyle = {
      backgroundColor: '#999'
    };
  },
};
</script>