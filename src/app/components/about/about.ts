import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { APPROACH, CONTACT } from '../../data/site-data';
import { ContactService } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="section has-deco bg-about" aria-labelledby="about-title">
      <div class="deco" aria-hidden="true">
        <span class="deco-facet facet-l2" style="--a: 150deg; --c1: rgba(211, 227, 245, 0.9); --c2: rgba(231, 240, 250, 0.2)"></span>
        <span class="deco-grid mask-left" style="clip-path: polygon(0 0, 46% 0, 24% 100%, 0 100%)"></span>
        <span class="deco-blob" style="--s: 480px; --c: #b6cff0; bottom: -200px; right: 10%; animation-delay: -6s"></span>
        <img class="deco-mark" src="assets/images/mm-mark.png" alt="" width="104" height="104" loading="lazy" style="--s: 460px; --o: 0.04; bottom: -60px; right: -60px" />
      </div>
      <div class="container layout">
        <aside class="profile" appReveal aria-label="Contact card">
          <div class="profile__logo">
            <span class="facet facet--a" aria-hidden="true"></span>
            <span class="facet facet--b" aria-hidden="true"></span>
            <img src="assets/images/mm-logo.png" width="314" height="154" alt="Mufaddal Maimoon logo — Ideas | Code | Results" loading="lazy" />
          </div>
          <div class="profile__body">
            <p class="profile__name">{{ contact.name }}</p>
            <p class="profile__role">{{ contact.role }}</p>
            <ul class="profile__links">
              <li>
                <a [href]="contactService.telHref">
                  <span class="ic"><app-icon name="phone" size="18" /></span>
                  <span><small>Call</small>{{ contact.phoneDisplay }}</span>
                </a>
              </li>
              <li>
                <a [href]="contactService.quickWhatsappUrl()" target="_blank" rel="noopener noreferrer">
                  <span class="ic ic--wa"><app-icon name="whatsapp" size="18" /></span>
                  <span><small>WhatsApp</small>{{ contact.phoneDisplay }}</span>
                </a>
              </li>
              <li>
                <a [href]="contactService.mailHref">
                  <span class="ic"><app-icon name="mail" size="18" /></span>
                  <span><small>Email</small>{{ contact.email }}</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div class="content">
          <h2 id="about-title" appReveal>About Me</h2>
          <p class="lead" appReveal="60">
            I'm Mufaddal Maimoon, a freelance web developer focused on building modern, responsive and
            easy-to-use websites for small and medium-sized businesses.
          </p>
          <p class="body" appReveal="100">
            Every project starts with understanding how your business works and what your customers need to find.
            From there I plan, design, build and deploy the website — and you work with me directly throughout.
          </p>

          <h3 class="approach-title" appReveal="140">What I focus on</h3>
          <ul class="approach" appReveal="180">
            @for (item of approach; track item) {
              <li>
                <span class="tick" aria-hidden="true"><app-icon name="check" size="14" /></span>
                {{ item }}
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
      gap: clamp(2.5rem, 1.5rem + 4vw, 5.5rem);
      align-items: center;
    }

    /* Profile card ---------------------------------------------------- */
    .profile {
      border-radius: calc(var(--r-lg) + 4px);
      background: var(--white);
      border: 1px solid var(--line);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }

    .profile__logo {
      position: relative;
      display: grid;
      place-items: center;
      padding: clamp(2.5rem, 2rem + 3vw, 4rem) 2rem;
      background: linear-gradient(160deg, var(--sky-50), var(--sky-100));
      overflow: hidden;
      isolation: isolate;

      img { width: min(78%, 280px); height: auto; }
    }

    .facet {
      position: absolute;
      inset: 0;
      z-index: -1;
      &--a { background: linear-gradient(135deg, rgba(183, 207, 236, 0.7), transparent 60%); clip-path: polygon(0 0, 38% 0, 12% 100%, 0 100%); }
      &--b { background: linear-gradient(225deg, rgba(183, 207, 236, 0.6), transparent 60%); clip-path: polygon(70% 0, 100% 0, 100% 100%, 88% 100%); }
    }

    .profile__body { padding: 1.6rem 1.6rem 1.75rem; }

    .profile__name {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 650;
      color: var(--ink);
      letter-spacing: -0.015em;
    }

    .profile__role { color: var(--muted); font-size: 0.95rem; }

    .profile__links {
      display: grid;
      gap: 0.5rem;
      margin: 1.25rem 0 0;
      padding: 0;
      list-style: none;

      a {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.6rem 0.75rem;
        border-radius: var(--r-md);
        border: 1px solid var(--line);
        color: var(--ink);
        font-weight: 550;
        overflow-wrap: anywhere;
        transition: border-color var(--dur) var(--ease), background-color var(--dur) var(--ease), transform var(--dur) var(--ease);

        &:hover { border-color: var(--sky-300); background: var(--sky-50); transform: translateX(2px); }
      }

      small { display: block; font-size: 0.75rem; color: var(--muted); font-weight: 500; }
    }

    .ic {
      display: grid;
      place-items: center;
      flex: none;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: var(--sky-100);
      color: var(--brand);
      &--wa { background: rgba(29, 138, 77, 0.1); color: var(--wa); }
    }

    /* Content --------------------------------------------------------- */
    h2 { font-size: var(--fs-h2); }

    .lead {
      margin-top: 1.25rem;
      font-family: var(--font-display);
      font-size: clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem);
      line-height: 1.4;
      color: var(--ink);
      font-weight: 500;
      letter-spacing: -0.01em;
      max-width: 34ch;
    }

    .body { margin-top: 1.1rem; color: var(--muted); max-width: 56ch; font-size: 1.02rem; }

    .approach-title { margin-top: 2.25rem; font-size: 1.05rem; }

    .approach {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.65rem 1.5rem;
      margin: 1rem 0 0;
      padding: 0;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 0.7rem 0;
        border-bottom: 1px solid var(--line);
        color: var(--ink-soft);
        font-weight: 500;
        font-size: 0.97rem;
      }
    }

    .tick {
      display: grid;
      place-items: center;
      flex: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--grad-brand);
      color: var(--white);
    }

    @media (max-width: 960px) {
      .layout { grid-template-columns: 1fr; }
      .profile { max-width: 520px; width: 100%; margin-inline: auto; order: 2; }
    }

    @media (max-width: 560px) {
      .approach { grid-template-columns: 1fr; gap: 0; }
    }
  `,
})
export class About {
  protected readonly contact = CONTACT;
  protected readonly approach = APPROACH;
  protected readonly contactService = inject(ContactService);
}
