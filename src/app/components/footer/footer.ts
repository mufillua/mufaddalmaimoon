import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CONTACT, NAV_LINKS } from '../../data/site-data';
import { ContactService } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="top">
          <div class="brand">
            <a class="brand__link" href="#home" aria-label="Back to top">
              <img src="assets/images/mm-mark.png" width="104" height="104" alt="Maimoon Digital logo" loading="lazy" />
              <span>
                <span class="brand__name">{{ contact.brand }}</span>
                <span class="brand__role">{{ contact.role }}</span>
              </span>
            </a>
            <p class="brand__tag">{{ contact.tagline }}</p>
          </div>

          <nav class="col" aria-label="Footer">
            <h2 class="col__title">Navigation</h2>
            <ul>
              @for (link of links; track link.id) {
                <li><a [href]="'#' + link.id">{{ link.label }}</a></li>
              }
            </ul>
          </nav>

          <div class="col">
            <h2 class="col__title">Contact</h2>
            <ul class="contact">
              <li>
                <a [href]="contactService.telHref">
                  <app-icon name="phone" size="16" />
                  {{ contact.phoneDisplay }}
                </a>
              </li>

              <li>
                <a
                  [href]="contactService.quickWhatsappUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <app-icon name="whatsapp" size="16" />
                  WhatsApp
                </a>
              </li>

              <li>
                <a [href]="contactService.mailHref">
                  <app-icon name="mail" size="16" />
                  {{ contact.email }}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mufimaimoon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mufaddal Maimoon on LinkedIn"
                >
                  <app-icon name="linkedin" size="16" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mufimaimoon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mufaddal Maimoon on Instagram"
                >
                  <app-icon name="instagram" size="16" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div class="col col--cta">
            <h2 class="col__title">Start a project</h2>
            <p>Tell me what your business needs and get a quote for your website.</p>
            <a class="btn btn--primary" href="#contact">
              Get a Website Quote
              <app-icon name="arrow-right" size="18" />
            </a>
          </div>
        </div>

        <div class="bottom">
          <p>© 2026 {{ contact.brand }}. All rights reserved.</p>
          <a class="to-top" href="#home">
            Back to top
            <span class="to-top__ic" aria-hidden="true"><app-icon name="arrow-up-right" size="14" /></span>
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }

    .footer {
      position: relative;
      padding-top: clamp(3.5rem, 2.5rem + 3vw, 5rem);
      background: linear-gradient(180deg, var(--sky-50) 0%, var(--sky-100) 100%);
      border-top: 1px solid var(--line);
    }

    .top {
      display: grid;
      grid-template-columns: 1.3fr 0.8fr 1.1fr 1.2fr;
      gap: 2.5rem;
      padding-bottom: 3rem;
    }

    .brand__link {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--ink);
      border-radius: 10px;
      img { width: 48px; height: 48px; object-fit: contain; }
      &:hover { color: var(--ink); }
    }

    .brand__name {
      display: block;
      font-family: var(--font-display);
      font-size: 1.2rem;
      font-weight: 650;
      letter-spacing: -0.015em;
    }

    .brand__role { display: block; font-size: 0.85rem; color: var(--muted); }

    .brand__tag {
      margin-top: 1.25rem;
      font-family: var(--font-display);
      font-size: 1.25rem;
      line-height: 1.35;
      color: var(--ink);
      font-weight: 500;
      max-width: 20ch;
      letter-spacing: -0.01em;
    }

    .col__title {
      font-family: var(--font-body);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0;
      margin-bottom: 1rem;
    }

    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }

    .col a:not(.btn) {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--ink-soft);
      font-weight: 500;
      overflow-wrap: anywhere;
      border-radius: 4px;
      transition: color var(--dur) var(--ease);
      app-icon { color: var(--brand-soft); }
      &:hover { color: var(--brand); }
    }

    .col--cta p { color: var(--muted); font-size: 0.95rem; margin-bottom: 1.1rem; max-width: 32ch; }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-block: 1.5rem;
      border-top: 1px solid var(--sky-200);
      font-size: 0.88rem;
      color: var(--muted);
    }

    .to-top {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--ink-soft);
      font-weight: 550;
      border-radius: 6px;

      &:hover { color: var(--brand); .to-top__ic { transform: translateY(-2px); } }
    }

    .to-top__ic {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--white);
      border: 1px solid var(--line);
      transition: transform var(--dur) var(--ease);
      app-icon { transform: rotate(-45deg); }
    }

    @media (max-width: 1024px) {
      .top { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 560px) {
      .top { grid-template-columns: 1fr; gap: 2rem; }
      .bottom { flex-direction: column-reverse; align-items: flex-start; }
    }
  `,
})
export class Footer {
  protected readonly contact = CONTACT;
  protected readonly links = NAV_LINKS;
  protected readonly contactService = inject(ContactService);
}
