export const Colors = {
  White: '#FFFFFF',
  Black: '#0F0F0F',
  Green: '#20BE6C',
  Grey: '#787878',
  GreyLight: '#F8F8F8',
  Pink: '#FADAFA',
  Red: '#FF5151',
  Transparent: 'transparent',
}

export const hexOpacity = (color: string, opacity: number) => {
  const trimmedColor = color.replace('#', '')
  const calculatedOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
  return '#' + trimmedColor + calculatedOpacity.toString(16).padStart(2, '0').toUpperCase()
}
