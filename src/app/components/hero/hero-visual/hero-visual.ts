import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon, IconName } from '../../../shared/icon/icon';

interface Chip {
  label: string;
  icon: IconName;
  pos: string;
  tone?: 'wa';
}

/**
 * Illustrative composition: a miniature product-catalogue website in a
 * browser window, the same site on a phone, and floating capability chips.
 * Built entirely with HTML/CSS so it stays crisp and lightweight.
 */
@Component({
  selector: 'app-hero-visual',
  imports: [Icon],
  templateUrl: './hero-visual.html',
  styleUrl: './hero-visual.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVisual {
  protected readonly chips: Chip[] = [
    { label: 'Responsive Design', icon: 'devices', pos: 'c1' },
    { label: 'Angular', icon: 'code', pos: 'c2' },
    { label: 'WhatsApp Enquiry', icon: 'whatsapp', pos: 'c3', tone: 'wa' },
    { label: 'Fast & Modern', icon: 'bolt', pos: 'c4' },
  ];

  protected readonly products = [
    { shape: 'ring', name: 'w1' },
    { shape: 'gear', name: 'w2' },
    { shape: 'block', name: 'w3' },
    { shape: 'pipe', name: 'w4' },
  ];
}
