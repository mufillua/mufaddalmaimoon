import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClientProject } from '../../data/site-data';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-project-card',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-featured]': 'variant() === "featured"',
  },
  template: `
    @let p = project();
    <article class="card" [attr.aria-labelledby]="id()">
      <div class="preview" [class.is-dark]="p.plaque === 'dark'">
        <span class="preview__bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="preview__url"><app-icon name="lock" size="11" />{{ p.domain }}</span>
        </span>
        <span class="preview__body">
          <span class="facets"></span>
          <span class="plaque">
            <img
              [src]="p.logo"
              [attr.width]="p.logoWidth"
              [attr.height]="p.logoHeight"
              [alt]="p.name + ' logo'"
              loading="lazy"
              decoding="async"
            />
          </span>
        </span>
      </div>

      <div class="info">
        <p class="category">{{ p.category }}</p>
        <h3 [id]="id()">{{ p.name }}</h3>
        <p class="desc">{{ p.description }}</p>
        <a class="btn" [class.btn--primary]="variant() === 'featured'" [class.btn--ghost]="variant() !== 'featured'"
           [href]="p.url" target="_blank" rel="noopener noreferrer">
          View Website
          <span class="visually-hidden">: {{ p.name }} (opens in a new tab)</span>
          <app-icon name="arrow-up-right" size="18" />
        </a>
      </div>
    </article>
  `,
  styles: `
    :host { display: flex; flex: 1; min-width: 0; }

    .card {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: var(--r-lg);
      background: var(--white);
      border: 1px solid var(--line);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      transition: transform 420ms var(--ease), box-shadow 420ms var(--ease), border-color 420ms var(--ease);

      &:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);
        border-color: var(--sky-200);

        .plaque { transform: scale(1.035); box-shadow: 0 22px 40px -18px rgba(11, 42, 87, 0.4); }
        .facets { transform: translateX(-3%); }
        .btn .icon-arrow-up-right { transform: translate(2px, -2px); }
      }
    }

    /* Website-preview frame --------------------------------------------- */
    .preview {
      display: block;
      margin: 0.7rem 0.7rem 0;
      border-radius: calc(var(--r-lg) - 8px);
      border: 1px solid var(--line);
      overflow: hidden;
      background: var(--sky-50);
    }

    .preview__bar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      height: 34px;
      padding-inline: 0.8rem;
      background: var(--white);
      border-bottom: 1px solid var(--line);
    }

    .dots {
      display: flex;
      gap: 5px;
      i { width: 7px; height: 7px; border-radius: 50%; background: var(--sky-200); }
    }

    .preview__url {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      min-width: 0;
      padding: 0.15rem 0.7rem;
      border-radius: 99px;
      background: var(--sky-50);
      font-size: 0.74rem;
      color: var(--muted);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      app-icon { color: var(--brand-soft); }
    }

    .preview__body {
      position: relative;
      display: grid;
      place-items: center;
      aspect-ratio: 16 / 9;
      padding: 1.5rem;
      overflow: hidden;
      background:
        linear-gradient(rgba(31, 95, 168, 0.05) 1px, transparent 1px) 0 0 / 28px 28px,
        linear-gradient(90deg, rgba(31, 95, 168, 0.05) 1px, transparent 1px) 0 0 / 28px 28px,
        linear-gradient(160deg, #f4f8fd 0%, #e7f0fa 100%);
    }

    .facets {
      position: absolute;
      inset: 0 -6%;
      background:
        linear-gradient(135deg, rgba(183, 207, 236, 0.55), rgba(183, 207, 236, 0) 60%);
      clip-path: polygon(55% 0, 100% 0, 100% 100%, 78% 100%);
      transition: transform 600ms var(--ease);
    }

    .plaque {
      position: relative;
      display: grid;
      place-items: center;
      width: min(78%, 360px);
      aspect-ratio: 2.6;
      padding: 0.9rem 1.2rem;
      border-radius: var(--r-md);
      background: var(--white);
      box-shadow: 0 16px 32px -18px rgba(11, 42, 87, 0.35), 0 0 0 1px rgba(223, 232, 243, 0.9);
      transition: transform 520ms var(--ease), box-shadow 520ms var(--ease);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .preview.is-dark {
      .preview__body {
        background:
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px) 0 0 / 28px 28px,
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px) 0 0 / 28px 28px,
          linear-gradient(160deg, #24304f 0%, #141a2e 100%);
      }
      .facets { background: linear-gradient(135deg, rgba(90, 143, 203, 0.28), transparent 60%); }
      .plaque { background: #1c1d31; box-shadow: 0 18px 36px -16px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08); padding: 0.5rem 0.8rem; }
    }

    /* Info -------------------------------------------------------------- */
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1.35rem 1.5rem 1.6rem;
    }

    .category {
      display: inline-block;
      padding: 0.28rem 0.7rem;
      border-radius: 99px;
      background: var(--sky-100);
      color: var(--brand-strong);
      font-size: 0.78rem;
      font-weight: 600;
      line-height: 1.35;
    }

    h3 { margin-top: 0.85rem; font-size: 1.3rem; }

    .desc {
      margin-top: 0.5rem;
      margin-bottom: 1.4rem;
      color: var(--muted);
      font-size: 0.96rem;
    }

    .btn { margin-top: auto; min-height: 46px; padding-inline: 1.2rem; font-size: 0.94rem; }

    /* Stretched link: the whole card opens the website, but there is only one tab stop. */
    .card { position: relative; }
    .btn::after { content: ''; position: absolute; inset: 0; border-radius: var(--r-lg); }
    .btn:hover { transform: none; } /* a transform would trap the stretched ::after inside the button */
    .card:has(.btn:focus-visible) { outline: 2.5px solid var(--brand); outline-offset: 3px; }

    /* Featured variant -------------------------------------------------- */
    :host(.is-featured) {
      .card {
        display: grid;
        grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
        align-items: stretch;
      }

      .preview { margin: 0.8rem 0 0.8rem 0.8rem; display: flex; flex-direction: column; }
      .preview__body { flex: 1; aspect-ratio: auto; min-height: 340px; }
      .plaque { width: min(72%, 440px); aspect-ratio: 3.4; padding: 1.1rem 1.6rem; }

      .info { justify-content: center; padding: clamp(1.75rem, 1rem + 2.5vw, 3rem); }
      h3 { font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem); }
      .desc { font-size: 1.02rem; max-width: 36ch; }
      .btn { margin-top: 0.4rem; min-height: 50px; padding-inline: 1.4rem; }
    }

    /* Tablet: secondary cards become horizontal rows */
    @media (min-width: 701px) and (max-width: 1024px) {
      :host(:not(.is-featured)) {
        .card { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
        .preview { margin: 0.7rem 0 0.7rem 0.7rem; display: flex; flex-direction: column; }
        .preview__body { flex: 1; aspect-ratio: auto; min-height: 210px; }
        .info { justify-content: center; padding: 1.5rem 1.75rem; }
        .btn { margin-top: 0; }
      }
    }

    @media (max-width: 860px) {
      :host(.is-featured) {
        .card { grid-template-columns: 1fr; }
        .preview { margin: 0.7rem 0.7rem 0; }
        .preview__body { min-height: 0; aspect-ratio: 16 / 9; }
        .info { padding: 1.35rem 1.5rem 1.6rem; }
        .btn { margin-top: 0; }
      }
    }
  `,
})
export class ProjectCard {
  readonly project = input.required<ClientProject>();
  readonly variant = input<'featured' | 'default'>('default');

  protected id = () => 'project-' + this.project().name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
