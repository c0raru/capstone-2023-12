const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.modules.push(__dirname); // 추가
    return config;
  }
}
