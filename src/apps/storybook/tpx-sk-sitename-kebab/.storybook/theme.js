// storybook/theme.js
import { create } from '@storybook/theming';
import logo from './logo.svg';

const { tailwind } = require('../config/silo/tailwind.json');

const { colors } = tailwind.theme;

export default create({
  base: 'light',

  colorPrimary: colors.primary.DEFAULT,
  colorSecondary: colors.secondary.DEFAULT,

  // UI
  //appBg: '#EEE',
  //appContentBg: '#FFF',
  //appBorderColor: colors.grey.DEFAULT,
  //appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: colors.black,
  textInverseColor: colors.white,

  // Toolbar default and active colors
  //barTextColor: colors.white,
  //barSelectedColor: colors.black,
  //barBg: colors.primary.DEFAULT,

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.grey.DEFAULT,
  inputTextColor: colors.black,
  inputBorderRadius: 0,

  brandTitle: 'Storybook - TPX_SK_SITENAME',
  brandUrl: '/',
  brandImage: logo,
});
