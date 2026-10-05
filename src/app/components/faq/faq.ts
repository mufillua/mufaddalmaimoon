import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FAQS } from '../../data/site-data';
import { ContactService } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-faq',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="section section--tint has-deco" aria-labelledby="faq-title">
      <div class="deco" aria-hidden="true">
        <span class="deco-grid mask-tl"></span>
        <span class="deco-line" style="top: 60%; --r: -11deg"></span>
        <span class="deco-blob" style="--s: 500px; --c: #bad0ef; bottom: -180px; left: -140px; animation-delay: -7s"></span>
        <span class="deco-facet facet-r1" style="--a: 160deg; --c1: rgba(211, 227, 245, 0.7)"></span>
      </div>
      <div class="container layout">
        <div class="intro">
          <h2 id="faq-title" appReveal>Frequently Asked Questions</h2>
          <p appReveal="60">Quick answers to the questions business owners usually ask before starting a website.</p>
          <div class="ask" appReveal="120">
            <p>Have a different question?</p>
            <a [href]="contactService.quickWhatsappUrl()" target="_blank" rel="noopener noreferrer">
              <app-icon name="whatsapp" size="18" />
              Ask me on WhatsApp
              <app-icon name="arrow-right" size="16" class="arrow" />
            </a>
          </div>
        </div>

        <div class="list" appReveal="80">
          @for (item of faqs; track item.question; let i = $index) {
            <div class="item" [class.is-open]="open() === i">
              <h3>
                <button
                  type="button"
                  [id]="'faq-q-' + i"
                  [attr.aria-expanded]="open() === i"
                  [attr.aria-controls]="'faq-a-' + i"
                  (click)="toggle(i)"
                >
                  <span>{{ item.question }}</span>
                  <span class="icon-wrap" aria-hidden="true"><app-icon name="plus" size="18" /></span>
                </button>
              </h3>
              <div class="answer" [id]="'faq-a-' + i" role="region" [attr.aria-labelledby]="'faq-q-' + i" [attr.inert]="open() === i ? null : ''">
                <div class="answer__inner">
                  <p>{{ item.answer }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      gap: clamp(2rem, 1rem + 4vw, 5rem);
      align-items: start;
    }

    .intro {
      position: sticky;
      top: calc(var(--header-h) + 2rem);

      h2 { font-size: var(--fs-h2); max-width: 13ch; }
      > p { margin-top: 1rem; color: var(--muted); font-size: var(--fs-lead); max-width: 38ch; }
    }

    .ask {
      margin-top: 2rem;
      padding: 1.2rem 1.3rem;
      border-radius: var(--r-lg);
      background: var(--white);
      border: 1px solid var(--line);
      max-width: 340px;

      p { font-weight: 600; color: var(--ink); }

      a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.4rem;
        font-weight: 600;
        color: var(--wa-strong);
        border-radius: 6px;

        .arrow { transition: transform var(--dur) var(--ease); }
        &:hover { color: var(--wa); .arrow { transform: translateX(3px); } }
      }
    }

    .list {
      border-radius: calc(var(--r-lg) + 2px);
      background: var(--white);
      border: 1px solid var(--line);
      box-shadow: var(--shadow-sm);
      padding: 0.4rem 0;
    }

    .item {
      border-bottom: 1px solid var(--line);
      &:last-child { border-bottom: 0; }
    }

    h3 { font-size: 1.05rem; margin: 0; }

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
      width: 100%;
      padding: 1.3rem clamp(1.1rem, 0.8rem + 1vw, 1.6rem);
      border: 0;
      background: transparent;
      text-align: left;
      font-family: var(--font-display);
      font-size: clamp(1.02rem, 0.98rem + 0.2vw, 1.12rem);
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.35;
      color: var(--ink);
      cursor: pointer;
      border-radius: var(--r-md);
      transition: color var(--dur) var(--ease);

      &:hover { color: var(--brand); }
      &:focus-visible { outline-offset: -3px; }
    }

    .icon-wrap {
      display: grid;
      place-items: center;
      flex: none;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--sky-50);
      border: 1px solid var(--sky-200);
      color: var(--brand);
      transition: transform 380ms var(--ease), background 380ms var(--ease), color 380ms var(--ease), border-color 380ms var(--ease);

      .is-open & { transform: rotate(45deg); background: var(--grad-brand); color: var(--white); border-color: transparent; }
    }

    .answer {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 420ms var(--ease);
      .is-open & { grid-template-rows: 1fr; }
    }

    .answer__inner {
      overflow: hidden;
      p {
        padding: 0 clamp(1.1rem, 0.8rem + 1vw, 1.6rem) 1.4rem;
        padding-right: calc(clamp(1.1rem, 0.8rem + 1vw, 1.6rem) + 3rem);
        color: var(--muted);
        line-height: 1.7;
        opacity: 0;
        transform: translateY(-4px);
        transition: opacity 320ms var(--ease), transform 320ms var(--ease);
      }
      .is-open & p { opacity: 1; transform: none; transition-delay: 80ms; }
    }

    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; }
      .intro { position: static; }
      .answer__inner p { padding-right: clamp(1.1rem, 0.8rem + 1vw, 1.6rem); }
    }
  `,
})
export class Faq {
  protected readonly faqs = FAQS;
  protected readonly contactService = inject(ContactService);
  protected readonly open = signal<number | null>(0);

  protected toggle(i: number): void {
    this.open.update((current) => (current === i ? null : i));
  }
}
