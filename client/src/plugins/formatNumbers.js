const formatNumbers = {
  install(Vue) {
    Vue.mixin({
      methods: {
        formatNumbers(value) {
          const numberString = value.toString();
          const numberFormatted = numberString.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
          return numberFormatted;
        },
        formatMobilePhone(value) {
          let numberToString = ('' + value).replace(/\D/g, '');
          let matchedGroups = numberToString.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
          if ((numberToString = 11) && matchedGroups) {
            return '+' + matchedGroups[1] + ' (' + matchedGroups[2] + ') ' + matchedGroups[3] + '-' + matchedGroups[4] + '-' + matchedGroups[5];
          } else {
            console.error('Some problems with formatting phone numbers');
          }
          return null
        },
      },
    });
  }
}

export default formatNumbers;