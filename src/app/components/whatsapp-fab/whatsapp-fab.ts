import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';

/**
 * Floating WhatsApp shortcut. Appears once the visitor scrolls past the hero
 * and hides while the enquiry section (which has its own WhatsApp button) is in view.
 */
@Component({
  selector: 'app-whatsapp-fab',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <a
      class="fab"
      [class.is-visible]="visible()"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : 'true'"
      [href]="contactService.quickWhatsappUrl()"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
    >
      <app-icon name="whatsapp" size="26" />
      <span class="fab__label">Chat on WhatsApp</span>
    </a>
  `,
  styles: `
    :host { display: contents; }

    .fab {
      position: fixed;
      right: max(1rem, env(safe-area-inset-right));
      bottom: max(1rem, env(safe-area-inset-bottom));
      z-index: 30;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      height: 56px;
      padding: 0 15px;
      border-radius: 999px;
      background: var(--wa);
      color: var(--white);
      font-weight: 600;
      box-shadow: 0 14px 30px -12px rgba(22, 108, 60, 0.7), 0 2px 6px rgba(11, 42, 87, 0.15);
      opacity: 0;
      transform: translateY(16px) scale(0.9);
      pointer-events: none;
      transition: opacity 320ms var(--ease), transform 420ms var(--ease-spring), background-color 280ms var(--ease);

      &.is-visible { opacity: 1; transform: none; pointer-events: auto; }
      &:hover { color: var(--white); background: var(--wa-strong); }
      &:focus-visible { border-radius: 999px; }
    }

    .fab__label {
      max-width: 0;
      overflow: hidden;
      white-space: nowrap;
      transition: max-width 420ms var(--ease), margin 420ms var(--ease);
      margin-right: -0.6rem;
    }

    @media (hover: hover) and (min-width: 900px) {
      .fab:hover .fab__label, .fab:focus-visible .fab__label { max-width: 160px; margin-right: 0.2rem; }
    }
  `,
})
export class WhatsappFab {
  protected readonly contactService = inject(ContactService);
  private readonly pastHero = signal(false);
  private readonly contactInView = signal(false);
  protected readonly visible = computed(() => this.pastHero() && !this.contactInView());

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const contact = document.getElementById('contact');
      if (!contact || typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver(([entry]) => this.contactInView.set(entry.isIntersecting), { threshold: 0.05 });
      io.observe(contact);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  protected onScroll(): void {
    this.pastHero.set(window.scrollY > window.innerHeight * 0.8);
  }
}
