const replace = require('replace-in-file');

require('dotenv').config();

const dryRun = !!process.env.DRY_RUN;
const options = {
  glob: {
    dot: true, // Include file names starting with a dot
  },
  files: [process.env.DIRECTORY, '.ddev/**'],
  ignore: [
    '.env*',
    'node_modules/**',
    'docroot/**', // Not committed to repo so no need to alter anything in here.
    'starterkit-setup/**',
    'vendor',
  ],
  from: new RegExp(process.env.STARTERKIT_FIND, 'ig'),
  to: process.env.STARTERKIT_REPLACEMENT,
  dry: dryRun,
};

if (dryRun) {
  replace
    .sync(options)
    .filter((result) => result.hasChanged)
    .map((result) => {
      return console.log(result.file);
    });
}

module.exports = options;
