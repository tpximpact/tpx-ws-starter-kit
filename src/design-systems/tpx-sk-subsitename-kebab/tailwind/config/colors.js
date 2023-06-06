const { brandColors } = require('../../../../../tailwind/config/_defaults');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: brandColors.orange,
        secondary: brandColors.grey,
        tertiary: brandColors.purple,
      },
    },
  },
};
