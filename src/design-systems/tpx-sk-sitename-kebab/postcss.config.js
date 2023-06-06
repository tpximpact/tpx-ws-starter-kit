const tailwindcss = require('tailwindcss');
const nested = require('postcss-nested');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const tailwindConfig = require('./tailwind.config');

module.exports = {
  plugins: [
    tailwindcss(tailwindConfig),
    nested,
    postcssImport,
    autoprefixer,
  ],
};
