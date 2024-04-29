export type TransientProps<T, SafeKeys extends keyof T> = {
  [K in keyof T & string as K extends SafeKeys ? `$${K}` : K]: T[K]
}
