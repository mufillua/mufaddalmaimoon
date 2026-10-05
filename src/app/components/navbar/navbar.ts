import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NAV_LINKS, CONTACT } from '../../data/site-data';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onResize()',
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
export class Navbar {
  protected readonly links = NAV_LINKS;
  protected readonly contact = CONTACT;

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('home');

  private readonly toggleBtn = viewChild<ElementRef<HTMLButtonElement>>('toggle');
  private readonly document = inject(DOCUMENT);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Lock page scroll while the mobile menu is open.
    effect(() => {
      this.document.body.classList.toggle('no-scroll', this.menuOpen());
    });

    // Highlight the nav link of the section currently in view.
    afterNextRender(() => {
      this.onScroll();
      if (typeof IntersectionObserver === 'undefined') return;

      const sections = this.links
        .map((l) => this.document.getElementById(l.id))
        .filter((el): el is HTMLElement => !!el);

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((s) => observer.observe(s));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 16);
  }

  protected onResize(): void {
    if (window.innerWidth > 960 && this.menuOpen()) this.closeMenu();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(returnFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (returnFocus) this.toggleBtn()?.nativeElement.focus();
  }
}
