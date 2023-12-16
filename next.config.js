const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing'], {
  debug: false, // Enables debugging output
});

module.exports = withTM({

  
  
images: {
    domains: ['https://www.trulyco.app', 'https://admin.trulyco.app/'], // Add your base URL here
 
},
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    return config;
  },
});
