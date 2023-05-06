const path = require('path');

DESTINATION_URL = 'http://127.0.0.1:8000/api/:path*/'
SOURCE_PATH = '/api/:path*'

module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
  async rewrites() {
      if (process.env.NODE_ENV !== 'production') {
          return [
            {
                destination: DESTINATION_URL,
                source: SOURCE_PATH,
            },
            {
                destination: 'http://127.0.0.1:8000/media/:path*/',
                source: '/media/:path*',
            },
          ];
      } else {
        return []
      }
  },
}