export function padZeroes(number: bigint | number | string, length = 2) {
  return number.toString().padStart(length, '0')
}
