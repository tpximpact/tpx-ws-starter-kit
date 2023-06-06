import 'regenerator-runtime/runtime';

/**
 * Ignores links similarly to Drupal.
 */
export const preventNoLink = () => {
  const links = document.querySelectorAll('[href="<nolink>"], [href="nolink"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => e.preventDefault());
  });
};

Drupal.behaviors.basejs = {
  attach() {
    preventNoLink();
    this.registerEvents();
  },

  registerEvents() {},
};
