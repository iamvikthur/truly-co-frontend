const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing']);

module.exports = withTM({
  env: {
    BASE_URL: 'https://truly-2vbq.onrender.com',
  },
});
