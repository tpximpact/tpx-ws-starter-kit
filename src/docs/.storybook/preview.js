import { configure, initJsBehaviors } from '@wingsuit-designsystem/storybook';
import { addParameters } from '@storybook/react';
import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const namespaces = require('../../docs/namespaces');
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
});

export const decorators = [
  (Story, { parameters }) => {
    return (
      <div style={parameters.style || { position: 'relative' }}>
        <Story />
      </div>
    );
  },
];

configure(
  module,
  [
    require.context('docs', true, /\.stories\.(js|md)?x$/),
  ],
  require.context('./config', false, /\.(json|ya?ml)$/),
  require.context('wspatterns', true, /\.twig$/),
  namespaces
);
