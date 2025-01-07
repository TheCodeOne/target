const { shareAll } = require('@angular-architects/native-federation/config');

module.exports = {
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },

  // packages we don't need at runtime
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    'http',
    'https',
    'util',
    'zlib',
    'stream',
    'url',
    'assert',
    'axios',
    '@nestjs/axios',
    '@nestjs/common',
    '@nestjs/core',
    '@nestjs/config',
    '@nestjs/platform-express',
    '@nestjs/cache-manager',
    '@nestjs/axios',
    '@nestjs/schedule',
    // Add further packages you don't need at runtime
  ],
};
