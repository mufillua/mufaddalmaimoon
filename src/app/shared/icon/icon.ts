import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Lightweight inline-SVG icon set (24×24, 1.75 stroke).
 * Avoids pulling in an icon library for ~20 simple glyphs.
 */
const ICONS = {
  browser: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18"/><path d="M6.5 6.25h.01M9 6.25h.01"/><path d="M7 12.5h6M7 15.5h10"/>',
  catalogue: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><path d="M13.5 15h7M13.5 19h4.5"/>',
  redesign: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20v-4h-4"/>',
  chat: '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.55L3.5 20.5l1.45-4.4A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/>',
  devices: '<rect x="2.5" y="4" width="14" height="10.5" rx="1.75"/><path d="M6.5 18h6"/><rect x="15.5" y="9" width="6" height="11" rx="1.5"/><path d="M18.5 17.5h.01"/>',
  cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.5-8.97 6 6 0 0 1 11.6 1.47A3.75 3.75 0 0 1 17.5 18.5Z"/><path d="M12 15.5v-5M9.75 12.5 12 10.25l2.25 2.25"/>',
  code: '<path d="m8.5 8-4 4 4 4"/><path d="m15.5 8 4 4-4 4"/><path d="m13.5 5.5-3 13"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.75"/><circle cx="12" cy="12" r="1.25"/>',
  'phone-device': '<rect x="6.5" y="2.75" width="11" height="18.5" rx="2.5"/><path d="M10.5 5.75h3"/><path d="M12 18h.01"/>',
  layout: '<rect x="3" y="3.5" width="18" height="17" rx="2.5"/><path d="M3 9h18M10 9v11.5"/>',
  message: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z"/><path d="M8.5 9h7M8.5 12h4"/>',
  bolt: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z"/>',
  'arrow-right': '<path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.25"/><path d="m3.75 6.5 8.25 6.25 8.25-6.25"/>',
  phone: '<path d="M5.5 3.5h3l1.5 4.25-2 1.5a11 11 0 0 0 6.75 6.75l1.5-2 4.25 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z"/>',
  check: '<path d="m5 12.5 4.25 4.25L19 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  sparkle: '<path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4"/><path d="m6 6 2.25 2.25M15.75 15.75 18 18M6 18l2.25-2.25M15.75 8.25 18 6"/>',
  // WhatsApp-style glyph: speech bubble with handset (filled)
  whatsapp: '<path fill="currentColor" stroke="none" d="M12 2.25a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.75 9.75 0 1 0 12 2.25Zm0 17.7a8 8 0 0 1-4.1-1.13l-.3-.18-2.95.78.79-2.88-.2-.3A8 8 0 1 1 12 19.95Z"/><path fill="currentColor" stroke="none" d="M16.4 13.9c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06a6.5 6.5 0 0 1-1.93-1.2 7.3 7.3 0 0 1-1.34-1.66c-.14-.24 0-.37.1-.49l.37-.43c.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46a.88.88 0 0 0-.64.3 2.68 2.68 0 0 0-.84 2c0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.5.58.19 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z"/>',
} as const;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    class: 'icon',
    '[class]': '"icon icon-" + name()',
  },
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.width]="size()"
      [attr.height]="size()"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
      [innerHTML]="svg()"
    ></svg>
  `,
  styles: `
    :host { display: inline-flex; flex: none; line-height: 0; }
    svg { width: 100%; height: 100%; }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<number | string>(24);

  private readonly sanitizer = inject(DomSanitizer);

  // Markup comes only from the static ICONS map above, so bypassing is safe.
  protected readonly svg = computed(() => this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()]));
}
