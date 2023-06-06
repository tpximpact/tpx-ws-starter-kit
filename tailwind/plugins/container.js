const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    '.container': {
      marginInline: 'auto',
      paddingInline: theme('spacing.4'),
      transition: 'all 250ms ease-out',
      transitionProperty: 'padding, width, max-width',

      // Breakpoints
      '@screen sm': {
        paddingInline: theme('spacing.10'),
      },
      '@screen md': {
        paddingInline: theme('spacing.12'),
      },
      '@screen lg': {
        paddingInline: theme('spacing.14'),
      },
      '@screen xl': {
        paddingInline: theme('spacing.20'),
      },
      '@screen 2xl': {
        maxWidth: theme('screens.2xl'),
        paddingInline: theme('spacing.24'),
      },
    },
    '.page-container': {
      marginInline: 'auto',
      paddingInline: theme('spacing.2'),
      transition: 'all 250ms ease-out',
      transitionProperty: 'padding, width, max-width',

      // Breakpoints
      '@screen sm': {
        paddingInline: theme('spacing.6'),
      },
      '@screen lg': {
        maxWidth: '1440px',
        paddingInline: theme('spacing.2'),
      },

      // Only the outer-most page container should add padding.
      // This allows safe usage of the `.page-container` class
      // as part of pattern templates.
      '.page-container': {
        paddingInline: 0,
      },
    },
  });
});
