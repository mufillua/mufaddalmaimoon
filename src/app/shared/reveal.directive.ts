import { DestroyRef, Directive, ElementRef, PLATFORM_ID, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Adds a subtle fade-up when the element scrolls into view.
 * One shared IntersectionObserver is used for the whole page.
 * Elements are shown immediately when reduced motion is preferred
 * or IntersectionObserver is unavailable.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
  }
  return sharedObserver;
}

@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.--reveal-delay]': 'appReveal() + "ms"',
  },
})
export class RevealDirective {
  /** Delay in ms, useful for staggering items in a grid. */
  readonly appReveal = input(0, { transform: (v: unknown) => numberAttribute(v, 0) });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const node = this.el.nativeElement;
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (reduce || typeof IntersectionObserver === 'undefined') {
        node.classList.add('is-visible');
        return;
      }

      const observer = getObserver();
      observer.observe(node);
      destroyRef.onDestroy(() => observer.unobserve(node));
    });
  }
}
