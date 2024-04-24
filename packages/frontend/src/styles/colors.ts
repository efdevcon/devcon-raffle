export const Colors = {
  White: '#FFFFFF',
  Black: '#0F0F0F',
  Green: '#20BE6C',
  Grey: '#787878',
  GreyLight: '#F8F8F8',
  Pink: '#FADAFA',
  Red: '#F45757',

  Blue: '#1144AA',
  BlueDark: '#103D96',
  BlueLight: '#F6FFFE',
  GreenDark: '#93D7CF',
  GreenLight: '#DDFAF7',
  GreyDark: '#898989',
  RedDark: '#FF6666',
  RedLight: '#FF5151',
  Transparent: 'transparent',
  Porcelain: '#E7EAF3',
  Mystic: '#D0D6E6',
}

export const hexOpacity = (color: string, opacity: number) => {
  const trimmedColor = color.replace('#', '')
  const calculatedOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
  return '#' + trimmedColor + calculatedOpacity.toString(16).padStart(2, '0').toUpperCase()
}
