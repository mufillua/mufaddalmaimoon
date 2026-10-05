import { Injectable } from '@angular/core';
import { CONTACT } from '../data/site-data';

export type YesNo = 'Yes' | 'No' | '';

export interface EnquiryDetails {
  name: string;
  business: string;
  phone: string;
  email: string;
  websiteType: string;
  pages: string;
  catalogue: YesNo;
  whatsapp: YesNo;
  emailEnquiry: YesNo;
  requirements: string;
}

const NOT_SPECIFIED = 'Not specified';

/**
 * Builds WhatsApp (wa.me) and mailto: links.
 * Every user-supplied value is URL-encoded with encodeURIComponent.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  readonly whatsappNumber = CONTACT.phoneIntl;
  readonly email = CONTACT.email;
  readonly telHref = `tel:+${CONTACT.phoneIntl}`;
  readonly mailHref = `mailto:${CONTACT.email}`;

  /** Plain-text enquiry message shared by WhatsApp, email and the live preview. */
  buildEnquiryMessage(d: EnquiryDetails): string {
    const v = (value: string) => (value && value.trim() ? value.trim() : NOT_SPECIFIED);

    return [
      `Hello ${CONTACT.firstName},`,
      '',
      'I am interested in getting a website developed.',
      '',
      `Name: ${v(d.name)}`,
      `Business: ${v(d.business)}`,
      `Phone: ${v(d.phone)}`,
      `Email: ${v(d.email)}`,
      `Website Type: ${v(d.websiteType)}`,
      `Approx. Pages: ${v(d.pages)}`,
      `Product Catalogue: ${v(d.catalogue)}`,
      `WhatsApp Enquiry: ${v(d.whatsapp)}`,
      `Email Enquiry: ${v(d.emailEnquiry)}`,
      '',
      'Additional Requirements:',
      v(d.requirements),
      '',
      'Please let me know the estimated website development charges and next steps.',
    ].join('\n');
  }

  whatsappUrl(message: string): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  enquiryWhatsappUrl(d: EnquiryDetails): string {
    return this.whatsappUrl(this.buildEnquiryMessage(d));
  }

  enquiryMailtoUrl(d: EnquiryDetails): string {
    const business = d.business.trim() || d.name.trim();
    const subject = business ? `Website Development Enquiry - ${business}` : 'Website Development Enquiry';
    // CRLF line breaks are the most widely supported in mailto bodies.
    const body = this.buildEnquiryMessage(d).replace(/\n/g, '\r\n');
    return `mailto:${this.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /** Short message for the general “WhatsApp me” buttons (no form data available). */
  quickWhatsappUrl(): string {
    return this.whatsappUrl(`Hello ${CONTACT.firstName}, I'd like to discuss a website for my business.`);
  }

  quickMailtoUrl(): string {
    return `mailto:${this.email}?subject=${encodeURIComponent('Website Development Enquiry')}`;
  }
}
