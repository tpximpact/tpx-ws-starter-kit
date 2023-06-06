const tailwindDefault = require('tailwindcss/defaultTheme');
const { rem } = require('polished');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');
const { baseFontSize } = require('./_defaults');

module.exports = {
  plugins: [
    typography, // <- this plugin provides the `.prose` class.
    lineClamp,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...tailwindDefault.fontFamily.sans],
        serif: ['TT Norms Pro', ...tailwindDefault.fontFamily.serif],
        'serif-cond': ['TT Norms Pro Cond', ...tailwindDefault.fontFamily.serif],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        xs: [rem(11, baseFontSize), { lineHeight: rem(19, baseFontSize) }],
        sm: [rem(14, baseFontSize), { lineHeight: rem(21, baseFontSize) }],
        base: [rem(16, baseFontSize), { lineHeight: rem(24, baseFontSize) }],
        md: [rem(18, baseFontSize), { lineHeight: rem(22, baseFontSize) }],
        lg: [rem(19, baseFontSize), { lineHeight: rem(26, baseFontSize) }],
        xl: [rem(20, baseFontSize), { lineHeight: rem(30, baseFontSize) }],
        '2xl': [rem(22, baseFontSize), { lineHeight: rem(28, baseFontSize) }],
        '3xl': [rem(24, baseFontSize), { lineHeight: rem(33, baseFontSize) }],
        '4xl': [rem(32, baseFontSize), { lineHeight: rem(40, baseFontSize) }],
        '5xl': [rem(40, baseFontSize), { lineHeight: rem(48, baseFontSize) }],
        '6xl': [rem(48, baseFontSize), { lineHeight: rem(62, baseFontSize) }],
        '7xl': [rem(64, baseFontSize), { lineHeight: rem(82, baseFontSize) }],
        '8xl': [rem(80, baseFontSize), { lineHeight: 1 }],
        '9xl': [rem(96, baseFontSize), { lineHeight: 1 }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
      },
      textColor: (theme) => theme('colors'),
      textOpacity: (theme) => theme('opacity'),
      textDecorationColor: (theme) => theme('colors'),
      textDecorationThickness: {
        auto: 'auto',
        'from-font': 'from-font',
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      textUnderlineOffset: {
        auto: 'auto',
        0: '0px',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      content: {
        DEFAULT: "''",
        none: 'none',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            // Generic styles.
            {
              color: theme('colors.grey.500'),

              p: {
                marginBottom: theme('spacing.4'),
              },
              strong: {
                fontWeight: theme('fontWeight.bold'),
              },
              blockquote: {
                fontStyle: 'italic',
                borderLeftWidth: '0.25rem',
                borderLeftColor: theme('colors.blue.200'),
                quotes: '"\\201C""\\201D""\\2018""\\2019"',
                marginTop: rem(32, 20),
                marginBottom: rem(32, 20),
                paddingLeft: rem(20, 20),
                p: {
                  ':first-of-type': {
                    '::before': {
                      content: 'open-quote',
                    },
                  },
                  ':last-of-type': {
                    '::after': {
                      content: 'close-quote',
                    },
                  },
                },
              },
              hr: {
                borderColor: theme('colors.grey.200'),
                borderTopWidth: 1,
                marginTop: theme('spacing.8'),
                marginBottom: theme('spacing.8'),
              },
              '> :first-child': {
                marginTop: '0',
              },
              '> :last-child': {
                marginBottom: '0',
              },
              small: {
                fontSize: theme('fontSize.xs'),
              },
            },
            // Headings.
            {
              'h1, h2, h3, h4, h5, h6': {
                color: theme('colors.black'),
                marginTop: theme('spacing.6'),
                marginBottom: theme('spacing.4'),
                '@screen lg': {
                  marginTop: theme('spacing.6'),
                  marginBottom: theme('spacing.6'),
                },
                '+ *': {
                  marginTop: '0',
                },
              },
            },
            // Links.
            {
              a: {
                '&:not(.a-button)': {
                  color: theme('colors.black'),
                  textDecoration: 'underline',
                  textUnderlineOffset: theme('spacing.1'),
                  fontStyle: 'normal',
                  transition: `all ${theme('transitionDuration.75')} ease-in-out`,
                  padding: `${theme('spacing[0.5]')} ${theme('spacing.1')}`,
                  borderRadius: theme('spacing.1'),
                  '&:hover,&:focus': {
                    backgroundColor: theme('colors.primary.DEFAULT'),
                  },
                },
              },
            },
            // Lists.
            {
              li: {
                marginBottom: theme('spacing.4'),
              },
              'ul, ol': {
                marginTop: theme('spacing.6'),
                marginBottom: theme('spacing.6'),
                '> li': {
                  position: 'relative',
                  paddingLeft: theme('spacing.6'),
                  '&::before': {
                    position: 'absolute',
                    left: theme('spacing.2'),
                    lineHeight: 'inherit',
                  },
                },
              },
              ol: {
                counterReset: 'list-counter',
                '> li': {
                  counterIncrement: 'list-counter',
                  '&::before': {
                    content: 'counter(list-counter) "."',
                  },
                },
              },
              ul: {
                '> li': {
                  '&::before': {
                    content: '"•"',
                  },
                },
              },
            },
            // Media.
            {
              img: {
                marginTop: rem(16, baseFontSize),
                marginBottom: rem(16, baseFontSize),
              },
              video: {
                marginTop: rem(16, baseFontSize),
                marginBottom: rem(16, baseFontSize),
              },
              figure: {
                marginBottom: rem(16, baseFontSize),
                '> *': {
                  marginTop: '0',
                  marginBottom: '0',
                },
                figcaption: {
                  color: theme('colors.white'),
                  fontSize: theme('fontSize.base[0]'),
                },
              },
              iframe: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px',
              },
            },
            // Code.
            {
              code: {
                color: theme('colors.grey.100'),
                backgroundColor: theme('colors.grey.600'),
                padding: `${theme('spacing[0.5]')} ${theme('spacing.1')}`,
                fontSize: rem(14, baseFontSize),
                '&::before': {
                  content: '"`"',
                },
                '&::after': {
                  content: '"`"',
                },
              },
              'a code': {
                color: theme('colors.grey.100'),
                backgroundColor: theme('colors.grey.600'),
              },
              pre: {
                color: theme('colors.grey.100'),
                backgroundColor: theme('colors.grey.600'),
                overflowX: 'auto',
                fontSize: rem(14, baseFontSize),
                marginTop: rem(24, 14),
                marginBottom: rem(24, 14),
                borderRadius: rem(6),
                paddingTop: rem(12, 14),
                paddingRight: rem(16, 14),
                paddingBottom: rem(12, 14),
                paddingLeft: rem(16, 14),
              },
              'pre code': {
                backgroundColor: 'transparent',
                borderWidth: '0',
                borderRadius: '0',
                padding: '0',
                color: 'inherit',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                lineHeight: 'inherit',
                '&::before': {
                  content: '""',
                },
                '&::after': {
                  content: '""',
                },
              },
            },
            // Tables.
            {
              table: {
                width: '100% !important',
                tableLayout: 'auto',
                textAlign: 'left',
                marginTop: rem(32, baseFontSize),
                marginBottom: rem(32, baseFontSize),
              },
              thead: {
                color: theme('colors.white'),
                backgroundColor: theme('colors.blue.300'),
              },
              'thead th': {
                fontWeight: 'normal',
                verticalAlign: 'bottom',
                padding: rem(16, baseFontSize),
              },
              'tbody tr:nth-of-type(2n)': {
                backgroundColor: theme('colors.blue.100'),
              },
              'tbody tr:nth-of-type(2n-1)': {
                backgroundColor: theme('colors.white'),
              },
              'tbody td': {
                verticalAlign: 'top',
                padding: rem(16, baseFontSize),
              },
            },
          ],
        },
        sm: {
          css: [
            {
              fontSize: theme('fontSize.sm'),
              '@screen lg': {
                fontSize: theme('fontSize.base'),
              },
            },
          ],
        },
        lg: {
          css: [
            {
              fontSize: theme('fontSize.xl'),
              '@screen lg': {
                fontSize: theme('fontSize.3xl'),
              },
            },
          ],
        },
      }),
    },
  },
};
