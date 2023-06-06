// .storybook/manager.js

import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  theme,
  showToolbar: false,
  showNav: true,
  showPanel: false,
  enableShortcuts: false,
});
