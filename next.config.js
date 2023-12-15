const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing'], {
  debug: false, // Enables debugging output
});

module.exports = withTM({

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests',
          },
        ],
      },
      
      
    ];
  },
  env: {
    BASE_URL: 'https://www.trulyco.app',
  },
images: {
    domains: ['https://www.trulyco.app/', 'https://www.trulyco.app/'], // Add your base URL here
 remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 1500000,
},
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    return config;
  },
});
