import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CONTACT, PAGE_RANGES, WEBSITE_TYPES } from '../../data/site-data';
import { ContactService, EnquiryDetails, YesNo } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';
import { RevealDirective } from '../../shared/reveal.directive';

/** Accepts common phone formats; requires 10–15 digits. */
function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').trim();
  if (!value) return null;
  if (!/^[+()\d\s-]+$/.test(value)) return { phone: true };
  const digits = value.replace(/\D/g, '').length;
  return digits >= 10 && digits <= 15 ? null : { phone: true };
}

type Channel = 'whatsapp' | 'email';

interface ToggleField {
  key: 'catalogue' | 'whatsapp' | 'emailEnquiry';
  label: string;
}

@Component({
  selector: 'app-enquiry-form',
  imports: [ReactiveFormsModule, Icon, RevealDirective],
  templateUrl: './enquiry-form.html',
  styleUrl: './enquiry-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnquiryForm {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly contactService = inject(ContactService);

  protected readonly contact = CONTACT;
  protected readonly websiteTypes = WEBSITE_TYPES;
  protected readonly pageRanges = PAGE_RANGES;
  protected readonly yesNo: Exclude<YesNo, ''>[] = ['Yes', 'No'];
  protected readonly toggles: ToggleField[] = [
    { key: 'catalogue', label: 'Do you need a product catalogue?' },
    { key: 'whatsapp', label: 'Do you need WhatsApp enquiry?' },
    { key: 'emailEnquiry', label: 'Do you need email enquiry?' },
  ];

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    business: ['', [Validators.maxLength(120)]],
    phone: ['', [Validators.required, phoneValidator]],
    email: ['', [Validators.email, Validators.maxLength(120)]],
    websiteType: ['', [Validators.required]],
    pages: [''],
    catalogue: ['' as YesNo],
    whatsapp: ['' as YesNo],
    emailEnquiry: ['' as YesNo],
    requirements: ['', [Validators.maxLength(1500)]],
  });

  private readonly value = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  /** Live preview of exactly what will be sent. */
  protected readonly preview = computed(() =>
    this.contactService.buildEnquiryMessage({ ...this.form.getRawValue(), ...this.value() } as EnquiryDetails),
  );

  protected readonly status = signal<{ type: 'error' | 'success'; text: string } | null>(null);
  protected readonly previewOpen = signal(false);

  protected showError(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected send(channel: Channel): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      const missing = this.invalidLabels();
      this.status.set({ type: 'error', text: `Please check: ${missing.join(', ')}.` });
      const first = this.host.nativeElement.querySelector<HTMLElement>('form .ng-invalid[formControlName]');
      first?.focus();
      return;
    }

    const details = this.form.getRawValue() as EnquiryDetails;

    if (channel === 'whatsapp') {
      this.openLink(this.contactService.enquiryWhatsappUrl(details), true);
      this.status.set({ type: 'success', text: 'WhatsApp has opened with your enquiry. Press send in WhatsApp to deliver it.' });
    } else {
      this.openLink(this.contactService.enquiryMailtoUrl(details), false);
      this.status.set({
        type: 'success',
        text: `Your email app should open with the enquiry ready to send. If nothing opens, email ${CONTACT.email} directly.`,
      });
    }
  }

  /**
   * Opens a link through a temporary anchor. Runs inside the click handler,
   * so browsers treat it as a user action (no popup blocking).
   */
  private openLink(url: string, newTab: boolean): void {
    const a = document.createElement('a');
    a.href = url;
    if (newTab) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  private invalidLabels(): string[] {
    const labels: Record<string, string> = {
      name: 'your name',
      phone: 'a valid phone number',
      email: 'a valid email address',
      websiteType: 'the website type',
      business: 'business name',
      requirements: 'additional requirements (too long)',
    };
    return Object.entries(this.form.controls)
      .filter(([, c]) => c.invalid)
      .map(([k]) => labels[k] ?? k);
  }
}
