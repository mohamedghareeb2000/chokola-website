'use client';

import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BRAND = {
  name: 'Chokola',
  subtitle: 'Dessert Lounge',
  primary: '#E7B5BB',
  secondary: '#4A2E2B',
  background: '#FFF5F0',
  accent: '#B07A8D',
  cream: '#EAD9C8',
  gold: '#C9A86A',
  muted: '#4A2E2B',
};

const MENU_CATEGORIES = [
  {
    id: 'crepes-waffles',
    name: 'Crepes & Waffles',
    image: '/about-waffles-plate.jpg',
    alt: 'Crepe and waffle dessert with chocolate and fresh toppings',
    products: [
      { name: 'Classic Crepe', description: 'Crepe served with delicious Nutella filling', price: '$7.99' },
      { name: 'Oreo Lovers', description: 'Oreo pieces combined with fresh banana and chocolate flavors', price: '$9.99' },
      { name: 'House Special', description: 'Strawberry, banana, and Lotus Biscoff topped with sweet sauces', price: '$10.99' },
      { name: 'Kinder Bueno', description: 'Kinder Bueno, Kinder Stick, and white chocolate drizzle', price: '$10.99' },
      { name: 'Dubai Crepe', description: 'Kunafa filling with milk chocolate, pistachio butter, and crushed pistachio', price: '$14.99' },
    ],
  },
  {
    id: 'waffle-sticks',
    name: 'Waffle Sticks',
    image: '/about-waffle-chocolate-wide.png',
    alt: 'Waffle sticks topped with chocolate and sweet sauces',
    products: [
      { name: 'Lotus Waffle Sticks', description: 'Lotus butter, white chocolate, and crushed Lotus cookies', price: '$8.49' },
      { name: 'Chocolate Waffle Sticks', description: 'Waffle sticks dipped in milk chocolate with white chocolate drizzle', price: '$6.99' },
      { name: 'Pistachio Waffle Sticks', description: 'Pistachio butter with white chocolate and crushed pistachio', price: '$8.49' },
      { name: 'Oreo Waffle Sticks', description: 'Milk chocolate, white chocolate, and crushed Oreos', price: '$7.99' },
      { name: 'Strawberry Cheesecake Waffle Sticks', description: 'Strawberry sauce, cheesecake bites, and white chocolate', price: '$8.49' },
    ],
  },
  {
    id: 'shakes',
    name: 'Shakes',
    image: '/about-pink-milkshake.jpg',
    alt: 'Creamy dessert milkshake with sweet toppings',
    products: [
      { name: 'Oreo Shake', description: 'Creamy milkshake blended with Oreo cookies', price: '$8.99' },
      { name: 'Kinder Shake', description: 'Rich Kinder chocolate flavored milkshake', price: '$8.99' },
      { name: 'Lotus Shake', description: 'Lotus butter blended with creamy vanilla shake', price: '$9.99' },
      { name: 'Ferrero Shake', description: 'Chocolate hazelnut milkshake with Ferrero flavor', price: '$9.99' },
      { name: 'Dubai Shake', description: 'Kunafa, pistachio, and chocolate inspired milkshake', price: '$11.99' },
    ],
  },
  {
    id: 'cups',
    name: 'Cups',
    image: '/about-ice-cream-cup.jpg',
    alt: 'Layered dessert cup with chocolate, cream, and fresh toppings',
    products: [
      { name: 'Strawberry Cup', description: 'Strawberry layers with cream and fresh strawberries', price: '$8.99' },
      { name: 'Dubai Chocolate Cup', description: 'Kunafa, pistachio butter, milk chocolate, and crushed pistachio', price: '$10.99' },
      { name: 'Triple Chocolate Cup', description: 'Strawberry topped with white, dark, and milk chocolate', price: '$9.99' },
    ],
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    image: '/about-cheesecake-chocolate.jpg',
    alt: 'Chocolate-drizzled cheesecake slice served on a plate',
    products: [
      { name: 'Chocolate Cheesecake', description: 'Milk chocolate cheesecake with white chocolate drizzle', price: '$8.99' },
      { name: 'Strawberry Cheesecake', description: 'Strawberry sauce topped with white chocolate drizzle', price: '$8.99' },
      { name: 'Oreo Cheesecake', description: 'Cheesecake with crushed Oreos and chocolate toppings', price: '$9.99' },
      { name: 'Lotus Cheesecake', description: 'Lotus butter cheesecake with crushed Lotus cookies', price: '$9.99' },
      { name: 'Pistachio Cheesecake', description: 'Pistachio butter cheesecake with crushed pistachio', price: '$9.99' },
    ],
  },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Branch', href: '#branch' },
];

const SECTION_IDS = ['home', 'about', 'menu', 'branch', 'contact'];

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Branch', href: '#branch' },
  { label: 'Contact', href: '#contact' },
];

const HERO_SLIDES = [
  {
    name: 'Chocolate Strawberry Cake',
    price: '$8.40',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=1400&q=90',
    alt: 'Chocolate strawberry dessert with cream and sauce',
  },
  {
    name: 'Velvet Cream Desserts',
    price: '$7.90',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1400&q=90',
    alt: 'Pink frosted dessert with cream and sprinkles',
  },
  {
    name: 'Berry Dessert Cup',
    price: '$6.80',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=90',
    alt: 'Berry dessert cup with creamy layers',
  },
  {
    name: 'Chocolate Cake Slice',
    price: '$9.20',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1400&q=90',
    alt: 'Chocolate cake slice with rich cocoa texture',
  },
];

const FORM_INITIAL_STATE = {
  name: '',
  phone: '',
  email: '',
  reason: '',
  message: '',
};

const TEXT_FIELD_MAX_LENGTH = 50;
const MESSAGE_MAX_LENGTH = 500;
const PHONE_MIN_DIGITS = 7;
const PHONE_MAX_DIGITS = 12;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const US_COUNTRY_CODE = '+1';
const CONTACT_REASON_OPTIONS = [
  'Menu question',
  'Branch visit',
  'Celebration or event',
  'Collaboration',
  'Feedback',
  'Other',
];

function formatContactPhoneDigits(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, PHONE_MAX_DIGITS)
    .replace(/(\d{3})(?=\d)/g, '$1 ');
}

function getContactFieldErrors(formState) {
  const errors = {};
  const name = formState.name.trim();
  const phone = formState.phone.replace(/\D/g, '');
  const email = formState.email.trim();
  const reason = formState.reason.trim();
  const message = formState.message.trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length > TEXT_FIELD_MAX_LENGTH) {
    errors.name = 'Name cannot exceed 50 characters.';
  }
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > TEXT_FIELD_MAX_LENGTH) {
    errors.email = 'Email cannot exceed 50 characters.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!phone || phone.length < PHONE_MIN_DIGITS) {
    errors.phone = 'Please enter a valid contact number.';
  }
  if (!reason || !CONTACT_REASON_OPTIONS.includes(reason)) {
    errors.reason = 'Please choose a reason for contact.';
  }
  if (!message) {
    errors.message = 'Please write your message.';
  } else if (formState.message.length > MESSAGE_MAX_LENGTH) {
    errors.message = 'Message cannot exceed 500 characters.';
  }

  return errors;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Icon({ name, size = 20, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': 'true',
  };

  const paths = {
    sparkles: (
      <>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </>
    ),
    mapPin: (
      <>
        <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    clock3: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1z" />,
    x: (
      <>
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
      </>
    ),
    music2: (
      <>
        <circle cx="8" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        <path d="M11 18V5l10-2v13" />
      </>
    ),
    check: <path d="M20 6L9 17l-5-5" />,
    cupcake: (
      <>
        <path d="M7 10h10" />
        <path d="M8 10l1.2 10h5.6L16 10" />
        <path d="M9 7.5a3 3 0 0 1 6 0" />
        <path d="M12 4.5V3" />
        <path d="M9 14h6" />
      </>
    ),
    messageCircle: <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5z" />,
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.sparkles}</svg>;
}

const Logo = memo(function Logo() {
  return (
    <div className="relative flex aspect-[982/435] w-[108px] shrink-0 items-center bg-transparent sm:w-[125px] lg:w-[145px]">
      <Image
        src="/chokola-logo-main-cropped.png"
        alt="Chokola Dessert Lounge logo"
        fill
        priority
        sizes="(max-width: 640px) 108px, (max-width: 1024px) 125px, 145px"
        className="object-contain object-center"
      />
    </div>
  );
});

function Navbar({ mobileMenuOpen, onToggleMenu, onCloseMenu, isScrolled, activeSection }) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 px-4 transition-all duration-300 sm:px-6 lg:px-10 ${
        isScrolled
          ? 'bg-[#472c29] shadow-[0_10px_24px_rgb(0_0_0_/_0.16)]'
          : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div
        className="relative mx-auto flex min-h-[4.55rem] w-full max-w-[1520px] items-center justify-between gap-4 py-2 transition-all duration-300 lg:min-h-[4.85rem] lg:py-2"
      >
        <a
          href="#home"
          onClick={onCloseMenu}
          aria-label="Go to Chokola homepage"
          className="relative z-10 rounded-[18px] px-2 py-1"
        >
          <Logo />
        </a>

        <div className="relative z-10 hidden flex-1 items-center justify-center gap-2 text-[15.5px] font-semibold text-chokola-cream lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);

            return (
              <a
                key={link.href}
                href={link.href}
                className={`group relative inline-flex min-h-11 items-center rounded-full px-4 py-2.5 transition-all duration-300 ${
                  isScrolled
                    ? 'text-chokola-cream hover:bg-chokola-cream/10 focus-visible:bg-chokola-cream/10'
                    : 'text-chokola-cream hover:bg-chokola-gold/20 focus-visible:bg-chokola-gold/20'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`nav-text z-10 ${isActive ? 'nav-text-active font-semibold' : ''}`}>
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="relative z-10 ml-auto flex items-center gap-3">
          <a
            href="#contact"
            className="hidden min-h-11 items-center rounded-full bg-[#FFF5F0] px-6 text-sm font-semibold leading-none text-[#472c29] transition-colors duration-300 hover:bg-[#C9A86A] hover:text-[#472c29] focus-visible:bg-[#C9A86A] focus-visible:text-[#472c29] sm:inline-flex"
          >
            Contact Us
          </a>
          <button
            type="button"
            onClick={onToggleMenu}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 lg:hidden ${
              isScrolled
                ? 'border-chokola-cream/20 bg-chokola-cream/10 text-chokola-cream hover:bg-chokola-cream/20'
                : 'border-chokola-cream/20 bg-chokola-cream/10 text-chokola-cream hover:bg-chokola-cream/20'
            }`}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className={`mx-auto max-w-[1520px] py-3 backdrop-blur-xl lg:hidden ${
            isScrolled
              ? 'bg-[#472c29]'
              : 'bg-chokola-chocolate/95'
          }`}
        >
          <div className="grid gap-2 text-sm font-semibold text-chokola-cream">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onCloseMenu}
                  className={`rounded-full px-4 py-3 transition-all duration-300 ${
                    isScrolled
                      ? 'text-chokola-cream hover:bg-chokola-cream/10 focus-visible:bg-chokola-cream/10'
                      : 'text-chokola-cream hover:bg-chokola-gold/20 focus-visible:bg-chokola-gold/20'
                  } ${isActive ? 'font-semibold' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`nav-text ${isActive ? 'nav-text-active' : ''}`}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function Hero({ mobileMenuOpen, onToggleMenu, onCloseMenu, isScrolled, activeSection }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-chokola-chocolate px-4 pb-[4.5rem] pt-[122px] text-chokola-cream sm:px-6 sm:pt-[128px] lg:px-10 lg:pb-20 lg:pt-[126px]"
      aria-labelledby="hero-title"
    >
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        isScrolled={isScrolled}
        activeSection={activeSection}
      />
      <div className="hero-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-chokola-cream sm:h-28" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-190px)] w-full max-w-[1520px] items-center gap-6 sm:gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:gap-10 xl:gap-14">
        <div className="max-w-[720px] lg:-mt-5">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-chokola-gold">
            Since 2021 • Crafted Fresh Daily
          </p>
          <h1
            id="hero-title"
            className="max-w-[760px] font-serif leading-[0.9] text-chokola-cream"
          >
            <span className="block text-[2.85rem] font-bold sm:text-[3.55rem] md:text-[4.15rem] lg:text-[4.35rem] xl:text-[4.95rem]">
              Dessert,
            </span>
            <span className="mt-2 block text-[2.55rem] font-semibold text-chokola-blush sm:text-[3.12rem] md:text-[3.7rem] lg:text-[3.86rem] xl:text-[4.45rem]">
              after dark.
            </span>
          </h1>

          <p className="mt-6 max-w-[590px] text-base leading-8 text-chokola-cream/80 sm:text-lg sm:leading-9">
            Premium desserts staged in warm chocolate light, crafted fresh daily for celebrations, late cravings, and lounge moments worth lingering over.
          </p>

          <div className="mt-8 flex flex-wrap gap-4" aria-label="Hero calls to action">
            <a
              href="#menu"
              className="inline-flex min-h-14 min-w-[160px] items-center justify-center rounded-full border border-chokola-cream bg-chokola-cream px-7 text-sm font-bold leading-none text-chokola-chocolate transition-all duration-300 hover:-translate-y-0.5 hover:bg-chokola-gold focus-visible:bg-chokola-gold sm:min-w-[168px] sm:px-8"
            >
              View Menu
            </a>
            <a
              href="#branch"
              className="inline-flex min-h-14 min-w-[160px] items-center justify-center rounded-full border border-chokola-cream/35 bg-chokola-cream/10 px-7 text-sm font-bold leading-none text-chokola-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chokola-cream hover:text-chokola-chocolate focus-visible:bg-chokola-cream focus-visible:text-chokola-chocolate sm:min-w-[168px] sm:px-8"
            >
              Visit Branch
            </a>
          </div>

          <div className="mt-7 grid max-w-[560px] grid-cols-1 gap-3 border-t border-chokola-cream/16 pt-5 text-chokola-cream/72 sm:grid-cols-3" aria-label="Chokola highlights">
            <div className="rounded-2xl bg-chokola-cream/7 px-4 py-3">
              <p className="text-xs font-semibold leading-5 text-chokola-cream/70">Dessert selection</p>
              <div className="mt-2 flex items-center gap-2 text-chokola-cream">
                <Icon name="cupcake" size={18} className="text-chokola-gold" />
                <p className="font-serif text-2xl font-semibold leading-none">20+</p>
              </div>
            </div>
            <div className="rounded-2xl bg-chokola-cream/7 px-4 py-3">
              <p className="text-xs font-semibold leading-5 text-chokola-cream/70">Guest experience</p>
              <p className="mt-2 font-serif text-2xl font-semibold leading-none text-chokola-cream">4.9<span className="ml-1 text-chokola-gold">★</span></p>
            </div>
            <div className="rounded-2xl bg-chokola-cream/7 px-4 py-3">
              <p className="text-xs font-semibold leading-5 text-chokola-cream/70">Kitchen rhythm</p>
              <p className="mt-2 font-serif text-2xl font-semibold leading-none text-chokola-cream">Daily</p>
            </div>
          </div>
        </div>

        <div className="relative flex h-[320px] items-center justify-center sm:h-[380px] lg:h-[650px] lg:translate-x-3 lg:justify-end xl:translate-x-8">
          <div className="hero-gold-glow absolute left-[54%] top-[46%] h-[72%] w-[82%] -translate-x-1/2 -translate-y-1/2 blur-3xl" aria-hidden="true" />
          <div className="hero-blush-glow absolute left-[62%] top-[42%] h-[70%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" aria-hidden="true" />
          <div className="hero-dessert-plate absolute bottom-[18%] left-[57%] h-[20%] w-[68%] -translate-x-1/2 rounded-full blur-sm" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span className="absolute right-[20%] top-[22%] h-1.5 w-1.5 rounded-full bg-chokola-cream/20 blur-[0.5px]" />
            <span className="absolute right-[9%] top-[36%] h-2 w-2 rounded-full bg-chokola-blush/20 blur-[0.5px]" />
            <span className="absolute right-[31%] top-[58%] h-1 w-1 rounded-full bg-chokola-gold/50" />
            <span className="absolute right-[16%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-chokola-cream/20 blur-[0.5px]" />
            <span className="absolute right-[43%] top-[33%] h-1 w-1 rounded-full bg-chokola-mauve/20" />
          </div>
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-[-10vw] bottom-[-2%] top-0 z-10 sm:inset-x-[-8vw] lg:inset-x-[-9vw] xl:inset-x-[-10vw]"
          >
            <Image
              src="/open-waffle-hero-centered.png"
              alt="Chocolate and cream waffle dessert with chocolate pieces"
              fill
              priority
              sizes="(max-width: 768px) 96vw, (max-width: 1024px) 720px, 900px"
              className="scale-[1.08] object-contain object-bottom drop-shadow-[0_28px_34px_rgb(var(--rgb-chocolate-brown)_/_0.34)]"
            />
          </motion.div>
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-20 hidden min-h-11 -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-chokola-cream/75 transition-colors duration-300 hover:text-chokola-cream md:inline-flex"
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ↓
        </motion.span>
        Discover More
      </a>
    </section>
  );
}

function MenuFeature({ category }) {
  return (
    <motion.figure
      key={category.id}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="group relative h-[340px] overflow-hidden rounded-[28px] bg-chokola-chocolate sm:h-[420px] lg:h-[calc(100vh-300px)] lg:min-h-[400px] lg:max-h-[500px]"
    >
      <Image
        src={category.image}
        alt={category.alt}
        fill
        priority={false}
        sizes="(max-width: 1023px) 100vw, 48vw"
        className="object-cover object-[50%_52%] saturate-[0.96] contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-chokola-chocolate/82 via-chokola-chocolate/20 to-transparent" aria-hidden="true" />
      <div className="absolute left-5 top-5 rounded-full bg-chokola-cream/94 px-4 py-2 text-xs font-bold text-chokola-chocolate sm:left-6 sm:top-6">
        {category.name}
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-chokola-cream sm:p-7 lg:p-8">
        <p className="text-sm font-semibold text-chokola-cream/78">Selected category</p>
        <h3 className="mt-3 max-w-[520px] font-serif text-3xl font-semibold leading-[1.08] text-chokola-cream sm:text-4xl">
          {category.name}
        </h3>
        <p className="mt-3 max-w-[430px] text-sm font-medium leading-7 text-chokola-cream/84">
          {category.products.length} Chokola favorites from the lounge menu.
        </p>
      </figcaption>
    </motion.figure>
  );
}

function MenuProductRow({ product }) {
  return (
    <motion.li variants={fadeUp} className="border-t border-chokola-chocolate/12 first:border-t-0">
      <article className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5 py-3 sm:py-3.5">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-tight text-chokola-chocolate sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 truncate text-xs font-medium leading-5 text-chokola-chocolate/58 sm:text-[13px]">
            {product.description}
          </p>
        </div>
        <p className="pt-0.5 text-sm font-bold text-chokola-chocolate sm:text-base">
          {product.price}
        </p>
      </article>
    </motion.li>
  );
}

function MenuSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(MENU_CATEGORIES[0].id);
  const activeCategory = MENU_CATEGORIES.find((category) => category.id === activeCategoryId) || MENU_CATEGORIES[0];
  const visibleProducts = activeCategory.products.slice(0, 5);

  return (
    <section id="menu" className="[scroll-margin-top:-48px] bg-chokola-cream px-4 pb-24 pt-4 sm:px-6 sm:pb-28 sm:pt-6 lg:px-10 lg:pb-32 lg:pt-6" aria-labelledby="menu-title">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="min-w-0">
          <h2 id="menu-title" className="text-center font-sans text-4xl font-bold leading-[1.04] text-chokola-chocolate sm:text-5xl lg:text-[3.65rem]">
            Our Menu
          </h2>

          <div className="mt-7 max-w-[650px]">
            <p className="text-base font-semibold leading-none text-chokola-chocolate sm:text-lg">
              Dessert Favorites
            </p>
            <p className="mt-3 text-base leading-8 text-chokola-chocolate/76 lg:max-w-[560px]">
              Choose a dessert family to preview a focused set of Chokola lounge favorites.
            </p>
          </div>
        </div>

        <div className="mt-9 grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10">
          <MenuFeature category={activeCategory} />

          <div className="min-h-full min-w-0 rounded-[28px] bg-chokola-nude/62 p-5 sm:p-7 lg:h-[calc(100vh-300px)] lg:min-h-[400px] lg:max-h-[500px] lg:p-7">
            <div className="flex h-full flex-col">
              <div
                className="grid grid-cols-2 gap-2 border-b border-chokola-chocolate/14 pb-5 sm:grid-cols-3 lg:grid-cols-5"
                role="tablist"
                aria-label="Dessert menu categories"
              >
                {MENU_CATEGORIES.map((category) => {
                  const isActive = category.id === activeCategory.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="menu-products-panel"
                      id={`menu-tab-${category.id}`}
                      onClick={() => setActiveCategoryId(category.id)}
                      className={`min-h-12 rounded-full px-2 text-[12px] font-bold leading-none transition-colors duration-300 xl:min-h-14 xl:px-3 xl:text-sm ${
                        isActive
                          ? 'bg-chokola-chocolate text-chokola-cream'
                          : 'bg-chokola-cream text-chokola-chocolate hover:bg-chokola-chocolate hover:text-chokola-cream focus-visible:bg-chokola-chocolate focus-visible:text-chokola-cream'
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>

              <motion.ul
                key={activeCategory.id}
                variants={stagger}
                initial="hidden"
                animate="visible"
                id="menu-products-panel"
                role="tabpanel"
                aria-labelledby={`menu-tab-${activeCategory.id}`}
                className="mt-5 flex flex-1 flex-col justify-between"
              >
                {visibleProducts.map((product) => (
                  <MenuProductRow key={product.name} product={product} />
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutOrganicTopRight() {
  return (
    <svg className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 text-chokola-mauve opacity-[0.05]" viewBox="0 0 360 360" fill="none" aria-hidden="true">
      <path d="M226 28c62 18 105 71 100 133-6 72-66 124-143 129-75 5-133-41-143-105C29 119 69 55 135 31c28-10 58-12 91-3z" fill="currentColor" />
    </svg>
  );
}

function AboutFlowBottomLeft() {
  return (
    <svg className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-[34rem] text-chokola-nude opacity-[0.38]" viewBox="0 0 540 260" fill="none" aria-hidden="true">
      <path d="M24 168c69-98 142 18 218-72 55-65 115-47 160-12 40 31 78 31 120-8v184H24V168z" fill="currentColor" />
    </svg>
  );
}

function AboutTextCurve() {
  return (
    <svg className="pointer-events-none absolute right-[13%] top-[38%] h-36 w-[26rem] text-chokola-mauve opacity-[0.08]" viewBox="0 0 420 150" fill="none" aria-hidden="true">
      <path d="M8 93c84-68 173-64 264-3 45 30 89 38 139 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AboutGoldSparkles() {
  return (
    <svg className="pointer-events-none absolute right-[34%] top-[27%] h-16 w-24 text-chokola-gold opacity-70" viewBox="0 0 100 70" fill="none" aria-hidden="true">
      <path d="M20 12l4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9z" fill="currentColor" />
      <path d="M71 36l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" fill="currentColor" />
    </svg>
  );
}

function AboutWaveBottomRight() {
  return (
    <svg className="pointer-events-none absolute -bottom-6 right-[-5%] h-24 w-[17rem] text-chokola-blush opacity-[0.06]" viewBox="0 0 540 190" fill="none" aria-hidden="true">
      <path d="M0 118c80-57 156-44 228-1 87 52 180 52 312-32v105H0v-72z" fill="currentColor" />
    </svg>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-surface relative isolate overflow-hidden px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24 lg:px-10 lg:pb-14 lg:pt-28" aria-labelledby="about-title">
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-full bg-gradient-to-b from-chokola-chocolate/8 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-12%] top-20 h-[26rem] w-[26rem] rounded-full bg-chokola-blush/18 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-14 xl:gap-20">
        <div className="max-w-[610px]">
          <h2 id="about-title" className="max-w-[560px] font-sans text-4xl font-bold leading-[1.04] text-chokola-chocolate sm:text-5xl lg:text-[3.65rem]">
            About Us
          </h2>

          <div className="mt-7 space-y-4 text-[15px] leading-8 text-chokola-chocolate/78 sm:text-base sm:leading-8">
            <p>
              Chokola brings together warm waffles, rich chocolate, creamy ice cream, sweet cups, and handcrafted desserts made for sharing, celebrating, and creating memorable moments with family and friends.
            </p>
            <p>
              Inspired by modern dessert culture, we focus on premium ingredients, fresh daily preparation, and elegant presentation to create a warm and welcoming dessert lounge experience for every guest.
            </p>
            <p>
              From signature waffles and chocolate creations to sweet cups and seasonal treats, every detail at Chokola is designed to turn simple moments into unforgettable memories filled with sweetness.
            </p>
          </div>

          <div className="mt-9 border-y border-chokola-chocolate/12 py-5">
            <dl className="grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-semibold text-chokola-chocolate">Premium</dt>
                <dd className="mt-1 text-chokola-chocolate/68">Ingredients</dd>
              </div>
              <div>
                <dt className="font-semibold text-chokola-chocolate">Fresh daily</dt>
                <dd className="mt-1 text-chokola-chocolate/68">Preparation</dd>
              </div>
              <div>
                <dt className="font-semibold text-chokola-chocolate">Elegant</dt>
                <dd className="mt-1 text-chokola-chocolate/68">Presentation</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="relative min-h-[620px] lg:min-h-[680px]" aria-label="Chokola dessert lounge atmosphere">
          <div className="absolute inset-x-4 bottom-4 top-10 rounded-[28px] bg-chokola-chocolate" aria-hidden="true" />
          <div className="absolute right-0 top-0 h-[76%] w-full overflow-hidden rounded-[28px] bg-chokola-chocolate sm:w-[88%]">
            <Image
              src="/about-chef-dessert.jpg"
              alt="Chef finishing a plated dessert under warm lounge lighting"
              fill
              sizes="(max-width: 1024px) 92vw, 52vw"
              className="object-cover object-[48%_52%] saturate-[0.94] contrast-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-chokola-chocolate/72 via-chokola-chocolate/16 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-chokola-cream sm:bottom-7 sm:left-7 sm:right-7">
              <p className="max-w-[16rem] text-sm font-medium leading-6 text-chokola-cream/86">Prepared with the same warm, indulgent care guests feel in the lounge.</p>
              <span className="hidden h-2 w-2 shrink-0 rounded-full bg-chokola-gold sm:block" aria-hidden="true" />
            </div>
          </div>

          <figure className="absolute bottom-0 left-0 w-[58%] min-w-[230px] overflow-hidden rounded-[24px] bg-chokola-nude p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
              <Image
                src="/about-cheesecake-chocolate.jpg"
                alt="Chocolate-drizzled cheesecake slice served on a plate"
                fill
                sizes="(max-width: 640px) 58vw, (max-width: 1024px) 42vw, 24vw"
                className="object-cover object-[50%_52%]"
              />
            </div>
            <figcaption className="px-2 pb-1 pt-3 text-xs font-semibold leading-5 text-chokola-chocolate">
              Rich chocolate details, soft cream textures, and plated desserts made to linger over.
            </figcaption>
          </figure>

          <div className="absolute bottom-[18%] right-[8%] hidden max-w-[210px] bg-chokola-cream px-5 py-4 text-sm leading-6 text-chokola-chocolate/76 lg:block">
            <p className="font-semibold text-chokola-chocolate">Warm, social, crafted.</p>
            <p className="mt-1">A lounge experience, not just a dessert counter.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function getBranchStatus() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentMinutes = hour * 60 + minute;
  const opensAt = 10 * 60;
  const closesAt = 24 * 60;

  return currentMinutes >= opensAt && currentMinutes < closesAt ? 'Open Now' : 'Closed Now';
}

function BranchSection() {
  const [branchStatus, setBranchStatus] = useState('Open Now');
  const branch = {
    name: 'Chokola Dessert Lounge',
    address: '24 Sweet Avenue, Dessert District, Cairo, Egypt',
    phone: '+1 234 567 890',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=24%20Sweet%20Avenue%20Dessert%20District%20Cairo%20Egypt',
    amenities: ['Parking', 'Free WiFi', 'Family Friendly', 'Cozy Seating'],
  };
  const isOpen = branchStatus === 'Open Now';

  useEffect(() => {
    function updateBranchStatus() {
      setBranchStatus(getBranchStatus());
    }

    updateBranchStatus();
    const statusTimer = window.setInterval(updateBranchStatus, 60000);

    return () => window.clearInterval(statusTimer);
  }, []);

  return (
    <section id="branch" className="relative isolate overflow-hidden bg-chokola-nude px-6 py-24 text-chokola-chocolate lg:px-10 lg:py-28" aria-labelledby="branch-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(74,46,43,0.10),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(201,168,106,0.18),transparent_24%),linear-gradient(180deg,#EAD9C8_0%,#FFF5F0_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-chokola-cream to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-chokola-cream" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="group relative min-h-[420px] overflow-hidden rounded-[30px] bg-chokola-chocolate shadow-[0_24px_70px_rgb(var(--rgb-chocolate-brown)_/_0.18)] sm:min-h-[560px] lg:min-h-[680px]">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85"
              alt="Warm Chokola dessert lounge storefront and entrance"
              fill
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover saturate-[0.94] contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-chokola-chocolate/42 via-chokola-chocolate/4 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 ring-1 ring-inset ring-chokola-chocolate/12" aria-hidden="true" />
        </div>

        <div className="max-w-[500px] lg:py-8">
          <p className="font-serif text-4xl font-semibold leading-[1.04] text-chokola-chocolate sm:text-5xl lg:text-[3.65rem]">Our Branch</p>
          <h2 id="branch-title" className="mt-3 font-serif text-2xl font-semibold leading-[1.12] text-chokola-chocolate/88 sm:text-3xl lg:text-[2.15rem]">
            {branch.name}
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-chokola-chocolate/78">
            A cozy destination crafted for sweet moments and unforgettable dessert experiences.
          </p>

          <span className={`mt-8 inline-flex min-h-10 items-center gap-2.5 rounded-full border px-4 text-sm font-bold ${isOpen ? 'border-chokola-chocolate/10 bg-chokola-cream/70 text-chokola-chocolate' : 'border-chokola-blush/40 bg-chokola-blush/24 text-chokola-chocolate'}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-chokola-mauve' : 'bg-chokola-chocolate'}`} aria-hidden="true" />
            {branchStatus}
          </span>

          <div className="mt-9 space-y-5 text-sm leading-6 text-chokola-chocolate/82">
            <p className="flex items-start gap-3">
              <Icon name="mapPin" className="mt-0.5 shrink-0 text-chokola-mauve" size={18} />
              <span>{branch.address}</span>
            </p>
            <p className="flex items-start gap-3">
              <Icon name="clock3" className="mt-0.5 shrink-0 text-chokola-gold" size={18} />
              <span>Daily · 10 AM - 12 AM</span>
            </p>
            <p className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 shrink-0 text-chokola-mauve" size={18} />
              <span>{branch.phone}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {branch.amenities.map((item) => (
              <span key={item} className="rounded-full border border-chokola-chocolate/10 bg-chokola-cream/64 px-4 py-2.5 text-xs font-semibold text-chokola-chocolate/78">
                {item}
              </span>
            ))}
          </div>

          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Chokola Dessert Lounge directions in Google Maps"
            className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-chokola-chocolate px-8 text-sm font-bold leading-none text-chokola-cream transition-colors duration-300 hover:bg-chokola-gold hover:text-chokola-chocolate focus-visible:bg-chokola-gold focus-visible:text-chokola-chocolate"
          >
            Get Directions
            <Icon name="arrowRight" className="ml-2" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formState, setFormState] = useState(FORM_INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentErrors = getContactFieldErrors(formState);
  const isFormValid = Object.keys(currentErrors).length === 0;

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === 'name' || name === 'email') {
      nextValue = value.slice(0, TEXT_FIELD_MAX_LENGTH);
    }

    if (name === 'phone') {
      nextValue = value.replace(/\D/g, '').slice(0, PHONE_MAX_DIGITS);
    }

    if (name === 'message') {
      nextValue = value.slice(0, MESSAGE_MAX_LENGTH);
    }

    const nextState = { ...formState, [name]: nextValue };
    setFormState(nextState);
    setFieldErrors(getContactFieldErrors(nextState));
    setStatus({ type: 'idle', message: '' });
  }, [formState]);

  const validateClient = useCallback(() => {
    return getContactFieldErrors(formState);
  }, [formState]);

  async function handleContactSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = validateClient();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus({ type: 'error', message: 'Please complete the required fields.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (!response.ok) {
        setFieldErrors(result.fieldErrors || {});
        setStatus({ type: 'error', message: result.error || 'Please review the form and try again.' });
        return;
      }

      setFormState(FORM_INITIAL_STATE);
      setFieldErrors({});
      setStatus({ type: 'success', message: result.message || 'Thank you. Your message has been received.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusClass = status.type === 'success'
    ? 'text-chokola-chocolate bg-chokola-gold/20 border-chokola-gold/45'
    : status.type === 'error'
      ? 'text-chokola-chocolate bg-chokola-blush/35 border-chokola-mauve/45'
      : 'text-chokola-chocolate bg-chokola-cream border-chokola-nude';

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-chokola-nude px-6 py-20 text-chokola-chocolate lg:px-10 lg:py-24" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(74,46,43,0.10),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(201,168,106,0.18),transparent_24%),linear-gradient(180deg,#EAD9C8_0%,#FFF5F0_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-chokola-cream to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-chokola-cream" aria-hidden="true" />

      <div className="relative mx-auto grid w-full min-w-0 max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="w-full min-w-0 max-w-full sm:max-w-[560px]">
          <h2 id="contact-title" className="font-serif text-4xl font-semibold leading-[1.04] text-chokola-chocolate sm:text-5xl lg:text-[3.65rem]">
            Contact Us
          </h2>
          <p className="mt-4 font-serif text-2xl font-semibold leading-[1.12] text-chokola-chocolate/88 sm:text-3xl lg:text-[2.45rem]">
            Let&apos;s Make
            <span className="block">It Sweet.</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-chokola-chocolate/76">
            Reach us for menu questions, branch details, celebrations, collaborations, or anything sweet you would like to plan with Chokola.
          </p>

          <address className="mt-9 grid min-w-0 gap-3 not-italic">
            <a href="tel:+1234567890" className="group flex min-w-0 items-center gap-4 rounded-[16px] border border-chokola-nude/90 bg-chokola-cream/62 p-4 text-chokola-chocolate transition-colors duration-300 hover:border-chokola-gold hover:bg-chokola-cream">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chokola-gold/16 text-chokola-chocolate transition-colors duration-300 group-hover:bg-chokola-gold">
                <Icon name="phone" size={19} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-chokola-chocolate">Call Us</span>
                <span className="mt-1 block text-sm text-chokola-chocolate/72">+1 234 567 890</span>
              </span>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="group flex min-w-0 items-center gap-4 rounded-[16px] border border-chokola-nude/90 bg-chokola-cream/62 p-4 text-chokola-chocolate transition-colors duration-300 hover:border-chokola-gold hover:bg-chokola-cream">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chokola-gold/16 text-chokola-chocolate transition-colors duration-300 group-hover:bg-chokola-gold">
                <Icon name="messageCircle" size={19} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-chokola-chocolate">WhatsApp</span>
                <span className="mt-1 block text-sm text-chokola-chocolate/72">+1 234 567 890</span>
              </span>
            </a>
            <a href="mailto:hello@chokola.com" className="group flex min-w-0 items-center gap-4 rounded-[16px] border border-chokola-nude/90 bg-chokola-cream/62 p-4 text-chokola-chocolate transition-colors duration-300 hover:border-chokola-gold hover:bg-chokola-cream">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chokola-gold/16 text-chokola-chocolate transition-colors duration-300 group-hover:bg-chokola-gold">
                <Icon name="mail" size={19} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-chokola-chocolate">Email Us</span>
                <span className="mt-1 block text-sm text-chokola-chocolate/72">hello@chokola.com</span>
              </span>
            </a>
            <div className="flex min-w-0 items-center gap-4 rounded-[16px] border border-chokola-nude/90 bg-chokola-cream/62 p-4 text-chokola-chocolate">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chokola-gold/16 text-chokola-chocolate">
                <Icon name="mapPin" size={19} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-chokola-chocolate">Location</span>
                <span className="mt-1 block text-sm text-chokola-chocolate/72">Cairo, Egypt</span>
              </span>
            </div>
          </address>
        </div>

        <form onSubmit={handleContactSubmit} noValidate className="w-full min-w-0 max-w-full justify-self-stretch rounded-[24px] border border-chokola-gold/24 bg-chokola-cream/95 p-5 sm:max-w-[620px] lg:justify-self-end md:p-7">
          <div className="grid min-w-0 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-chokola-chocolate">Name <span className="text-chokola-chocolate">*</span></label>
              <input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                autoComplete="name"
                maxLength={TEXT_FIELD_MAX_LENGTH}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                className="h-14 w-full rounded-[18px] border border-chokola-nude/80 bg-white/70 px-5 text-left text-chokola-chocolate outline-none transition-all duration-300 placeholder:text-chokola-chocolate/46 focus:border-chokola-gold focus:bg-white focus:ring-2 focus:ring-chokola-gold/20"
                placeholder="Your Name"
              />
              {fieldErrors.name && <p id="name-error" className="mt-2 text-sm text-chokola-chocolate">{fieldErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-chokola-chocolate">Email <span className="text-chokola-chocolate">*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={TEXT_FIELD_MAX_LENGTH}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                className="h-14 w-full rounded-[18px] border border-chokola-nude/80 bg-white/70 px-5 text-left text-chokola-chocolate outline-none transition-all duration-300 placeholder:text-chokola-chocolate/46 focus:border-chokola-gold focus:bg-white focus:ring-2 focus:ring-chokola-gold/20"
                placeholder="example@email.com"
              />
              {fieldErrors.email && <p id="email-error" className="mt-2 text-sm text-chokola-chocolate">{fieldErrors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-chokola-chocolate">Contact Number <span className="text-chokola-chocolate">*</span></label>
              <div className="flex min-h-14 items-center rounded-[18px] border border-chokola-nude/80 bg-white/70 px-2 transition-all duration-300 focus-within:border-chokola-gold focus-within:bg-white focus-within:ring-2 focus-within:ring-chokola-gold/20">
                <span className="flex h-10 shrink-0 items-center rounded-full border border-chokola-nude/80 bg-chokola-cream/70 px-4 text-sm font-bold text-chokola-chocolate" aria-label="United States country code">
                  US {US_COUNTRY_CODE}
                </span>
                <input
                  id="phone"
                  name="phone"
                  value={formatContactPhoneDigits(formState.phone)}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9 ]*"
                  maxLength={15}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 text-left text-chokola-chocolate outline-none placeholder:text-chokola-chocolate/46"
                  placeholder="Phone number"
                />
              </div>
              {fieldErrors.phone && <p id="phone-error" className="mt-2 text-sm text-chokola-chocolate">{fieldErrors.phone}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="reason" className="mb-2 block text-sm font-semibold text-chokola-chocolate">Reason for Contact <span className="text-chokola-chocolate">*</span></label>
              <select
                id="reason"
                name="reason"
                value={formState.reason}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.reason)}
                aria-describedby={fieldErrors.reason ? 'reason-error' : undefined}
                className="h-14 w-full rounded-[18px] border border-chokola-nude/80 bg-white/70 px-5 text-left text-chokola-chocolate outline-none transition-all duration-300 focus:border-chokola-gold focus:bg-white focus:ring-2 focus:ring-chokola-gold/20"
              >
                <option value="">Choose a reason</option>
                {CONTACT_REASON_OPTIONS.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
              {fieldErrors.reason && <p id="reason-error" className="mt-2 text-sm text-chokola-chocolate">{fieldErrors.reason}</p>}
            </div>
          </div>
          <div className="mt-7">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-chokola-chocolate">Your Message <span className="text-chokola-chocolate">*</span></label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                maxLength={MESSAGE_MAX_LENGTH}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                className="min-h-[190px] w-full resize-y rounded-[18px] border border-chokola-nude/80 bg-white/70 px-5 py-4 text-left text-chokola-chocolate outline-none transition-all duration-300 placeholder:text-chokola-chocolate/46 focus:border-chokola-gold focus:bg-white focus:ring-2 focus:ring-chokola-gold/20"
                placeholder="Your Message"
              />
            </div>
            {fieldErrors.message && <p id="message-error" className="mt-2 text-sm text-chokola-chocolate">{fieldErrors.message}</p>}
          </div>

          {status.message && (
            <p className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${statusClass}`} role="status" aria-live="polite">
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="mx-auto mt-8 flex min-h-14 w-full max-w-[220px] items-center justify-center rounded-full bg-chokola-chocolate px-8 text-sm font-bold leading-none text-chokola-cream transition-colors duration-300 hover:bg-chokola-gold hover:text-chokola-chocolate disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:bg-chokola-chocolate disabled:hover:text-chokola-cream"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-surface rounded-t-[32px] px-6 py-14 text-chokola-cream lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_1fr_0.8fr] lg:gap-12">
        <div>
          <div className="relative h-20 w-[210px]">
            <Image
              src="/chokola-logo-main-cropped.png"
              alt="Chokola Dessert Lounge logo"
              fill
              sizes="210px"
              className="object-contain object-center"
            />
          </div>
          <p className="mt-3 max-w-xs text-base leading-8 text-chokola-cream/82">
            Premium desserts crafted daily for sweet moments and unforgettable experiences.
          </p>

          <div className="mt-5 flex gap-2.5">
            {[
              { label: 'Instagram', href: 'https://instagram.com/chokola', icon: 'instagram' },
              { label: 'Facebook', href: 'https://facebook.com/chokola', icon: 'facebook' },
              { label: 'Twitter', href: 'https://x.com/chokola', icon: 'x' },
              { label: 'TikTok', href: 'https://tiktok.com/@chokola', icon: 'music2' },
              { label: 'WhatsApp', href: 'https://wa.me/1234567890', icon: 'messageCircle' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-chokola-cream/30 bg-chokola-cream/8 text-chokola-cream transition-colors duration-300 hover:text-chokola-gold focus-visible:text-chokola-gold"
              >
                <Icon name={social.icon} size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-chokola-cream">Navigation</h2>
          <div className="mt-5 space-y-3 text-sm text-chokola-cream/82">
            {FOOTER_LINKS.map((link) => (
              <p key={link.href}>
                <a href={link.href} className="inline-flex min-h-11 min-w-11 items-center transition-colors duration-300 hover:text-chokola-gold focus-visible:text-chokola-gold">{link.label}</a>
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-chokola-cream">Contact</h2>
          <address className="mt-5 space-y-4 text-sm text-chokola-cream/82 not-italic">
            <a href="tel:+1234567890" className="group flex min-h-11 w-fit items-center gap-3 transition-colors duration-300 hover:text-chokola-gold focus-visible:text-chokola-gold">
              <Icon name="phone" className="shrink-0 text-chokola-cream transition-colors duration-300 group-hover:text-chokola-gold group-focus-visible:text-chokola-gold" size={17} />
              +1 234 567 890
            </a>
            <a href="mailto:hello@chokola.com" className="group flex min-h-11 w-fit items-center gap-3 transition-colors duration-300 hover:text-chokola-gold focus-visible:text-chokola-gold">
              <Icon name="mail" className="shrink-0 text-chokola-cream transition-colors duration-300 group-hover:text-chokola-gold group-focus-visible:text-chokola-gold" size={17} />
              hello@chokola.com
            </a>
            <p className="flex items-center gap-3">
              <Icon name="mapPin" className="shrink-0 text-chokola-cream" size={17} />
              Cairo, Egypt
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-chokola-cream">Opening Hours</h2>
          <div className="mt-5 space-y-3 text-sm leading-6 text-chokola-cream/82">
            <div>
              <p className="font-semibold text-chokola-cream">Daily</p>
              <p>{'10 AM \u2013 12 AM'}</p>
            </div>
            <div>
              <p className="font-semibold text-chokola-cream">Friday</p>
              <p>{'2 PM \u2013 12 AM'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-center gap-2 border-t border-chokola-cream/22 pt-5 text-center text-xs text-chokola-cream/70 sm:flex-row sm:gap-6">
        <p>&copy; 2026 Chokola Dessert Lounge. All rights reserved.</p>
      </div>
    </footer>
  );
}

const selfCheck = {
  hasFiveMenuCategories: MENU_CATEGORIES.length === 5,
  hasMenuCategoryDetails: MENU_CATEGORIES.every((category) => Boolean(category.id && category.name && category.image && category.alt && category.products.length)),
  hasMenuProductDetails: MENU_CATEGORIES.every((category) => category.products.every((product) => Boolean(product.name && product.description && product.price))),
  hasNoOrderingLabels: !JSON.stringify({ menuCategories: MENU_CATEGORIES, navLinks: NAV_LINKS }).toLowerCase().match(/cart|checkout|order now|add to cart|payment|delivery/),
  hasRequiredSections: ['#home', '#menu', '#about', '#branch'].every((href) => NAV_LINKS.some((link) => link.href === href)),
  hasHeroSlides: HERO_SLIDES.length === 4,
  hasHeroSlideImages: HERO_SLIDES.every((slide) => Boolean(slide.image && slide.name && slide.price && slide.alt)),
  hasUniqueHeroSlideNames: new Set(HERO_SLIDES.map((slide) => slide.name)).size === HERO_SLIDES.length,
  hasNoDuplicateNavHrefs: new Set(NAV_LINKS.map((link) => link.href)).size === NAV_LINKS.length,
  usesChokolaBrand: BRAND.name === 'Chokola' && BRAND.primary === '#E7B5BB' && BRAND.secondary === '#4A2E2B' && BRAND.accent === '#B07A8D',
};

if (typeof console !== 'undefined') {
  console.assert(selfCheck.hasFiveMenuCategories, 'Expected exactly five menu categories.');
  console.assert(selfCheck.hasMenuCategoryDetails, 'Expected every menu category to include complete display details.');
  console.assert(selfCheck.hasMenuProductDetails, 'Expected every menu product to include a name, description, and price.');
  console.assert(selfCheck.hasNoOrderingLabels, 'Landing page should not include ordering or ecommerce labels.');
  console.assert(selfCheck.hasRequiredSections, 'Expected all required sitemap links to exist.');
  console.assert(selfCheck.hasHeroSlides, 'Expected four animated hero slides.');
  console.assert(selfCheck.hasHeroSlideImages, 'Expected every hero slide to include image, name, price, and alt text.');
  console.assert(selfCheck.hasUniqueHeroSlideNames, 'Expected hero slide names to be unique.');
  console.assert(selfCheck.hasNoDuplicateNavHrefs, 'Expected navigation links to be unique.');
  console.assert(selfCheck.usesChokolaBrand, 'Expected Chokola brand tokens to be set.');
}

export default function ChokolaLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((value) => !value), []);

  useEffect(() => {
    let ticking = false;

    function updateScrollState() {
      const scrollPosition = window.scrollY;
      const activationLine = scrollPosition + window.innerHeight * 0.38;
      let currentSection = 'home';

      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= activationLine) {
          currentSection = id;
        }
      });

      setIsScrolled(scrollPosition > 0);
      setActiveSection(currentSection);
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    }

    updateScrollState();
    const initialScrollCheck = window.setTimeout(updateScrollState, 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.clearTimeout(initialScrollCheck);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <main className="min-h-screen overflow-hidden bg-chokola-cream text-chokola-chocolate">
      <Hero
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={toggleMobileMenu}
        onCloseMenu={closeMobileMenu}
        isScrolled={isScrolled}
        activeSection={activeSection}
      />
      <AboutSection />
      <MenuSection />
      <BranchSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

