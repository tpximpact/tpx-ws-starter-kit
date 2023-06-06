import './index';

const patternDefinition = require('./menu-item.wingsuit.yml');

export const wingsuit = {
  patternDefinition,
  parameters: {
    rootClasses: ['xl:relative', 'text-white'],
    backgrounds: {
      default: 'Grey 600',
    },
  },
};
