const getHost = {
  install(Vue) {
    Vue.mixin({
      methods: {
        getHost() {
          let host = {};
          console.log('process.env.NODE_ENV ::', process.env.NODE_ENV);
          if (process.env.NODE_ENV === 'development') {
            host.front = 'http://dev.atyta.ru';
            host.api = 'http://dev-api.atyta.ru:9001';
          } else if (process.env.NODE_ENV === 'stage') {
            host.front = 'http://stage.atyta.ru';
            host.api = 'http://stage-api.atyta.ru:9001';
          } else if (process.env.NODE_ENV === 'localhost') {
            host.front = 'http://127.0.0.1:9000';
            host.api = 'http://127.0.0.1:9001';
          }
          console.log('host ::', host);
          // else if (process.env.NODE_ENV === 'production') {
          //   host.front = 'http://prod.atyta.ru';
          //   host.api = 'http://prod-api.atyta.ru:9001';
          // }
          
          return host;
        },
      }
    });
  }
}

export default getHost;