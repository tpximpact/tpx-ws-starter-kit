const plugin = require('tailwindcss/plugin');

module.exports = plugin(({ addUtilities }) => {
  addUtilities({
    '.rotate-x-90': {
      transform: 'rotateX(90deg)',
    },
    '.rotate-x-180': {
      transform: 'rotateX(180deg)',
    },
    '.rotate-y-90': {
      transform: 'rotateY(90deg)',
    },
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  });
});
