import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CLIENTS } from '../../data/site-data';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { ProjectCard } from './project-card';

@Component({
  selector: 'app-portfolio',
  imports: [Icon, RevealDirective, ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="work" class="section has-deco bg-work" aria-labelledby="work-title">
      <div class="deco" aria-hidden="true">
        <span class="deco-facet facet-band" style="--a: 100deg; --c1: rgba(211, 227, 245, 0.75); --c2: rgba(231, 240, 250, 0.35)"></span>
        <span class="deco-grid mask-tr"></span>
        <span class="deco-dots mask-bl"></span>
        <span class="deco-line" style="top: 16%; --r: -12deg"></span>
        <span class="deco-blob" style="--s: 620px; --c: #b3cbee; top: 18%; left: -220px; animation-delay: -4s"></span>
        <span class="deco-blob" style="--s: 520px; --c: #c3d3f5; bottom: -160px; right: -140px; animation-delay: -14s"></span>
        <img class="deco-mark" src="assets/images/mm-mark.png" alt="" width="104" height="104" loading="lazy" style="--s: 380px; --o: 0.045; top: 40px; right: -40px" />
      </div>
      <div class="container">
        <header class="head">
          <div>
            <h2 id="work-title" appReveal>Selected Work</h2>
            <p appReveal="80">A few websites I've designed and developed for businesses.</p>
          </div>
          <a class="btn btn--ghost head__cta" href="#contact" appReveal="140">
            Start your project
            <app-icon name="arrow-right" size="18" />
          </a>
        </header>

        <div class="featured" appReveal>
          <app-project-card [project]="featured" variant="featured" />
        </div>

        <ul class="grid">
          @for (project of others; track project.name; let i = $index) {
            <li [appReveal]="i * 90">
              <app-project-card [project]="project" />
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1.5rem 3rem;
      margin-bottom: clamp(2.25rem, 1.8rem + 2vw, 3.5rem);

      h2 { font-size: var(--fs-h2); }
      p { margin-top: 0.9rem; font-size: var(--fs-lead); color: var(--muted); max-width: 46ch; }
    }

    .head__cta { flex: none; }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.25rem;
      margin: 1.25rem 0 0;
      padding: 0;
      list-style: none;

      li { display: flex; }
    }

    @media (max-width: 1024px) {
      .grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 700px) {
      .head { flex-direction: column; align-items: flex-start; }
      .grid { grid-template-columns: 1fr; }
    }
  `,
})
export class Portfolio {
  protected readonly featured = CLIENTS.find((c) => c.featured) ?? CLIENTS[0];
  protected readonly others = CLIENTS.filter((c) => c !== this.featured);
}
