import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERVICES } from '../../data/site-data';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="services" class="section has-deco bg-services" aria-labelledby="services-title">
      <div class="deco" aria-hidden="true">
        <span class="deco-dots mask-tr"></span>
        <span class="deco-line" style="top: 22%; --r: -9deg"></span>
        <span class="deco-line" style="top: 78%; --r: -6deg"></span>
        <span class="deco-blob" style="--s: 560px; --c: #b6cff0; top: -200px; right: -160px"></span>
        <span class="deco-blob" style="--s: 460px; --c: #c8d5f6; bottom: -180px; left: -160px; animation-delay: -9s"></span>
        <span class="deco-facet facet-l1" style="--a: 160deg"></span>
        <span class="deco-ring" style="--s: 300px; top: 70px; right: 4%"></span>
      </div>
      <div class="container">
        <header class="head">
          <h2 id="services-title" appReveal>What I Can Build For Your Business</h2>
          <p appReveal="80">
            From a simple company website to a full product catalogue with WhatsApp and email enquiries —
            each site is planned around how your customers find and contact you.
          </p>
        </header>

        <ul class="grid">
          @for (service of services; track service.title; let i = $index) {
            <li [appReveal]="(i % 4) * 70">
              <article class="card">
                <span class="card__icon"><app-icon [name]="service.icon" size="24" /></span>
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
              </article>
            </li>
          }
          <li [appReveal]="210">
            <div class="card card--cta">
              <h3>Not sure what you need?</h3>
              <p>Tell me about your business and I'll suggest the right kind of website.</p>
              <a class="btn btn--light" href="#contact">
                Get a Website Quote
                <app-icon name="arrow-right" size="18" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .head {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
      align-items: end;
      gap: 1.25rem 4rem;
      margin-bottom: clamp(2.5rem, 2rem + 2vw, 3.75rem);

      h2 { font-size: var(--fs-h2); max-width: 16ch; }
      p { font-size: var(--fs-lead); color: var(--muted); max-width: 48ch; }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1.1rem;
      margin: 0;
      padding: 0;
      list-style: none;
      li { display: flex; }
    }

    .card {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1.6rem 1.5rem 1.7rem;
      border-radius: var(--r-lg);
      background: var(--white);
      border: 1px solid var(--line);
      box-shadow: var(--shadow-xs);
      transition:
        transform 380ms var(--ease),
        box-shadow 380ms var(--ease),
        border-color 380ms var(--ease);

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(160deg, rgba(231, 240, 250, 0.9), transparent 55%);
        opacity: 0;
        transition: opacity 380ms var(--ease);
        pointer-events: none;
      }

      &:hover {
        transform: translateY(-4px);
        border-color: var(--sky-200);
        box-shadow: var(--shadow-md);
        &::after { opacity: 1; }
        .card__icon { background: var(--grad-brand); color: var(--white); border-color: transparent; transform: rotate(-4deg); }
      }

      h3 { margin-top: 1.4rem; position: relative; z-index: 1; }
      p { margin-top: 0.55rem; color: var(--muted); font-size: 0.96rem; line-height: 1.6; position: relative; z-index: 1; }
    }

    .card__icon {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: var(--sky-50);
      border: 1px solid var(--sky-200);
      color: var(--brand);
      transition: background 380ms var(--ease), color 380ms var(--ease), transform 380ms var(--ease-spring), border-color 380ms var(--ease);
    }

    .card--cta {
      background: var(--grad-brand);
      border-color: transparent;
      color: var(--white);
      overflow: hidden;
      isolation: isolate;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
          linear-gradient(135deg, rgba(255,255,255,0.14), transparent 45%),
          linear-gradient(315deg, rgba(90,143,203,0.45), transparent 50%);
        clip-path: polygon(45% 0, 100% 0, 100% 100%, 75% 100%);
      }
      &::after { display: none; }

      h3 { margin-top: 0; color: var(--white); font-size: 1.35rem; }
      p { color: rgba(255, 255, 255, 0.82); margin-bottom: 1.5rem; }
      .btn { margin-top: auto; align-self: flex-start; min-height: 46px; padding-inline: 1.15rem; }
      &:hover { border-color: transparent; box-shadow: var(--shadow-lg); }
    }

    @media (max-width: 1100px) {
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 860px) {
      .head { grid-template-columns: 1fr; align-items: start; }
    }

    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; gap: 0.9rem; }
      .card { padding: 1.35rem 1.25rem 1.45rem; display: grid; grid-template-columns: auto 1fr; column-gap: 1rem; }
      .card h3 { margin-top: 0.2rem; }
      .card p { grid-column: 2; margin-top: 0.3rem; }
      .card__icon { grid-row: span 2; width: 46px; height: 46px; }
      .card--cta { display: flex; }
    }
  `,
})
export class Services {
  protected readonly services = SERVICES;
}
