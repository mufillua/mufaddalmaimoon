import { IconName } from '../shared/icon/icon';

/* --------------------------------------------------------------------------
   All site content lives here so it can be edited without touching templates.
   -------------------------------------------------------------------------- */

export const CONTACT = {
  name: 'Mufaddal Maimoon',
  firstName: 'Mufaddal',
  role: 'Web Developer',
  phoneDisplay: '+919073053864',
  phoneIntl: '919073053864',          // used for wa.me + tel: links
  email: 'mufimaimoon@gmail.com',
  tagline: 'Modern websites for growing businesses.',
} as const;

export interface NavLink {
  label: string;
  id: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Process', id: 'process' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export const SERVICES: Service[] = [
  {
    title: 'Business Websites',
    description: 'Professional websites that establish your business online.',
    icon: 'browser',
  },
  {
    title: 'Product Catalogue Websites',
    description: 'Showcase your products with categories, product pages and enquiry options.',
    icon: 'catalogue',
  },
  {
    title: 'Website Redesign',
    description: 'Modernize outdated websites with a cleaner and more professional experience.',
    icon: 'redesign',
  },
  {
    title: 'WhatsApp & Email Enquiry',
    description: 'Allow customers to contact your business directly from product or service pages.',
    icon: 'chat',
  },
  {
    title: 'Responsive Web Design',
    description: 'Websites optimized for desktop, tablet and mobile.',
    icon: 'devices',
  },
  {
    title: 'Hosting & Deployment',
    description: 'Assistance with domains, hosting, deployment and getting the website live.',
    icon: 'cloud',
  },
  {
    title: 'Custom Website Development',
    description: 'Custom features and layouts based on the requirements of the business.',
    icon: 'code',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Understand', description: 'We discuss your business, goals and website requirements.' },
  { number: '02', title: 'Plan', description: 'I structure the website, pages, content and user experience.' },
  { number: '03', title: 'Design & Develop', description: 'The website is designed and developed with a modern responsive interface.' },
  { number: '04', title: 'Review', description: 'You review the website and provide feedback.' },
  { number: '05', title: 'Launch', description: 'The final website is deployed and made ready for your customers.' },
];

export interface ClientProject {
  name: string;
  category: string;
  description: string;
  url: string;
  domain: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  /** Background of the logo plaque so the logo sits on its own colour. */
  plaque: 'light' | 'dark';
  featured?: boolean;
}

/* Descriptions are deliberately limited to the information supplied
   (business type + website type). No invented facts about the clients. */
export const CLIENTS: ClientProject[] = [
  {
    name: 'Western Hardware Mart',
    category: 'Industrial Hardware / Product Catalogue',
    description: 'A product catalogue website for an hydraulic business.',
    url: 'https://www.westernhardwaremart.com',
    domain: 'westernhardwaremart.com',
    logo: 'assets/images/clients/western-hardware-mart.webp',
    logoWidth: 760,
    logoHeight: 183,
    plaque: 'light',
    featured: true,
  },
  {
    name: 'Steel Tools India',
    category: 'Industrial Tools / Product Catalogue',
    description: 'A product catalogue website for an industrial tools business.',
    url: 'https://www.steeltoolsind.com/',
    domain: 'steeltoolsind.com',
    logo: 'assets/images/clients/steel-tools-india.webp',
    logoWidth: 760,
    logoHeight: 224,
    plaque: 'light',
  },
  {
    name: 'B H Rubber Products',
    category: 'Industrial Rubber & Safety Solutions',
    description: 'A business website presenting industrial rubber and safety solutions.',
    url: 'https://www.bhrubberproducts.com/',
    domain: 'bhrubberproducts.com',
    logo: 'assets/images/clients/bh-rubber-products.webp',
    logoWidth: 820,
    logoHeight: 346,
    plaque: 'light',
  },
  {
    name: 'Burhani Seal Centre',
    category: 'Industrial Seals / Engineering Products',
    description: 'A business website presenting industrial seals and engineering products.',
    url: 'https://burhani-seal-centre.vercel.app/',
    domain: 'burhani-seal-centre.vercel.app',
    logo: 'assets/images/clients/burhani-seal-centre.png',
    logoWidth: 226,
    logoHeight: 77,
    plaque: 'dark',
  },
];

export const APPROACH: string[] = [
  'Understanding the business first',
  'Clean and modern design',
  'Mobile responsiveness',
  'Easy navigation',
  'Clear product and service presentation',
  'Direct customer enquiries',
  'WhatsApp and email integration',
  'Reliable deployment',
];

export interface WhyPoint {
  title: string;
  description: string;
  icon: IconName;
}

export const WHY_POINTS: WhyPoint[] = [
  {
    title: 'Designed Around Your Business',
    description: 'Pages, sections and wording are planned around what you sell and how your customers buy — not squeezed into a ready-made theme.',
    icon: 'target',
  },
  {
    title: 'Mobile Friendly',
    description: 'Many customers will find you on their phone first, so layouts are built to work comfortably on small screens.',
    icon: 'phone-device',
  },
  {
    title: 'Easy Customer Enquiries',
    description: 'WhatsApp and email buttons placed where customers need them, so getting in touch takes a single tap.',
    icon: 'chat',
  },
  {
    title: 'Product & Service Focused',
    description: 'Your products and services are the main content — organised into clear categories with the details customers look for.',
    icon: 'catalogue',
  },
  {
    title: 'Modern User Experience',
    description: 'Clean layouts, readable type and straightforward navigation that make your business look current and trustworthy.',
    icon: 'layout',
  },
  {
    title: 'Direct Communication',
    description: 'You talk directly to the person building your website, from the first discussion through to launch.',
    icon: 'message',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'How much does a business website cost?',
    answer: 'Pricing depends on what your website needs — the number of pages, the size of your product catalogue, any special functionality, and help with hosting or domain setup. Share your requirements through the enquiry form or on WhatsApp and I’ll give you a quote based on your project.',
  },
  {
    question: 'Can you build a product catalogue website?',
    answer: 'Yes. Catalogue websites can showcase your products with categories, product details and direct enquiry options, so customers can ask about a product straight from its page.',
  },
  {
    question: 'Can customers contact the business through WhatsApp?',
    answer: 'Yes. WhatsApp buttons can be added across the website — including on individual product or service pages — and can open a chat with a pre-filled message so customers don’t have to type everything themselves.',
  },
  {
    question: 'Can you add email enquiry functionality?',
    answer: 'Yes. Email enquiry options can be added so customers can send their details and requirements to your business by email.',
  },
  {
    question: 'Will the website work on mobile phones?',
    answer: 'Websites are developed responsively, so the layout adapts to desktop, tablet and mobile screens.',
  },
  {
    question: 'Can you help with hosting and domain setup?',
    answer: 'Yes. I can assist with deployment, hosting and domain setup so your website is live and reachable on your own address.',
  },
];

export const WEBSITE_TYPES = [
  'Business Website',
  'Product Catalogue Website',
  'Website Redesign',
  'Landing Page',
  'Custom Website',
  'Not Sure',
] as const;

export const PAGE_RANGES = ['1 – 3 pages', '4 – 7 pages', '8 – 15 pages', 'More than 15 pages', 'Not sure yet'] as const;
