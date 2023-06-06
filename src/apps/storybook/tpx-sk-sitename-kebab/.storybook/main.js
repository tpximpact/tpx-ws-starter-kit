const wingsuitCore = require('@wingsuit-designsystem/core');
const postCss = require('postcss');

module.exports = {
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-addon-themes',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    'addon-screen-reader',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postCss,
        },
      },
    },
  ],
  webpackFinal: (config) => {
    const final = wingsuitCore.getAppPack(wingsuitCore.resolveConfig('storybook-tpx-sk-sitename-kebab'), [
      config,
    ]);
    return final;
  },
};
