/**
 * Cheap "is this element on screen" flag for per-frame loops.
 *
 * The pointer loop runs every subscriber on every frame, and each one starts by
 * measuring its section — which, interleaved with the style writes the previous
 * subscriber just made, forces a fresh layout each time. Off-screen sections
 * paid that cost for the entire length of the page. An IntersectionObserver
 * answers the same question for free, and deliberately without React state, so
 * scrolling past a section never triggers a render.
 */
export interface VisibilityWatcher {
  readonly visible: boolean;
  stop(): void;
}

export function watchVisibility(
  el: Element,
  rootMargin = '15%',
): VisibilityWatcher {
  if (typeof IntersectionObserver === 'undefined') {
    return { visible: true, stop() {} };
  }
  let visible = true;
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
    },
    { rootMargin },
  );
  io.observe(el);
  return {
    get visible() {
      return visible;
    },
    stop: () => io.disconnect(),
  };
}
