const {
  withNativeFederation,
} = require('@angular-architects/native-federation/config');

const baseConfig = require('../base.federation.config');

module.exports = withNativeFederation(baseConfig);
