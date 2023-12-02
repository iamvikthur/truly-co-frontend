const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing']);

module.exports = withTM({
  env: {
    BASE_URL: 'https://bytruly.co',
  },
});
