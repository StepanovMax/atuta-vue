const formatNumbers = {
  install(Vue) {
    Vue.mixin({
      methods: {
        gFormatPrice(value) {
          // Convert to string.
          let numberFormatted = value.toString();
          // Trim all whitespaces.
          numberFormatted = numberFormatted.replace(/\s/g, '');
          // Format numbers to price number format(### ### ### etc).
          numberFormatted = numberFormatted.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
          return numberFormatted;
        },
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
        // Help to avoid non numeric symbols(apart from dot) while entering a data to input field.
        isNumber(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();
          } else {
            return true;
          }
        },
        convertRangeToArray(range) {
          let resultedArray = [];
          for (let i = range[0]; i <= range[1]; i++) {
            resultedArray.push(
              {
                'label': i,
                'slug': i,
              }
            );
          }
          return resultedArray;
        },
      },
    });
  }
}

export default formatNumbers;