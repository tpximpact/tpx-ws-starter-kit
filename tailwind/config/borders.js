module.exports = {
  theme: {
    extend: {
      borderRadius: (theme) => ({
        ...theme('spacing'),
        none: '0px',
        full: '9999px',
        sm: theme('spacing[0.5]'),
        md: theme('spacing[1.5]'),
        DEFAULT: theme('spacing.1'),
        lg: theme('spacing.2'),
        xl: theme('spacing.3'),
        '2xl': theme('spacing.4'),
        '3xl': theme('spacing.6'),
      }),
      borderWidth: {
        DEFAULT: '1px',
        0: '0px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      borderColor: (theme) => ({
        ...theme('colors'),
        DEFAULT: theme('colors.grey.400', 'currentColor', 'colors.transparent'),
      }),
      borderOpacity: (theme) => theme('opacity'),
      divideColor: (theme) => theme('borderColor'),
      divideOpacity: (theme) => theme('borderOpacity'),
      divideWidth: (theme) => theme('borderWidth'),
      outline: (theme) => ({
        DEFAULT: [`4px solid ${theme('colors.orange')}`, theme('spacing[0.5]')],
        none: ['0px solid transparent', '2px'],
        white: ['3px dotted white', '2px'],
        black: ['3px dotted black', '2px'],
        dashed: ['2px dashed currentColor', theme('spacing[0.5]')],
      }),
      ringWidth: {
        DEFAULT: '3px',
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      ringColor: (theme) => ({
        DEFAULT: theme('colors.blue.200', '#3b82f6'),
        ...theme('colors'),
      }),
      ringOpacity: (theme) => ({
        DEFAULT: '0.5',
        ...theme('opacity'),
      }),
      ringOffsetWidth: {
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      ringOffsetColor: (theme) => theme('colors'),
    },
  },
};
