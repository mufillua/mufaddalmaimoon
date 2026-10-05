import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CLIENTS, CONTACT } from '../../data/site-data';
import { ContactService } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';
import { HeroVisual } from './hero-visual/hero-visual';

@Component({
  selector: 'app-hero',
  imports: [Icon, HeroVisual],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly contact = CONTACT;
  protected readonly clients = CLIENTS;
  protected readonly contactService = inject(ContactService);
}
