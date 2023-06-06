/**
 * tpx_sk_sitename webpack config.
 */
const wingsuitCore = require('@wingsuit-designsystem/core');

const appConfig = wingsuitCore.resolveConfig('drupal-tpx-sk-sitename-kebab', process.env.NODE_ENV);
const finalConfig = wingsuitCore.getAppPack(appConfig);
module.exports = finalConfig;
