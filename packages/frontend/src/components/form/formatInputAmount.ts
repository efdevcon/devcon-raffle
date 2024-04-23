export function formatInputAmount(value: string) {
  if (value.length > 1 && value.startsWith('0')) {
    value = value.replace(/^0+/, '')
  }
  if (value.length > 1 && value.charAt(0) === '.') {
    return '0' + value
  }
  if (value.length > 1 && value.charAt(value.length - 1) === '.') {
    return value.slice(0, -1)
  }
  if (value === '.') {
    return '0'
  } else {
    return value
  }
}
