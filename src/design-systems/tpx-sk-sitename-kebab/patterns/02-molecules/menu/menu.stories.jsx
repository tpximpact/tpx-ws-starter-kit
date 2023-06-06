import './index';

const patternDefinition = require('./menu.wingsuit.yml');

export const wingsuit = {
  patternDefinition,
  parameters: {
    rootClasses: ['xl:relative', 'text-white'],
    backgrounds: {
      default: 'Grey 600',
    },
  },
};
