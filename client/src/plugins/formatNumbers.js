const formatNumbers = {
  install(Vue) {
    Vue.mixin({
      methods: {
        formatNumbers(value) {
          const numberString = value.toString();
          const numberFormatted = numberString.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
          return numberFormatted;
        }
      },
    });
  }
}

export default formatNumbers;