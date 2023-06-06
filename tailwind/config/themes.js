const { themeVariants } = require('tailwindcss-theme-variants');

module.exports = {
  plugins: [
    // See: https://github.com/JNavith/tailwindcss-theme-variants.
    themeVariants({
      baseSelector: '', // `:root` by default when using a class as theme selector.
      themes: {
        dark: {
          selector: '[data-theme="dark"]',
        },
      },
    }),
  ],
};
