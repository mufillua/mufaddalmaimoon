import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WHY_POINTS } from '../../data/site-data';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-why-choose-me',
  imports: [Icon, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section why has-deco" aria-labelledby="why-title">
      <div class="deco" aria-hidden="true">
        <span class="deco-dots mask-br"></span>
        <span class="deco-line" style="top: 85%; --r: -10deg"></span>
        <span class="deco-blob" style="--s: 560px; --c: #a9c5ec; top: -180px; right: -120px; animation-delay: -11s"></span>
        <span class="deco-ring" style="--s: 340px; bottom: 60px; left: -100px"></span>
      </div>
      <div class="container layout">
        <div class="intro">
          <div class="intro__sticky">
            <h2 id="why-title" appReveal>Why Businesses Choose a Custom Website</h2>
            <p appReveal="60">
              A website built for your business — rather than a generic template — presents your products and services
              the way your customers look for them. Working with an independent developer keeps the process simple:
              one point of contact from planning to launch.
            </p>
            <a class="btn btn--primary" href="#contact" appReveal="120">
              Discuss your website
              <app-icon name="arrow-right" size="18" />
            </a>
          </div>
        </div>

        <ul class="points">
          @for (point of points; track point.title; let i = $index) {
            <li [appReveal]="(i % 2) * 90">
              <article class="point">
                <span class="point__icon"><app-icon [name]="point.icon" size="22" /></span>
                <div>
                  <h3>{{ point.title }}</h3>
                  <p>{{ point.description }}</p>
                </div>
              </article>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .why {
      background:
        linear-gradient(180deg, var(--sky-50) 0%, var(--sky-100) 100%);
      border-block: 1px solid var(--line);
      overflow: hidden;
      isolation: isolate;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0) 55%);
        clip-path: polygon(0 0, 46% 0, 22% 100%, 0 100%);
      }
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.25fr);
      gap: clamp(2.5rem, 1.5rem + 4vw, 5rem);
      align-items: start;
    }

    .intro__sticky {
      position: sticky;
      top: calc(var(--header-h) + 2rem);

      h2 { font-size: var(--fs-h2); max-width: 14ch; }
      p { margin-top: 1.2rem; color: var(--muted); font-size: var(--fs-lead); max-width: 44ch; }
      .btn { margin-top: 2rem; }
    }

    .points {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      margin: 0;
      padding: 0;
      list-style: none;

      li { display: flex; }
      padding-bottom: 2.25rem;
      /* offset the second column for a less boxy rhythm */
      li:nth-child(even) { transform: translateY(2.25rem); }
      li:nth-child(even).reveal:not(.is-visible) { transform: translateY(calc(2.25rem + 18px)); }
    }

    .point {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      padding: 1.5rem 1.4rem 1.6rem;
      border-radius: var(--r-lg);
      background: rgba(255, 255, 255, 0.82);
      border: 1px solid rgba(211, 227, 245, 0.9);
      box-shadow: var(--shadow-xs);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      transition: transform 380ms var(--ease), box-shadow 380ms var(--ease), background 380ms var(--ease);

      &:hover { transform: translateY(-4px); background: var(--white); box-shadow: var(--shadow-md); }

      h3 { font-size: 1.12rem; }
      p { margin-top: 0.45rem; color: var(--muted); font-size: 0.95rem; line-height: 1.6; }
    }

    .point__icon {
      display: grid;
      place-items: center;
      width: 46px;
      height: 46px;
      border-radius: 13px;
      background: var(--grad-brand);
      color: var(--white);
      box-shadow: 0 10px 20px -10px rgba(31, 95, 168, 0.7);
    }

    @media (max-width: 1100px) {
      .layout { grid-template-columns: 1fr; }
      .intro__sticky { position: static; h2 { max-width: 20ch; } }
      .points { padding-bottom: 0; }
      .points li:nth-child(even),
      .points li:nth-child(even).reveal:not(.is-visible) { transform: none; }
      .points li:nth-child(even).reveal:not(.is-visible) { transform: translateY(18px); }
    }

    @media (max-width: 600px) {
      .points { grid-template-columns: 1fr; }
      .point { flex-direction: row; align-items: flex-start; padding: 1.25rem; }
      .point__icon { flex: none; width: 42px; height: 42px; }
    }
  `,
})
export class WhyChooseMe {
  protected readonly points = WHY_POINTS;
}
