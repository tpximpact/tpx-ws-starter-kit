const { brandColors } = require('./_defaults');

module.exports = {
  theme: {
    extend: {
      colors: {
        ...brandColors,
        black: '#181817',
        white: '#FEFDFD',
        transparent: 'transparent',
        current: 'currentColor',
        inherit: 'inherit',
        primary: brandColors.purple,
        secondary: brandColors.grey,
        tertiary: brandColors.blue,
        error: brandColors.rose['600'],
        warning: brandColors.yellow['500'],
        success: brandColors.green['500'],
      },
    },
  },
};
