module.exports = {
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      flex: {
        1: '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
      },
      flexGrow: {
        0: '0',
        DEFAULT: '1',
      },
      flexShrink: {
        0: '0',
        DEFAULT: '1',
      },
      gap: (theme) => theme('spacing'),
      order: {
        first: '-9999',
        last: '9999',
        none: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
    },
  },
};
