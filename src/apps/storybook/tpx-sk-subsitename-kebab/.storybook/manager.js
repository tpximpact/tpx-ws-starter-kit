// .storybook/manager.js

import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  theme,
  sidebar: {
    collapsedRoots: ['docs', 'tokens', 'utilities'],
  },
  showToolbar: true,
  showNav: true,
  showPanel: true,
  enableShortcuts: true,
  panelPosition: 'right',
});
