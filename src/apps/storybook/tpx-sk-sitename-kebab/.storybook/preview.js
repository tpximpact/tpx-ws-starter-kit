import { configure, initJsBehaviors } from '@wingsuit-designsystem/storybook';
import {addDecorator, addParameters} from '@storybook/react';
import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemes } from 'storybook-addon-themes/react';
import { brandColors } from '../../../../../tailwind/config/_defaults';

const namespaces = require('../../../../design-systems/tpx-sk-sitename-kebab/namespaces');
const { tailwind } = require('../config/silo/tailwind.json');

const { colors } = tailwind.theme;

const backgroundColors = Object.keys(colors).map((key) => {
  const color = typeof colors[key] === 'string' ? colors[key] : colors[key].DEFAULT || false;
  const name = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;

  return {
    name,
    value: color,
  };
});

initJsBehaviors('Drupal');

addParameters({
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Welcome',
        'Docs',
        [
          'Getting started',
          'Composing patterns',
          'Pattern definition',
          ['Overview', 'Fields', 'Settings', 'Variants', 'Configuration'],
        ],
        'Tokens',
        ['Colours', 'Typography', 'Scales'],
        'Atoms',
        'Molecules',
        'Organisms',
        'Templates',
        'Pages',
      ],
      locales: 'en-UK',
    },
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
  backgrounds: {
    grid: {
      disable: true,
    },
    values: backgroundColors,
  },
  themes: {
    // default: '',
    list: [
      { name: 'Dark', class: 'dark', color: brandColors.grey['700'] },
    ],
    Decorator: (props) => {
      const { children, theme } = props;
      return (
        <div data-theme={theme?.class}>
          {children}
        </div>
      );
    },
  },
});

addDecorator(withThemes);

addDecorator((Story, {parameters}) => {
  const rootClasses = parameters?.rootClasses?.join(' ') || '';
  const rootStyle = parameters?.rootStyle || {};

  return (
    <div className={rootClasses} style={rootStyle}>
      <Story/>
    </div>
  );
});

configure(
  module,
  [
    // require.context('docs', true, /\.stories\.(js|md)?x$/), // Include all documentation.
    require.context('docs-common', true, /\.stories\.(js|md)?x$/),
    require.context('docs-tpx-sk-sitename-kebab', true, /\.stories\.(js|md)?x$/),
    require.context('wspatterns', true, /\.stories\.(js|md)?x$/),
    require.context('../patterns', true, /\.stories\.(js|md)?x$/),
  ],
  require.context('./config', false, /\.(json|ya?ml)$/),
  require.context('wspatterns', true, /\.twig$/),
  namespaces
);
