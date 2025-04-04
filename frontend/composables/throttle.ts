export function throttle<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: number | null = null;
    let lastArgs: Parameters<T> | null = null;
  
    return function (...args: Parameters<T>) {
      lastArgs = args;
  
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          if (lastArgs !== null) {
            func(...lastArgs);
          }
          timeoutId = null;
          lastArgs = null;
        }, delay);
      }
    };
  }
  