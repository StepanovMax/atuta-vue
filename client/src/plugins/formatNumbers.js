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
        gFormatNumbers(value) {
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
        gIsNumber(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();
          } else {
            return true;
          }
        },
        gConvertRangeToArray(range) {
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
        gAddPlusLastValueToArray(array) {
          let resultedArray = array;
          const maxNumber = array.length;
          resultedArray.push({
            label: maxNumber + '+',
            slug: maxNumber + '+',
          });
          return resultedArray;
        },
        gConvertDate(value) {
          let day = value.getDate();
          let month = value.getMonth() + 1;
          const year = value.getFullYear();
          if (`${month}`.length < 2) {
            month = 0 + `${month}`;
          }
          if (`${day}`.length < 2) {
            day = 0 + `${day}`;
          }
          const toDayDate = day + '.' + month + '.' + year;
          return toDayDate;
        },
        gTimestampToDateConverter(UNIX_timestamp){
          const date = new Date(UNIX_timestamp * 1000);
          const year = date.getFullYear();
          let month = date.getMonth();
          if (month < 10) {
            month = '0' + month;
          }
          let day = date.getDate();
          if (day < 10) {
            day = '0' + day;
          }
          const convertedDate = day + '.' + month + '.' + year;
          return convertedDate;
        },
        gCapitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        },
        gLowerCaseFirstLetter(string) {
          return string.charAt(0).toLowerCase() + string.slice(1);
        },
      }
    });
  }
}

export default formatNumbers;