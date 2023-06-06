module.exports = {
  theme: {
    extend: {
      cursor: {
        auto: 'auto',
        default: 'default',
        pointer: 'pointer',
        wait: 'wait',
        text: 'text',
        move: 'move',
        help: 'help',
        'not-allowed': 'not-allowed',
        grab: 'grab',
        grabbing: 'grabbing',
      },
      caretColor: (theme) => theme('colors'),
    },
  },
};
