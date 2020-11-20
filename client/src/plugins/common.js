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
      }
    });
  }
}

export default common;