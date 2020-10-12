const getHost = {
  install(Vue) {
    Vue.mixin({
      methods: {
        getHost() {
          let host;
          if (process.env.NODE_ENV === 'development') {
            host = 'http://dev-api.atyta.ru:9001';
          } else if (process.env.NODE_ENV === 'production') {
            host = 'http://prod-api.atyta.ru:9001';
          } else {
            host = 'http://127.0.0.1:9001';
          }
          return host;
        },
      }
    });
  }
}

export default getHost;