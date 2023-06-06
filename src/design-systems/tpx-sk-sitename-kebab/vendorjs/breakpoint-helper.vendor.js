import 'regenerator-runtime/runtime';
import breakpointHelper from 'breakpoint-helper';

const { tailwind } = require('../config/silo/tailwind.json');

const { screens } = tailwind.theme;
const bph = breakpointHelper(screens);

const breakpointDefaults = {
  isMobile: bph.isMatching('sm', true),
  isTablet: bph.isMatching(['sm', 'lg']),
  isTouch: bph.isMatching('lg', true),
  isDesktop: bph.isMatching('lg'),
  isDesktopXl: bph.isMatching('xl'),
};

window.Breakpoint = breakpointDefaults;
export const breakpoint = breakpointDefaults;

const breakpointStatus = (e, name) => {
  const { matches } = e;
  const capitalizedName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  window.Breakpoint[`is${capitalizedName}`] = matches;
  breakpoint[`is${capitalizedName}`] = matches;
  return matches;
};

const isMobile = bph.listen(
  {
    name: 'sm',
    useMax: true,
    immediate: true,
  },
  (e) => breakpointStatus(e, 'mobile')
);

const isTablet = bph.listen(
  {
    name: ['sm', 'lg'],
    useMax: false,
    immediate: true,
  },
  (e) => breakpointStatus(e, 'tablet')
);

const isTouch = bph.listen(
  {
    name: 'lg',
    useMax: true,
    immediate: true,
  },
  (e) => breakpointStatus(e, 'touch')
);

const isDesktop = bph.listen(
  {
    name: 'lg',
    useMax: false,
    immediate: true,
  },
  (e) => breakpointStatus(e, 'desktop')
);

const isDesktopXl = bph.listen(
  {
    name: 'xl',
    useMax: false,
    immediate: true,
  },
  (e) => breakpointStatus(e, 'desktopXl')
);

export const BreakpointHelper = {
  ...bph,
  isMobile,
  isTablet,
  isTouch,
  isDesktop,
  isDesktopXl,
};

window.BreakpointHelper = BreakpointHelper;
