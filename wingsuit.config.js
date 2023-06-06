const fs = require('fs');
const path = require('path');
const { WatchIgnorePlugin } = require('webpack');
const drupal = require('@wingsuit-designsystem/core/dist/server/presets/drupal');
const twing = require('@wingsuit-designsystem/core/dist/server/presets/twing');
const storybook = require('@wingsuit-designsystem/core/dist/server/presets/storybook');
const tailwind2Json = require('@wingsuit-designsystem/preset-tailwind2/dist/plugins/Tailwind2JsonPlugin.js');


const TpxSkSitenamePascalNamespaces = require('./src/design-systems/tpx-sk-sitename-kebab/namespaces');
const TpxSkSitenamePascalPostCssConfig = require('./src/design-systems/tpx-sk-sitename-kebab/postcss.config');

const TpxSkSubSitenamePascalNamespaces = require('./src/design-systems/tpx-sk-subsitename-kebab/namespaces');
const TpxSubSkSitenamePascalPostCssConfig = require('./src/design-systems/tpx-sk-subsitename-kebab/postcss.config');

const docsNamespaces = require('./src/docs/namespaces');

String.prototype.replaceAll = function (search, replacement) {
  const target = this;
  return target.split(search).join(replacement);
};

function startup() {
  const startScript = process.env.npm_lifecycle_script;
  const startScriptParts = startScript.replaceAll('"', '').split(' ');
  let script = this.type === 'storybook' ? 'start-storybook' : 'webpack';
  let appConfigPath = path.resolve(this.absAppPath);
  let options = '';

  // Handle Wingsuit CLI scripts.
  if (startScriptParts[0] === 'ws') {
    if (this.type === 'storybook') {
      if (startScriptParts[1] === 'build') {
        const outputDir = `--output-dir ${this.distFolder}`;

        script = 'build-storybook';
        options = `${options} ${outputDir}`;
      }
      else {
        options = `${options} --no-version-updates`;
      }
    }
    else {
      if (this.configFile) {
        appConfigPath = path.resolve(appConfigPath, this.configFile);
      }

      if (startScriptParts[1] === 'dev') {
        options = `${options} --watch`;
      }
    }
  }

  const configOption = this.type === 'storybook' ? `--config-dir ${appConfigPath}` : `--config ${appConfigPath}`;

  return `${script} ${configOption} ${options}`;
}

module.exports = {
  presets: [
    '@wingsuit-designsystem/preset-scss',
    '@wingsuit-designsystem/preset-tailwind2',
    '@wingsuit-designsystem/preset-postcss8',
  ],
  apps: {
    'storybook-tpx-sk-sitename-kebab': {
      type: 'storybook',
      path: 'src/apps/storybook/tpx-sk-sitename-kebab/.storybook',
      cssMode: 'hot',
      distFolder: 'docroot/storybook/tpx-sk-sitename-kebab',
      dataFolder: 'src/data',
      assetBundleFolder: '',
      designSystem: 'tpx-sk-sitename-kebab',
      presets: [twing, storybook],
      postCssConfig: {
        options: {
          postcssOptions: TpxSkSitenamePascalPostCssConfig,
        },
      },
      componentTypes: {
        wingsuit_presenter: 'Wingsuit component (UI Pattern) with presentation template',
        plain: 'Twig only component',
        plain_presenter: 'Twig only component with presentation template',
        presenter: 'Presentation template',
      },
      startup,
      namespaces: TpxSkSitenamePascalNamespaces,
    },
    'storybook-tpx-sk-subsitename-kebab': {
      type: 'storybook',
      path: 'src/apps/storybook/tpx-sk-subsitename-kebab/.storybook',
      cssMode: 'hot',
      distFolder: 'docroot/storybook/tpx-sk-subsitename-kebab',
      dataFolder: 'src/data',
      assetBundleFolder: '',
      designSystem: 'tpx-sk-subsitename-kebab',
      presets: [twing, storybook],
      postCssConfig: {
        options: {
          postcssOptions: TpxSubSkSitenamePascalPostCssConfig,
        },
      },
      componentTypes: {
        wingsuit_presenter: 'Wingsuit component (UI Pattern) with presentation template',
        plain: 'Twig only component',
        plain_presenter: 'Twig only component with presentation template',
        presenter: 'Presentation template',
      },
      startup,
      namespaces: TpxSkSubSitenamePascalNamespaces,
    },
    'docs-tpx-sk-sitename-kebab': {
      type: 'storybook',
      path: 'src/docs/.storybook',
      cssMode: 'hot',
      distFolder: 'docroot/docs',
      dataFolder: 'src/data',
      assetBundleFolder: '',
      designSystem: 'tpx-sk-sitename-kebab',
      presets: [twing, storybook],
      postCssConfig: {
        options: {
          postcssOptions: TpxSkSitenamePascalPostCssConfig,
        },
      },
      componentTypes: {
        wingsuit_presenter: 'Wingsuit component (UI Pattern) with presentation template',
        plain: 'Twig only component',
        plain_presenter: 'Twig only component with presentation template',
        presenter: 'Presentation template',
      },
      startup,
      namespaces: docsNamespaces,
    },
    'drupal-tpx-sk-sitename-kebab': {
      type: 'drupal',
      path: 'src/themes/tpx_sk_sitename_snake',
      configFile: 'webpack.config.js',
      cssMode: 'extract',
      distFolder: 'docroot/wingsuit/tpx-sk-sitename-kebab',
      dataFolder: 'src/data',
      assetAtomicFolder: 'atomic',
      assetBundleFolder: '',
      designSystem: 'tpx-sk-sitename-kebab',
      presets: [drupal],
      startup,
    },
    'drupal-tpx-sk-subsitename-kebab': {
      type: 'drupal',
      path: 'src/themes/tpx_sk_subsitename_snake',
      configFile: 'webpack.config.js',
      cssMode: 'extract',
      distFolder: 'docroot/wingsuit/tpx-sk-subsitename-kebab',
      dataFolder: 'src/data',
      assetAtomicFolder: 'atomic',
      assetBundleFolder: '',
      designSystem: 'tpx-sk-subsitename-kebab',
      presets: [drupal],
      startup,
    },
  },
  designSystems: {
    'tpx-sk-sitename-kebab': {
      namespaces: TpxSkSitenamePascalNamespaces,
      path: 'src/design-systems/tpx-sk-sitename-kebab',
      patternFolder: 'patterns',
    },
    'tpx-sk-subsitename-kebab': {
      namespaces: TpxSkSubSitenamePascalNamespaces,
      path: 'src/design-systems/tpx-sk-subsitename-kebab',
      patternFolder: 'patterns',
    },
  },
  webpackFinal: function (appConfig, webpack) {
    const { designSystem } = appConfig;
    const designSystemPath = module.exports.designSystems[designSystem].path;
    const siloPath = 'config/silo';
    const configExportPath = appConfig.type === 'storybook' ? path.resolve(appConfig.path, '..', siloPath) : path.resolve(appConfig.path, siloPath);
    const tailwindDefault = path.resolve(''.concat(appConfig.absRootPath, '/tailwind.config'));
    const tailwindOverride = path.resolve(''.concat(appConfig.absDesignSystemPath, '/tailwind.config'));
    const tailwindFile = fs.existsSync(''.concat(tailwindOverride, '.js')) ? tailwindOverride : tailwindDefault;

    // Replace default tailwind config lookup from wingsuit.
    webpack.plugins.forEach(function (plugin, index) {
      const pluginName = plugin.hasOwnProperty('plugin') ? plugin.plugin.name : false;

      if (pluginName === 'Tailwind2JsonPlugin') {
        webpack.plugins[index] = new tailwind2Json['default'](
          path.resolve(tailwindFile),
          path.resolve(configExportPath, 'tailwind.json'),
        );
      }
    });

    // Add tailwind config generation for the design system in use.
    webpack.plugins.push(new tailwind2Json['default'](
      path.resolve(tailwindFile),
      path.resolve(designSystemPath, siloPath, 'tailwind.json'),
    ));

    // Prevent infinite loop in dev mode.
    if (appConfig.type === 'storybook') {
      webpack.plugins.push(new WatchIgnorePlugin([/.*\/silo\/.*\.json/]));
    }

    appConfig.parameters.svg = {
      sources: [],
    }
    appConfig.parameters.svg.sources.push({
      sourceFolder: 'icons',
      jsonFile: path.join(configExportPath, 'svgs.json'),
      spriteFilename: 'images/spritemap.svg',
    });

    // Return altered webpack config.
    return webpack;
  },
};
