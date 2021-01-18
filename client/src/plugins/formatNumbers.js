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
        gFormatPhone2(value) {
          // console.log('value ::', value);
          const excludedNonNumbers = value.replace(/\D/g, '');
          // Dividing on groups
          const x = excludedNonNumbers.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          const formattedPhoneNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
          console.log('formattedPhoneNumber ::', formattedPhoneNumber, typeof formattedPhoneNumber);
          return formattedPhoneNumber;
        },
        gFormatPhone(value) {
          const firstSymbol = value.charAt(0);
          const excludedNonNumbers = value.replace(/\D/g, '');
          if (excludedNonNumbers.length) {
            // if (excludedNonNumbers.length > 11) {
            //   const trimmedString = excludedNonNumbers.substring(0, 11);
            // }
            // Dividing on groups
            const x = excludedNonNumbers.match(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/);
            // console.log('x ::', x);
            const formattedPhoneNumber = !x[3] ? x[1] + ' ' + x[2] : x[1] + ' ' + '(' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '');
            // console.log('formattedPhoneNumber ::', formattedPhoneNumber);
            return  '+' + formattedPhoneNumber;
          } else if (firstSymbol === '+' && value.length > 1) {
            return '+';
          } else {
            return '';
          }
        },
        gFormatPhoneRevert(value) {
          const numbers = value.replace(/\D/g,'');
          return parseInt(numbers);
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
          const charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();
          } else {
            return true;
          }
        },
        gFilterSpecialCharacters(value) {
          console.log('gFilterSpecialCharacters ::');
          const mask = /\W|_/g;
          // console.log('value ::', value);
          const maskResult = value.replace(/[^\w\s]/gi, '') // /\W|_/g
          console.log('maskResult ::', maskResult);
          return maskResult;
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