import { RenderTwig } from '@wingsuit-designsystem/pattern-react';
import React from 'react';

export default {
  title: 'Pages/Page',
  parameters: {
    layout: 'fullscreen',
  },
};

const template = require('./page.twig');

export const Page = () => {
  return <RenderTwig data={template} />;
};
