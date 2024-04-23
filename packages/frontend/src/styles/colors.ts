export const Colors = {
  White: '#FFFFFF',
  Black: '#0F0F0F',
  Blue: '#1144AA',
  BlueDark: '#103D96',
  BlueLight: '#F6FFFE',
  Green: '#20BE6C',
  GreenDark: '#93D7CF',
  GreenLight: '#DDFAF7',
  Grey: '#60697C',
  GreyLight: '#F9F9F9',
  GreyDark: '#898989',
  Red: '#FFA5A5',
  RedDark: '#FF6666',
  RedLight: '#FFF7F7',
  Transparent: 'transparent',
  Porcelain: '#E7EAF3',
  Mystic: '#D0D6E6',
  Pink: '#FADAFA',
}

export const hexOpacity = (color: string, opacity: number) => {
  const trimmedColor = color.replace('#', '')
  const calculatedOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
  return '#' + trimmedColor + calculatedOpacity.toString(16).padStart(2, '0').toUpperCase()
}
