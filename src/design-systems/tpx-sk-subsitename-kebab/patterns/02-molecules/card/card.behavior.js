import 'regenerator-runtime/runtime';
import Alpine from 'alpinejs';

export const cardAccessibilityWrap = () => {
  Alpine.data('cardAccessibilityWrap', () => ({
    card: false,
    cardLink: '',
    cardUrl: '',
    init() {
      this.card = this.$el;
      this.cardLink = this.card.querySelector('.m-card__link');
      this.cardUrl = this.cardLink.getAttribute('href');
      this.makeCardAccessible();
    },
    makeCardAccessible() {
      if (this.cardLink) {
        this.card.classList.add('m-card--hover');
      }
    },
    bindCard: {
      // eslint-disable-next-line func-names
      '@click.prevent': function () {
        if (this.cardLink) {
          window.location.href = this.cardUrl;
        }
      },
    },
    bindCardLink: {
      // eslint-disable-next-line func-names
      '@focus': function () {
        if (this.cardLink) {
          this.card.classList.add('m-card--focused');
        }
      },
      // eslint-disable-next-line func-names
      '@blur': function () {
        if (this.cardLink) {
          this.card.classList.remove('m-card--focused');
        }
      },
    },
  }));
};
