import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROCESS_STEPS } from '../../data/site-data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-process',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="process" class="section section--tint has-deco" aria-labelledby="process-title">
      <div class="deco" aria-hidden="true">
        <span class="deco-dots mask-center" style="opacity: 0.7"></span>
        <span class="deco-line" style="top: 30%; --r: 8deg"></span>
        <span class="deco-ring" style="--s: 420px; top: -150px; left: -120px"></span>
        <span class="deco-ring" style="--s: 260px; bottom: -80px; right: 6%"></span>
        <span class="deco-facet facet-r1" style="--a: 200deg; --c1: rgba(183, 207, 236, 0.5)"></span>
      </div>
      <div class="container">
        <header class="section-head section-head--center">
          <h2 id="process-title" appReveal>Simple Process. Clear Communication.</h2>
          <p appReveal="80">Five clear stages from the first conversation to a live website — you always know what's happening next.</p>
        </header>

        <ol class="timeline" appReveal="120">
          @for (step of steps; track step.number; let i = $index; let last = $last) {
            <li class="step" [style.--i]="i">
              <span class="step__marker" aria-hidden="true">
                <span class="step__num">{{ step.number }}</span>
              </span>
              <div class="step__body">
                <h3><span class="visually-hidden">Step {{ i + 1 }}: </span>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .section--tint {
      background:
        radial-gradient(60% 80% at 50% 0%, rgba(211, 227, 245, 0.55), transparent 70%),
        var(--sky-50);
    }

    .timeline {
      --marker: 64px;
      position: relative;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 1.25rem;
      margin: 0;
      padding: 0;
      list-style: none;

      /* connecting rail */
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: calc(var(--marker) / 2);
        left: 10%;
        right: 10%;
        height: 2px;
        border-radius: 2px;
      }
      &::before { background: var(--sky-200); }
      &::after {
        background: linear-gradient(90deg, var(--brand), var(--brand-soft));
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 1600ms var(--ease) 300ms;
      }
      &.is-visible::after { transform: scaleX(1); }
    }

    /* the list itself doesn't fade; its steps stagger in instead */
    .timeline.reveal { opacity: 1; transform: none; }

    .step {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 1;
    }

    .step__marker {
      display: grid;
      place-items: center;
      width: var(--marker);
      height: var(--marker);
      border-radius: 50%;
      background: var(--white);
      border: 1px solid var(--sky-200);
      box-shadow: 0 0 0 8px var(--sky-50), var(--shadow-sm);
      transition: transform 380ms var(--ease-spring), background 380ms var(--ease), box-shadow 380ms var(--ease);
    }

    .step__num {
      font-family: var(--font-display);
      font-weight: 650;
      font-size: 1.15rem;
      color: var(--brand);
      letter-spacing: -0.01em;
      font-variant-numeric: tabular-nums;
      transition: color 380ms var(--ease);
    }

    .step__body {
      margin-top: 1.4rem;
      padding: 1.35rem 1.15rem 1.45rem;
      border-radius: var(--r-lg);
      background: rgba(255, 255, 255, 0.75);
      border: 1px solid var(--line);
      flex: 1;
      width: 100%;
      transition: transform 380ms var(--ease), box-shadow 380ms var(--ease), background 380ms var(--ease);

      p { margin-top: 0.5rem; color: var(--muted); font-size: 0.95rem; line-height: 1.6; }
    }

    .step:hover {
      .step__marker { transform: scale(1.06); background: var(--grad-brand); border-color: transparent; }
      .step__num { color: var(--white); }
      .step__body { transform: translateY(-3px); background: var(--white); box-shadow: var(--shadow-md); }
    }

    /* Stagger children when the list reveals */
    .step { opacity: 0; transform: translateY(14px); transition: opacity 600ms var(--ease) calc(var(--i) * 120ms + 150ms), transform 600ms var(--ease) calc(var(--i) * 120ms + 150ms); }
    .timeline.is-visible .step { opacity: 1; transform: none; }

    @media (max-width: 1024px) {
      .timeline {
        grid-template-columns: 1fr;
        gap: 1rem;
        max-width: 620px;
        margin-inline: auto;
        --marker: 52px;

        &::before, &::after { display: none; }
      }

      /* per-step connectors so the rail stops at the last marker */
      .step:not(:last-child)::before {
        content: '';
        position: absolute;
        left: calc(var(--marker) / 2 - 1px);
        top: var(--marker);
        bottom: -1rem;
        width: 2px;
        background: linear-gradient(var(--brand), var(--sky-300));
        z-index: -1;
      }

      .step {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;
        gap: 1.1rem;
      }

      .step__marker { flex: none; box-shadow: 0 0 0 6px var(--sky-50), var(--shadow-sm); }
      .step__num { font-size: 1rem; }
      .step__body { margin-top: 0; padding: 1.1rem 1.2rem 1.2rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      .step { opacity: 1; transform: none; }
    }
  `,
})
export class Process {
  protected readonly steps = PROCESS_STEPS;
}
