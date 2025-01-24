const baseConfig = require('../base.federation.config');
const {
  withNativeFederation,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  ...baseConfig,
  name: 'mfe-quote',
  exposes: {
    './mfe': './frontend/libs/quote-lib/src/index.ts',
  },
});
