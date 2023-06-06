import 'regenerator-runtime/runtime';
import Alpine from 'alpinejs';
import { breakpoint } from '../../../vendorjs/breakpoint-helper.vendor';

export const header = () => {
  Alpine.data('header', () => ({
    loaded: false,
    $header: false,
    $headerPlaceholder: false,
    headerHeight: 0,
    headerVisible: true,
    stickyHeader: true,
    slimHeader: false,
    scrollStart: -1,
    scrollPosition: 0,
    scrollDirection: undefined,
    init() {
      this.$header = this.$el;

      this.$nextTick(() => {
        this.scrollPosition = window.scrollY + 10;

        this.createHeaderPlaceholder();
        this.loaded = true;
      });
    },
    createHeaderPlaceholder() {
      const placeholderClassName = 'o-header__placeholder';
      const headerParent = this.$header.parentElement;

      if (this.$headerPlaceholder) {
        this.$headerPlaceholder.remove();
      }

      this.headerHeight = this.$header.offsetHeight;
      this.$headerPlaceholder = document.createElement('div');
      this.$headerPlaceholder.classList.add(placeholderClassName);
      this.$headerPlaceholder.style.height = `${this.headerHeight}px`;
      headerParent.insertBefore(this.$headerPlaceholder, this.$header);
    },
    handleScrollDirection() {
      this.scrollDirection = this.scrollPosition < window.scrollY;
      this.scrollPosition = window.scrollY;
    },
    handleSticky() {
      this.stickyHeader = window.scrollY > this.scrollStart;
    },
    handleSlim() {
      if (breakpoint.isDesktopXl) {
        this.slimHeader = window.scrollY > this.headerHeight / 2;
      }
    },
    handleShowHide() {
      if (this.scrollPosition > this.headerHeight) {
        this.headerVisible = !this.scrollDirection;
      }
    },
    bindHeader: {
      // eslint-disable-next-line func-names
      ':class': function () {
        return {
          'o-header--fixed': this.stickyHeader,
          'o-header--slim': this.slimHeader,
          'o-header--hidden': !this.headerVisible,
        };
      },
      // eslint-disable-next-line func-names
      '@scroll.window': function () {
        if (this.loaded) {
          this.handleScrollDirection();
          this.handleSticky();
          this.handleSlim();
          this.handleShowHide();
        }
      },
      // eslint-disable-next-line func-names
      '@resize.window.debounce': function () {
        if (this.loaded) {
          this.createHeaderPlaceholder();
          this.handleSlim();
          this.handleShowHide();
        }
      },
    },
  }));
};
