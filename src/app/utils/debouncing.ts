export function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the previous timeout
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
