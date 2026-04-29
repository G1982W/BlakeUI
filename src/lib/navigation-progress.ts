export const NAVIGATION_PROGRESS_START_EVENT = "blakeui:navigation-progress:start";
export const NAVIGATION_PROGRESS_DONE_EVENT = "blakeui:navigation-progress:done";

export function startNavigationProgress() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NAVIGATION_PROGRESS_START_EVENT));
}

export function doneNavigationProgress() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NAVIGATION_PROGRESS_DONE_EVENT));
}
