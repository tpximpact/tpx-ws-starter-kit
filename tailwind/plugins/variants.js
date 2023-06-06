const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addVariant }) => {
  addVariant('hocus', ['&:hover', '&:focus-visible']);
  addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus-visible &']);
  addVariant('pseudos', ['&::before', '&::after']);
});
