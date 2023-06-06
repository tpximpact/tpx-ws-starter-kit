/**
 * Documentation namespaces.
 */

const path = require('path');

const wsdesignsystem = path.resolve(__dirname, '../design-systems/site');
const wspatterns = path.resolve(wsdesignsystem, 'patterns');
const docs = path.resolve(__dirname);

module.exports = {
  wsdesignsystem,
  wspatterns,
  docs,
  'docs-common': path.resolve(docs, 'common'),
  'docs-tpx-sk-sitename-kebab': path.resolve(docs, 'tpx-sk-sitename-kebab'),
  'docs-tpx-sk-subsitename-kebab': path.resolve(docs, 'tpx-sk-subsitename-kebab'),
  tokens: path.resolve(wsdesignsystem, 'tokens'),
  clientside: path.resolve(wsdesignsystem, 'clientside'),
  protons: path.resolve(wspatterns, '00-protons'),
  atoms: path.resolve(wspatterns, '01-atoms'),
  molecules: path.resolve(wspatterns, '02-molecules'),
  organisms: path.resolve(wspatterns, '03-organisms'),
  templates: path.resolve(wspatterns, '04-templates'),
  pages: path.resolve(wspatterns, '05-pages'),
};
