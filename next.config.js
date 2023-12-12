const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing'], {
  debug: false, // Enables debugging output
});

module.exports = withTM({
  env: {
    BASE_URL: 'http://143.244.178.155',
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    return config;
  },
});
