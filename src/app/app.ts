import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Portfolio } from './components/portfolio/portfolio';
import { Process } from './components/process/process';
import { About } from './components/about/about';
import { WhyChooseMe } from './components/why-choose-me/why-choose-me';
import { EnquiryForm } from './components/enquiry-form/enquiry-form';
import { Faq } from './components/faq/faq';
import { Cta } from './components/cta/cta';
import { Footer } from './components/footer/footer';
import { WhatsappFab } from './components/whatsapp-fab/whatsapp-fab';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Services, Portfolio, Process, About, WhyChooseMe, EnquiryForm, Faq, Cta, Footer, WhatsappFab],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <app-navbar />
    <main id="main">
      <app-hero />
      <app-services />
      <app-portfolio />
      <app-process />
      <app-about />
      <app-why-choose-me />
      <app-enquiry-form />
      <app-faq />
      <app-cta />
    </main>
    <app-footer />
    <app-whatsapp-fab />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
