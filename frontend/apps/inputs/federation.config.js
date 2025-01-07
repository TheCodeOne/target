const baseConfig = require('../base.federation.config');
const {
  withNativeFederation,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  ...baseConfig,
  name: 'mfe-inputs',
  exposes: {
    './mfe': './frontend/libs/input-lib/src/index.ts',
  },
});
