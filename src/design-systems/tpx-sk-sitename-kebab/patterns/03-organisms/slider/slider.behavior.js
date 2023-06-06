import 'regenerator-runtime/runtime';
import Alpine from 'alpinejs';
import Splide from '@splidejs/splide';
import { Video } from '@splidejs/splide-extension-video';

export const sliderBehavior = () => {
  Alpine.data('sliderBehavior', (sliderColor = 'blue') => ({
    $slider: false,
    $sliderControls: false,
    $subNav: false,
    slider: false,
    $autoplayToggleButton: false,
    sliderColor,
    slidesContainer: false,
    currentIndex: 0,
    autoplay: 0,
    autoplayToggle: 0,
    loop: 0,
    rewind: 1,
    pagination: 0,
    interval: 5000,
    speed: 1000,
    pauseOnInput: false,
    isPaused: false,
    easing: 'cubic-bezier(.75,.01,.25,1)',
    isFirstStep: true,
    isLastStep: false,
    prevDisabled: true,
    nextDisabled: false,
    videoIsPlaying: false,
    autoplayWasEnabled: false,
    Autoplay: false,
    init() {
      this.$slider = this.$el;
      this.setOptionOverrides();

      this.$sliderControls = this.$slider.querySelector('.o-slider__controls');
      this.$subNav = document.querySelector('.m-sub-navigation');

      this.initSteps();
      this.initSlider();
    },
    setOptionOverrides() {
      const booleanOptions = [
        { option: 'autoplay', attr: 'data-autoplay' },
        { option: 'autoplayToggle', attr: 'data-autoplay-toggle' },
        { option: 'pauseOnInput', attr: 'data-pause-on-input' },
        { option: 'loop', attr: 'data-loop' },
        { option: 'rewind', attr: 'data-rewind' },
        { option: 'pagination', attr: 'data-pagination' },
      ];

      booleanOptions.forEach(({ option, attr }) => {
        this[option] =
          this.$el.getAttribute(attr) !== null
            ? !!Number(this.$el.getAttribute(attr))
            : this[option];
      });

      const valueOptions = [
        { option: 'interval', attr: 'data-interval' },
        { option: 'speed', attr: 'data-speed' },
        { option: 'easing', attr: 'data-easing' },
      ];

      valueOptions.forEach(({ option, attr }) => {
        this[option] =
          this.$el.getAttribute(attr) !== null ? this.$el.getAttribute(attr) : this[option];
      });
    },
    initSteps() {
      this.slidesContainer = this.$slider.querySelector('.o-slider__slides');
    },
    initSlider() {
      const sliderSteps = this.$slider.querySelector('.o-slider__slider');

      this.currentIndex = 0;
      this.slider = new Splide(sliderSteps, {
        type: this.loop && !this.rewind ? 'loop' : 'slide',
        rewind: this.rewind,
        rewindByDrag: this.rewind,
        speed: this.speed,
        rewindSpeed: this.speed,
        interval: this.interval,
        arrows: false,
        autoplay: this.autoplay,
        pauseOnHover: this.pauseOnInput,
        pauseOnFocus: this.pauseOnInput,
        pagination: this.pagination,
        perMove: 1,
        drag: true,
        autoWidth: true,
        slideFocus: false,
        easing: this.easing,
        classes: {
          pagination: `o-slider__pagination o-slider__pagination--${this.sliderColor}`,
          page: `splide__pagination__page o-slider__pagination-button`,
        },
        video: {
          loop: false,
          mute: false,
          autoplay: false,
          playerOptions: {},
        },
      });

      this.sliderEvents();
      this.slider.mount({ Video });
    },
    sliderEvents() {
      this.slider.on('mounted move', (index) => {
        this.currentIndex = index || 0;
        this.isFirstStep = this.currentIndex === 0;
        this.isLastStep = this.currentIndex === this.slider.length - 1;
        this.prevDisabled = this.isFirstStep && !this.loop && !this.rewind;
        this.nextDisabled = this.isLastStep && !this.loop && !this.rewind;
      });

      this.slider.on('mounted', () => {
        if (this.autoplay && !this.Autoplay) {
          const { Components } = this.slider;
          const { Autoplay } = Components;
          this.Autoplay = Autoplay;
          this.autoplayWasEnabled = this.autoplay;
        }

        const $pagination = this.$slider.querySelector('.o-slider__pagination');

        if ($pagination && this.$sliderControls) {
          this.$sliderControls.appendChild($pagination);
        }
      });

      this.slider.on('pagination:mounted', (data) => {
        data.items.forEach((item) => {
          item.li.classList.add('splide__pagination__item', 'o-slider__pagination-item');
        });
      });

      this.slider.on('pagination:updated', (data) => {
        data.items.forEach((item) => {
          if (this.currentIndex === item.page) {
            item.li.classList.add('is-active');
          } else {
            item.li.classList.remove('is-active');
          }
        });
      });

      this.slider.on('autoplay:play', () => {
        if (this.$autoplayToggleButton) {
          this.$autoplayToggleButton.setAttribute('title', 'Pause');
          this.$autoplayToggleButton.setAttribute('aria-label', 'Pause autoplay');
        }
      });

      this.slider.on('autoplay:pause', () => {
        if (this.$autoplayToggleButton) {
          this.$autoplayToggleButton.setAttribute('title', 'Play');
          this.$autoplayToggleButton.setAttribute('aria-label', 'Start autoplay');
        }
      });

      this.slider.on('video:play', () => {
        this.videoIsPlaying = true;

        if (this.Autoplay) {
          this.autoplayWasEnabled = !this.isPaused;
          this.Autoplay.pause();
        }
      });

      this.slider.on('video:pause', () => {
        this.videoIsPlaying = false;

        if (this.Autoplay && this.autoplayWasEnabled) {
          this.Autoplay.play();
        }
      });
    },
    toggleAutoplay() {
      if (this.Autoplay) {
        if (this.isPaused) {
          this.Autoplay.play();
        } else {
          this.Autoplay.pause();
        }

        this.isPaused = this.Autoplay.isPaused();
      }
    },
    prevStep: {
      // eslint-disable-next-line func-names
      '@click.prevent': function () {
        this.slider.go('<');
      },
    },
    nextStep: {
      // eslint-disable-next-line func-names
      '@click.prevent': function () {
        this.slider.go('>');
      },
    },
    bindToggleAutoplay: {
      // eslint-disable-next-line func-names
      'x-init': function () {
        this.$autoplayToggleButton = this.$el;
      },
      // eslint-disable-next-line func-names
      '@click.prevent': function () {
        this.toggleAutoplay();
      },
    },
  }));
};
