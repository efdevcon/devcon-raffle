export const breakPoints = {
  extraSmall: 360,
  small: 430,
  medium: 768,
  large: 1024,
  extraLarge: 1440,
} as const

export const MediaQueries = {
  extraSmall: `@media screen and (max-width: ${breakPoints.extraSmall}px)`,
  small: `@media screen and (max-width: ${breakPoints.small}px)`,
  medium: `@media screen and (max-width: ${breakPoints.medium}px)`,
  large: `@media screen and (max-width: ${breakPoints.large}px)`,
  extraLarge: `@media screen and (max-width: ${breakPoints.extraLarge}px)`,
  touchscreen: `@media (pointer: coarse)`,
}
