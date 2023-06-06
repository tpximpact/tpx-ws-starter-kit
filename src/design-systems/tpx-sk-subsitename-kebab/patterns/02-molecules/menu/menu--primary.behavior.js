import 'regenerator-runtime/runtime';
import Alpine from 'alpinejs';
import { breakpoint } from '../../../vendorjs/breakpoint-helper.vendor';

export const menuPrimary = () => {
  Alpine.data('menuPrimary', () => ({
    menuIsOpen: false,
    init() {
      this.menuIsOpen = breakpoint.isDesktopXl;
      this.$watch('menuIsOpen', this.menuToggled);
    },
    menuToggled(menuIsOpen) {
      if (menuIsOpen && !breakpoint.isDesktopXl) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    },
    bindMenuPrimary: {
      // eslint-disable-next-line func-names
      '@resize.window.stop.debounce': function () {
        this.menuIsOpen = breakpoint.isDesktopXl;
      },
      // eslint-disable-next-line func-names
      '@click.outside': function () {
        this.menuIsOpen = breakpoint.isDesktopXl;
      },
    },
  }));
};
