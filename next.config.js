const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing'], {
  debug: false, // Enables debugging output
});

module.exports = withTM({
  env: {
    BASE_URL: 'http://143.244.178.155',
  },
images: {
    domains: [process.env.BASE_URL], // Add your base URL here
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    return config;
  },
});
