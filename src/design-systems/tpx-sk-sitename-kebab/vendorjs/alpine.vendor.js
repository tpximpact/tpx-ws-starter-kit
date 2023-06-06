import 'regenerator-runtime/runtime';
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';
import { header } from '../patterns/03-organisms/header/header';
import { menuPrimary } from '../patterns/02-molecules/menu/menu--primary.behavior';
import { menuItem } from '../patterns/01-atoms/menu-item/menu-item.behavior';
import { sliderBehavior } from '../patterns/03-organisms/slider/slider.behavior';
import { cardAccessibilityWrap } from '../patterns/02-molecules/card/card.behavior';

Alpine.plugin(intersect);
Alpine.plugin(focus);

Drupal.behaviors.alpinejs = {
  isStarted: false,

  attach() {
    this.registerEvents();
    this.start();
  },

  /**
   * Register custom Alpine data functions.
   */
  alpineData() {
    header();
    menuPrimary();
    menuItem();
    sliderBehavior();
    cardAccessibilityWrap();
  },

  start() {
    this.alpineData();

    if (this.isStarted === false) {
      Alpine.start();
      window.Alpine = Alpine;
    }
  },

  registerEvents() {
    document.addEventListener('alpine:initialized', () => {
      if (this.isStarted === false) {
        this.isStarted = true;
      }
    });
  },
};
