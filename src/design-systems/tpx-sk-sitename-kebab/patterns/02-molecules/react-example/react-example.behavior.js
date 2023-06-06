import 'regenerator-runtime/runtime';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactExample from './ReactExample';

Drupal.behaviors.ReactExample = {
  attach(context, settings) {
    const reactExamples = context.querySelectorAll('[react-example]');
    reactExamples.forEach((reactExample) => {
      const root = createRoot(reactExample);
      const element = <ReactExample />; // <-- CMS values could be passed in through here too as props.
      root.render(element);
    });
  },
};
