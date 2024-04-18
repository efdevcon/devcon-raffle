import { useEffect, useState } from "react";

export function useDebounceValue<Value>(value: Value, timeout: number, onDebounce?: () => void): Value {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onDebounce?.()
      setDebouncedValue(value)
    }, timeout)
    return () => clearTimeout(timeoutId)
  }, [value, timeout, onDebounce])

  return debouncedValue
}
