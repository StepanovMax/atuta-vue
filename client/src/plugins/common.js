const common = {
  install(Vue) {
    Vue.mixin({
      methods: {
        isObjectEmpty(obj) {
          for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
              return false;
            }
          }
          return JSON.stringify(obj) === JSON.stringify({});
        },
        validateEmail(email) {
          const mask = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return mask.test(String(email).toLowerCase());
        },
        compareArrays(a, b) {
          return JSON.stringify(a) === JSON.stringify(b);
        },
        gValidatePassword(value) {
          const mask = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,33})/;
          return mask.test(value);
        },
        gValidatePasswordForOneNumber(value) {
          const mask = /(?=.*[0-9])/;
          return mask.test(value);
        },
        gValidatePasswordForOneLetterInLowercase(value) {
          const mask = /(?=.*[a-z])/;
          return mask.test(value);
        },
        gValidatePasswordForOneLetterInUppercase(value) {
          const mask = /(?=.*[A-Z])/;
          return mask.test(value);
        },
        gValidatePasswordForOneSpecialSymbol(value) {
          const mask = /(?=.*[!@#\$%\^&\*])/;
          return mask.test(value);
        },
      }
    });
  }
}

export default common;