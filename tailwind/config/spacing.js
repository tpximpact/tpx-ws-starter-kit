const { rem } = require('polished');
const { baseFontSize } = require('./typography');

module.exports = {
  theme: {
    extend: {
      spacing: {
        px: '1px',
        0: '0px',
        0.5: rem(2, baseFontSize),
        1: rem(4, baseFontSize),
        1.5: rem(6, baseFontSize),
        2: rem(8, baseFontSize),
        2.5: rem(10, baseFontSize),
        3: rem(12, baseFontSize),
        3.5: rem(14, baseFontSize),
        4: rem(16, baseFontSize),
        5: rem(20, baseFontSize),
        6: rem(24, baseFontSize),
        7: rem(28, baseFontSize),
        8: rem(32, baseFontSize),
        9: rem(36, baseFontSize),
        10: rem(40, baseFontSize),
        11: rem(44, baseFontSize),
        12: rem(48, baseFontSize),
        14: rem(56, baseFontSize),
        15: rem(60, baseFontSize),
        16: rem(64, baseFontSize),
        20: rem(80, baseFontSize),
        24: rem(96, baseFontSize),
        28: rem(112, baseFontSize),
        32: rem(128, baseFontSize),
        36: rem(144, baseFontSize),
        40: rem(160, baseFontSize),
        44: rem(176, baseFontSize),
        46: rem(180, baseFontSize),
        48: rem(192, baseFontSize),
        52: rem(208, baseFontSize),
        56: rem(224, baseFontSize),
        60: rem(256, baseFontSize),
        64: rem(272, baseFontSize),
        72: rem(288, baseFontSize),
        80: rem(320, baseFontSize),
        96: rem(384, baseFontSize),
        video: '56.25%',
        '16by9': `${(9 / 16) * 100}%`,
        full: '100%',
      },
      padding: (theme) => ({
        ...theme('spacing'),
        ...theme('width'),
      }),
      margin: (theme) => ({
        auto: 'auto',
        ...theme('spacing'),
        ...theme('width'),
      }),
      space: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
};
