/** Values Plausible accepts on a custom event property. */
type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

/**
 * Reports a custom Plausible event. Does nothing during SSR or when the
 * tracker was blocked; calls made before the script has loaded are absorbed by
 * the queue stub in the <head>, so no event is lost to a slow network.
 */
export function trackEvent(name: string, props?: EventProps) {
  if (import.meta.server) return;

  window.plausible?.(name, props ? { props } : undefined);
}
