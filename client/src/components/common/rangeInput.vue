<template>
  <div class="range-input">
    <div class="range-input__item">
      <input
        type="number"
        class="input range-input__input"
        :placeholder="placeholderText + ' от'"
        v-model="inputFrom"
      >
      <p
        v-if="
          rangeType !== 'floor'
          || rangeType !== 'floorAll'
        "
        v-html="currency"
        class="range-input__text"
      />
    </div>
    <div class="range-input__item">
      <input
        type="number"
        class="input range-input__input"
        :placeholder="placeholderText + ' до'"
        v-model="inputTo"
      >
      <p
        v-if="
          rangeType !== 'floor'
          || rangeType !== 'floorAll'
        "
        v-html="currency"
        class="range-input__text"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'range',
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
  },
  data() {
    return {
      inputValueFormatted: [],
      inputValueFrom: '',
      inputValueTo: '',
    }
  },
  computed: {
    currency() {
      let value;
      if (this.rangeType === 'price') {
        value = `<span>₽</span>`;
      } else if(this.rangeType === 'area') {
        value = `<span><span>м</span><sup class="range__input-text-sup">2</sup></span>`;
      } else if(this.rangeType === 'floor') {
        value = '';
      } else if(this.rangeType === 'floorAll') {
        value = '';
      }
      return value;
    },
    placeholderText() {
      let value;
      if (this.rangeType === 'price') {
        value = 'Цена';
      } else if(this.rangeType === 'area') {
        value = 'Площадь';
      } else if(this.rangeType === 'floor') {
        value = 'Этаж';
      } else if(this.rangeType === 'floorAll') {
        value = 'Этажей всего';
      }
      return value;
    },
    inputFrom: {
      cache: false,
      get() {
        return this.inputValueFrom;
      },
      set(value) {
        // const test = parseInt(value.replace(/\D/g,''),10);
        // const testValue = test.toLocaleString();
        // const qwe = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        // const numberFormatted = value.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        // const testValue = numberFormatted.toLocaleString();

        const numbersOnlyTrim = value.replace(/\D/g,'');
        // console.log('numbersOnlyTrim ::', numbersOnlyTrim);
        // console.log('numberWithCommas ::', numbersOnlyTrim, ' | ', this.numberWithCommas(numbersOnlyTrim));
        this.inputValueFrom = value;
        // console.log('inputValueFrom ::', this.inputValueFrom);
      }
    },
    inputTo: {
      cache: false,
      get() {
        return this.inputValueTo;
      },
      set(value) {
        this.inputValueTo = parseInt(value);
      }
    },
    inputFromTo() {
      const value = [this.inputValueFrom, this.inputValueTo];
      return value;
    },
  },
  watch: {
    inputFromTo: {
      handler() {
        const value = [this.inputFrom, this.inputTo];
        this.$emit('update:value', value);
      },
      deep: true
    },
  },
  methods: {
    formatNumber(value) {
      const targetValue = value.target._value;
      console.log('targetValue ::', targetValue);
      const numberString = parseInt(targetValue);
      console.log('numberString ::', numberString);
      // const numberFormatted = numberString.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
      // console.log('numberFormatted ::', numberFormatted, numberFormatted.toLocaleString());
      this.inputValue[0] = numberString;
      console.log('this.inputValue ::', this.inputValue);
      // return numberString;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
};
</script>