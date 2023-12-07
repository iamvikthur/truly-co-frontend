const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing']);

module.exports = withTM({
  env: {
    BASE_URL: 'https://truly-2vbq.onrender.com',
  },
future: {
        webpack5: true
    },
    webpack: function (config, options) {
        console.log(options.webpack.version); // 5.18.0
        config.experiments = {};
        return config;
    }
  
});
