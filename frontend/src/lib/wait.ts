/**
 * Wait for a given amount of milliseconds and then resolve the promise
 * Use to test api loading states
 * @param ms Milliseconds to wait
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
