import 'regenerator-runtime/runtime';
import Alpine from 'alpinejs';
import Choices from 'choices.js';

export const selectBehavior = () => {
  Alpine.data('selectBehavior', () => ({
    $selectContainer: false,
    choiceSelect: false,
    init() {
      this.$selectContainer = this.$el;

      this.initSelect();
    },
    initSelect() {
      const selectElements = this.$selectContainer.querySelector('select');
      this.choicesSelect = new Choices(selectElements, {
        searchEnabled: false,
      });
    },
  }));
};
