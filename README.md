# Mufaddal Maimoon — Freelance Web Developer

Personal business website built with Angular 20 (standalone components, signals, OnPush).

## Run locally

```bash
npm install
npm start          # http://localhost:4200
```

## Production build

```bash
npm run build      # output: dist/mufaddal-portfolio/browser
```

Deploy the contents of `dist/mufaddal-portfolio/browser` to any static host
(Vercel, Netlify, Firebase Hosting, cPanel, etc.). It is a single page, so no
rewrite rules are needed.

## Where to edit things

| What | File |
| --- | --- |
| Phone, email, WhatsApp number, nav links, services, process steps, client projects, FAQ, form options | `src/app/data/site-data.ts` |
| Colour palette, fonts, spacing, buttons (design tokens) | `src/styles.scss` (`:root` variables) |
| WhatsApp / email message format | `src/app/services/contact.service.ts` |
| Page title, meta description, Open Graph tags | `src/index.html` |
| Logos and images | `public/assets/images/` |

### Adding a new client project

1. Put the logo in `public/assets/images/clients/`.
2. Add an entry to `CLIENTS` in `src/app/data/site-data.ts` (name, category, description, URL, logo path and its pixel size).
   Set `plaque: 'dark'` for logos designed on a dark background.

## Structure

```
src/app/
  components/
    navbar/            sticky header, active-section highlight, mobile menu
    hero/              hero copy, client logo strip
      hero-visual/     CSS-only browser + phone mockup with floating chips
    services/
    portfolio/         featured project + project cards
    process/           5-step timeline
    about/
    why-choose-me/
    enquiry-form/      quote form → WhatsApp / email, live message preview
    faq/               accessible accordion
    cta/
    footer/
    whatsapp-fab/      floating WhatsApp button
  data/site-data.ts    all content
  services/contact.service.ts
  shared/icon/         inline SVG icon set
  shared/reveal.directive.ts  scroll reveal (respects prefers-reduced-motion)
```
