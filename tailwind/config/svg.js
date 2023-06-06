module.exports = {
  theme: {
    extend: {
      fill: (theme) => ({
        current: 'currentColor',
        ...theme('colors'),
      }),
      stroke: {
        current: 'currentColor',
      },
      strokeWidth: {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
      },
    },
  },
};
