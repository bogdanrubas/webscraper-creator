export const breakpoints = {
  phone: 480,
  tabletPortrait: 738,
  tabletLandscape: 1280,
  smallDesktop: 1600
}

export const media = {
  phone: `@media (max-width: ${breakpoints.phone}px)`,

  tabletPortrait: `@media (min-width: ${breakpoints.phone + 1}px) and (max-width: ${breakpoints.tabletPortrait}px)`,
  tabletPortraitUp: `@media (min-width: ${breakpoints.phone + 1}px)`,
  tabletPortraitDown: `@media (max-width: ${breakpoints.tabletPortrait}px)`,

  tabletLandscape: `@media (min-width: ${breakpoints.tabletPortrait + 1}px) and (max-width: ${breakpoints.tabletLandscape}px)`,
  tabletLandscapeUp: `@media (min-width: ${breakpoints.tabletPortrait + 1}px)`,
  tabletLandscapeDown: `@media (max-width: ${breakpoints.tabletLandscape}px)`,

  smallDesktop: `@media (min-width: ${breakpoints.tabletLandscape + 1}px) and (max-width: ${breakpoints.smallDesktop}px)`,
  smallDesktopUp: `@media (min-width: ${breakpoints.tabletLandscape + 1}px)`,
  smallDesktopDown: `@media (max-width: ${breakpoints.smallDesktop}px)`,

  bigDesktop: `@media (min-width: ${breakpoints.smallDesktop + 1}px)`
}
