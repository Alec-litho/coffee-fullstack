import { onUnmounted } from 'vue'

export function useDebounceFn<T extends (...args: any[]) => void>(
  fn: T,
  delayMs: number = 200
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  onUnmounted(cancel)

  const debounced = (...args: Parameters<T>) => {
    cancel()
    
    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delayMs)
  }

  return debounced
}