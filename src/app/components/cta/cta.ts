import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-cta',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta-wrap has-deco bg-cta" aria-labelledby="cta-title">
      <div class="deco" aria-hidden="true">
        <span class="deco-dots mask-center"></span>
        <span class="deco-blob" style="--s: 700px; --c: #a9c4ea; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: none"></span>
      </div>
      <div class="container">
        <div class="cta" appReveal>
          <span class="f f1" aria-hidden="true"></span>
          <span class="f f2" aria-hidden="true"></span>
          <span class="f f3" aria-hidden="true"></span>

          <div class="cta__copy">
            <h2 id="cta-title">Have a business that needs a website?</h2>
            <p>Let's discuss your requirements.</p>
          </div>

          <div class="cta__actions">
            <a class="btn btn--whatsapp" [href]="contactService.quickWhatsappUrl()" target="_blank" rel="noopener noreferrer">
              <app-icon name="whatsapp" size="20" />
              WhatsApp Me
            </a>
            <a class="btn btn--outline-light" [href]="contactService.quickMailtoUrl()">
              <app-icon name="mail" size="18" />
              Send an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .cta-wrap { padding-block: clamp(3.5rem, 2.5rem + 4vw, 6rem); }

    .cta {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem 3rem;
      padding: clamp(2.25rem, 1.5rem + 3vw, 4rem) clamp(1.5rem, 1rem + 3vw, 4rem);
      border-radius: calc(var(--r-lg) + 6px);
      background: linear-gradient(125deg, #1f5fa8 0%, #12407b 48%, #0b2a57 100%);
      overflow: hidden;
      isolation: isolate;
      box-shadow: 0 30px 60px -30px rgba(11, 42, 87, 0.6);
    }

    /* Facets echoing the MM logo's folded planes */
    .f { position: absolute; z-index: -1; inset: 0; }
    .f1 { background: linear-gradient(160deg, rgba(255,255,255,0.14), transparent 60%); clip-path: polygon(52% 0, 74% 0, 60% 100%, 38% 100%); }
    .f2 { background: linear-gradient(200deg, rgba(90,143,203,0.55), transparent 70%); clip-path: polygon(74% 0, 100% 0, 100% 100%, 60% 100%); }
    .f3 { background: radial-gradient(60% 120% at 0% 0%, rgba(255,255,255,0.12), transparent 60%); }

    .cta__copy {
      h2 {
        color: var(--white);
        font-size: clamp(1.7rem, 1.2rem + 2vw, 2.6rem);
        max-width: 18ch;
      }
      p {
        margin-top: 0.8rem;
        color: rgba(255, 255, 255, 0.8);
        font-size: var(--fs-lead);
      }
    }

    .cta__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      flex: none;
    }

    @media (max-width: 860px) {
      .cta { flex-direction: column; align-items: flex-start; }
    }

    @media (max-width: 480px) {
      .cta__actions { width: 100%; .btn { flex: 1 1 100%; } }
    }
  `,
})
export class Cta {
  protected readonly contactService = inject(ContactService);
}
