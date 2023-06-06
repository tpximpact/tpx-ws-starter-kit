import 'regenerator-runtime/runtime';
import Alpine from 'alpinejs';
import { breakpoint } from '../../../vendorjs/breakpoint-helper.vendor';

export const menuItem = () => {
  Alpine.data('menuItem', (hasSubMenu = false) => ({
    hasSubMenu,
    subMenuIsOpen: false,
    init() {
      this.hasSubMenu = hasSubMenu;
    },
    toggleSubMenu() {
      if (!breakpoint.isDesktopXl) {
        this.$event.preventDefault();
      }

      this.subMenuIsOpen = !this.subMenuIsOpen;
    },
    handleClickSubMenuButton() {
      const hasHref = this.$el.getAttribute('href') !== null;
      const isDropdownButton = this.$el.getAttribute('x-ref') === 'subMenuButton';
      const notLinkAndHasSubMenu = this.hasSubMenu && (!hasHref || !breakpoint.isDesktopXl);

      if (notLinkAndHasSubMenu || isDropdownButton) {
        this.toggleSubMenu();
      }
    },
    bindToggleSubMenu: {
      // eslint-disable-next-line func-names
      '@click': function () {
        this.handleClickSubMenuButton();
      },
    },
    subMenu: {
      // eslint-disable-next-line func-names
      'x-show': function () {
        return this.subMenuIsOpen;
      },
      // eslint-disable-next-line func-names
      'x-transition:enter-start': function () {
        return 'opacity-0 scale-115 -translate-y-1/2 bg-grey-100';
      },
      // eslint-disable-next-line func-names
      'x-transition:enter-end': function () {
        return 'opacity-100';
      },
      // eslint-disable-next-line func-names
      'x-transition:leave-start': function () {
        return 'opacity-100 bg-grey-100';
      },
      // eslint-disable-next-line func-names
      'x-transition:leave-end': function () {
        return 'opacity-0 scale-115 -translate-y-3/4';
      },
    },
    bindMenuItemPrimary: {
      // eslint-disable-next-line func-names
      '@click': function () {
        // Ignore logic for menu mobile view.
        if (breakpoint.isDesktopXl) {
          this.subMenuIsOpen = this.subMenuIsOpen && breakpoint.isDesktopXl;
        }
      },
      // eslint-disable-next-line func-names
      '@click.away': function () {
        if (this.subMenuIsOpen && breakpoint.isDesktopXl) {
          this.subMenuIsOpen = false;
        }
      },
    },
    bindMenuItemPrimaryLink: {
      // eslint-disable-next-line func-names
      '@click': function () {
        //this.handleClickSubMenuButton();
        // Ignore logic for menu mobile view.
        if (breakpoint.isDesktopXl) {
          this.subMenuIsOpen = !this.subMenuIsOpen && breakpoint.isDesktopXl;
        }
      },
      // eslint-disable-next-line func-names
      '@keydown.escape': function () {
        this.$refs.subMenuButton.focus();
      },
      // eslint-disable-next-line func-names
      '@keydown.escape.window': function () {
        this.subMenuIsOpen = false;
      },
    },
  }));
};
