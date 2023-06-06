import { RenderTwig } from '@wingsuit-designsystem/pattern-react';
import React from 'react';

export default {
  title: 'Pages/Homepage',
  parameters: {
    layout: 'fullscreen',
  },
};

const template = require('./homepage.twig');

export const Homepage = () => {
  return <RenderTwig data={template} />;
};
