const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing'], {
  debug: true, // Enables debugging output
});

module.exports = withTM({
  env: {
    BASE_URL: 'https://truly-2vbq.onrender.com/',
  },
});
