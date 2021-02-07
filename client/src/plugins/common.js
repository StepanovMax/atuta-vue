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
      }
    });
  }
}

export default common;