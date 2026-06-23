'use client';

import Image from 'next/image';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BRAND = {
  name: 'Chokola',
  subtitle: 'Dessert Lounge',
  primary: '#E7B5BB',
  secondary: '#4A2E2B',
  background: '#FFF5F0',
  accent: '#B07A8D',
  cream: '#EAD9C8',
  gold: '#C9A86A',
  muted: '#725758',
};

const MENU_ITEMS = [
  {
    title: 'Signature Cakes',
    desc: 'Soft layered cakes finished with elegant cream, chocolate details, and fresh fruit notes.',
    price: 'From $18',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    alt: 'Elegant chocolate cake with layered cream',
  },
  {
    title: 'Chocolate Desserts',
    desc: 'Deep cocoa, silky textures, and rich premium chocolate for indulgent dessert moments.',
    price: 'From $7',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    alt: 'Rich chocolate brownie dessert served close up',
  },
  {
    title: 'Strawberry Specials',
    desc: 'Fresh strawberry flavors paired with soft cream, chocolate glaze, and delicate finishes.',
    price: 'From $9',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=900&q=80',
    alt: 'Strawberry dessert with cream and chocolate sauce',
  },
  {
    title: 'Fresh Pastries',
    desc: 'Golden, flaky pastries baked fresh daily with a light texture and refined sweetness.',
    price: 'From $5',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    alt: 'Fresh golden pastries on a bakery table',
  },
  {
    title: 'Cookies & Bites',
    desc: 'Small sweet bites with buttery textures, soft centers, and playful dessert flavors.',
    price: 'From $4',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
    alt: 'Chocolate chip cookies stacked together',
  },
  {
    title: 'Cold Desserts',
    desc: 'Chilled dessert cups, creamy layers, fruit accents, and smooth refreshing textures.',
    price: 'From $6',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    alt: 'Cold creamy dessert cup with fruit topping',
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
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '#about' },
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
  subject: '',
  message: '',
};

const MESSAGE_MAX_LENGTH = 500;
const PHONE_DIGIT_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatUSPhoneDigits(value) {
  const digits = value.replace(/\D/g, '').slice(0, PHONE_DIGIT_LENGTH);
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean);

  return parts.join(' ');
}

function getContactFieldErrors(formState) {
  const errors = {};
  const name = formState.name.trim();
  const phone = formState.phone.replace(/\D/g, '');
  const email = formState.email.trim();
  const subject = formState.subject.trim();
  const message = formState.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!phone || phone.length !== PHONE_DIGIT_LENGTH) {
    errors.phone = 'Please enter a valid US phone number.';
  }
  if (!subject) errors.subject = 'Please enter a subject.';
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
    <div className="relative flex w-[108px] shrink-0 items-center bg-transparent sm:w-[125px] lg:w-[145px]">
      <Image
        src="/chokola-logo-cropped.png"
        alt="Chokola Dessert Lounge logo"
        width={713}
        height={296}
        priority
        sizes="(max-width: 640px) 108px, (max-width: 1024px) 125px, 145px"
        className="h-auto w-full object-contain"
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
          ? 'border-b border-[#E7B5BB]/24 bg-[#FFF5F0]/92 backdrop-blur-xl'
          : 'border-b border-transparent bg-white/52 backdrop-blur-sm'
      }`}
      aria-label="Main navigation"
    >
      <div
        className="relative mx-auto flex min-h-[4.75rem] w-full max-w-[1520px] items-center justify-between gap-4 py-2 transition-all duration-300 lg:min-h-[5rem] lg:py-2.5"
      >
        <a href="#home" onClick={onCloseMenu} aria-label="Go to Chokola homepage" className="relative z-10">
          <Logo />
        </a>

        <div className="relative z-10 hidden flex-1 items-center justify-center gap-3 text-[16.5px] font-semibold text-[#4A2E2B] lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);

            return (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-4 py-2.5 text-[#4A2E2B] transition-all duration-300 hover:bg-[#E7B5BB]/12 focus-visible:bg-[#E7B5BB]/12"
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute bottom-1.5 left-4 right-4 h-[2px] rounded-full bg-[#E7B5BB]/85"
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    aria-hidden="true"
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'font-semibold' : ''}`}>{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="relative z-10 ml-auto flex items-center gap-3">
          <a
            href="#contact"
            className="hidden min-h-11 items-center rounded-full bg-[#E7B5BB] px-6 text-sm font-semibold leading-none text-[#4A2E2B] transition-colors duration-300 hover:bg-[#B07A8D] hover:text-[#FFF5F0] sm:inline-flex"
          >
            Contact Us
          </a>
          <button
            type="button"
            onClick={onToggleMenu}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#E7B5BB]/45 bg-[#FFF5F0]/78 text-[#B07A8D] transition-all duration-300 hover:bg-[#E7B5BB]/16 lg:hidden"
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
          className="mx-auto max-w-[1520px] border-t border-[#E7B5BB]/18 bg-[#FFF5F0]/94 py-3 backdrop-blur-xl lg:hidden"
        >
          <div className="grid gap-2 text-sm font-semibold text-[#3B2424]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onCloseMenu}
                className={`rounded-full px-4 py-3 text-[#4A2E2B] transition-all duration-300 hover:bg-[#E7B5BB]/12 focus-visible:bg-[#E7B5BB]/12 ${activeSection === link.href.slice(1) ? 'bg-[#E7B5BB]/12 font-semibold' : ''}`}
                aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function Hero({ mobileMenuOpen, onToggleMenu, onCloseMenu, isScrolled, activeSection }) {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-white px-4 pb-16 pt-[130px] sm:px-6 sm:pt-[136px] lg:px-10 lg:pt-[138px]"
      aria-labelledby="hero-title"
    >
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        isScrolled={isScrolled}
        activeSection={activeSection}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(246,201,210,0.28),transparent_34%),radial-gradient(circle_at_28%_72%,rgba(243,228,216,0.34),transparent_30%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-210px)] w-full max-w-[1520px] items-center gap-14 lg:grid-cols-[0.45fr_0.55fr] lg:gap-12 xl:gap-14">
        <div className="max-w-[700px] lg:-mt-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#C9A86A]">
            Since 2021 • Crafted Fresh Daily
          </p>
          <h1
            id="hero-title"
            className="max-w-[720px] font-serif leading-[0.96] text-[#3B2424]"
          >
            <span className="block text-[2.75rem] font-bold sm:text-[3.35rem] md:text-[3.95rem] lg:text-[4.15rem] xl:text-[4.65rem] lg:whitespace-nowrap">
              <span className="text-[#C9A86A]">Desserts</span>
            </span>
            <span className="mt-1 block text-[2.35rem] font-medium text-[#4A2E2B]/92 sm:text-[2.9rem] md:text-[3.35rem] lg:text-[3.45rem] xl:text-[3.95rem] lg:whitespace-nowrap">Crafted With Love</span>
          </h1>

          <p className="mt-6 max-w-[560px] text-base leading-7 text-[#3B2424]/78 sm:text-lg sm:leading-8">
            Elegant desserts made with premium ingredients to elevate every celebration.
          </p>

          <div className="mt-9 flex flex-wrap gap-5" aria-label="Hero calls to action">
            <a
              href="#menu"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#E7B5BB] px-9 text-sm font-bold leading-none text-[#4A2E2B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#B07A8D] hover:text-[#FFF5F0] focus-visible:bg-[#B07A8D] focus-visible:text-[#FFF5F0]"
            >
              Explore Menu
            </a>
            <a
              href="#branch"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#E7B5BB]/70 bg-white/35 px-9 text-sm font-semibold leading-none text-[#4A2E2B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B07A8D]/75 hover:bg-[#FFF5F0]/70"
            >
              Visit Branch
            </a>
          </div>

          <div className="mt-8 flex max-w-[560px] flex-wrap items-start gap-x-9 gap-y-5" aria-label="Chokola highlights">
            <div>
              <p className="font-serif text-2xl font-semibold leading-none text-[#C9A86A]">20+</p>
              <p className="mt-1.5 text-xs font-medium leading-none text-[#4A2E2B]/78">Desserts</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold leading-none text-[#C9A86A]">4.9★</p>
              <p className="mt-1.5 text-xs font-medium leading-none text-[#4A2E2B]/78">Rating</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold leading-none text-[#C9A86A]">Daily</p>
              <p className="mt-1.5 text-xs font-medium leading-none text-[#4A2E2B]/78">Fresh Made</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-semibold leading-none text-[#C9A86A]">Premium</p>
              <p className="mt-1.5 text-xs font-medium leading-none text-[#4A2E2B]/78">Ingredients</p>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[460px] items-center justify-center lg:min-h-[720px] lg:justify-end">
          <div className="absolute left-[48%] top-1/2 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(201,168,106,0.22)_0%,rgba(201,168,106,0.10)_34%,transparent_70%)] blur-3xl" aria-hidden="true" />
          <div className="absolute left-[58%] top-[48%] h-[82%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,245,240,0.74)_0%,rgba(231,181,187,0.18)_38%,transparent_72%)] blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <span className="absolute right-[20%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#4A2E2B]/18 blur-[0.5px]" />
            <span className="absolute right-[9%] top-[36%] h-2 w-2 rounded-full bg-[#B07A8D]/14 blur-[0.5px]" />
            <span className="absolute right-[31%] top-[58%] h-1 w-1 rounded-full bg-[#C9A86A]/38" />
            <span className="absolute right-[16%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-[#4A2E2B]/14 blur-[0.5px]" />
            <span className="absolute right-[43%] top-[33%] h-1 w-1 rounded-full bg-[#B07A8D]/18" />
          </div>
          <Image
            src="/chocolate-sensations-hero.png"
            alt="Chocolate dessert stack with dripping chocolate sauce and chocolate pieces"
            width={2000}
            height={1779}
            priority
            sizes="(max-width: 768px) 96vw, (max-width: 1024px) 720px, 880px"
            className="relative z-10 h-auto w-[min(96vw,620px)] max-w-none translate-y-8 object-contain lg:mr-[-4vw] lg:w-[clamp(600px,48vw,880px)]"
          />
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B07A8D]/70 transition-colors duration-300 hover:text-[#B07A8D] md:inline-flex"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ↓
        </motion.span>
        Discover More
      </a>
    </section>
  );
}

function MenuSection() {
  const ingredients = [
    {
      title: 'Waffles',
      image: '/about-waffle-chocolate-wide.png',
      alt: 'Golden waffles with chocolate sauce',
    },
    {
      title: 'Crepes',
      image: '/about-waffle-dessert.png',
      alt: 'Premium dessert with berries and cream',
      isAccent: true,
    },
    {
      title: 'Pancakes',
      image: '/about-waffle-ice-cream.png',
      alt: 'Stacked dessert with waffles and ice cream',
    },
    {
      title: 'Chocolate',
      image: '/chocolate-sensations.png',
      alt: 'Rich chocolate dessert with dripping chocolate sauce',
      isAccent: true,
    },
    {
      title: 'Fresh Fruits',
      image: '/new-hero-dessert.png',
      alt: 'Fresh strawberry dessert composition',
      isAccent: true,
    },
    {
      title: 'Ice Cream',
      image: '/hero-choco-ice-cream.png',
      alt: 'Chocolate ice cream dessert cup',
    },
    {
      title: 'Mini Pancakes',
      image: '/about-waffle-dessert.png',
      alt: 'Small sweet dessert with berries',
      isAccent: true,
    },
    {
      title: 'Sweet Cups',
      image: '/hero-ice-cream-cup.png',
      alt: 'Creamy dessert cup with topping',
    },
  ];
  return (
    <section id="menu" className="bg-white px-6 py-20 lg:px-10 lg:py-24" aria-labelledby="menu-title">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#A85F78]">Our Menu</p>
          <h2 id="menu-title" className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#3B2424] md:text-5xl">
            Crafted From Sweet Premium Ingredients
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#3B2424]/72">
            We bring together waffles, crepes, pancakes, chocolate, fruits, and ice cream to create memorable dessert moments.
          </p>
        </div>

        <div className="mx-auto mt-24 grid max-w-6xl grid-cols-2 gap-x-5 gap-y-24 sm:gap-x-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {ingredients.map((item) => (
            <article
              key={item.title}
              className={`group relative flex min-h-[150px] items-end justify-center rounded-[24px] border border-[#A85F78]/10 ${item.isAccent ? 'bg-[#F6C9D2]' : 'bg-[#A85F78]'} px-4 pb-6 pt-20 shadow-[0_16px_44px_rgba(59,36,36,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#C9A86A]/35 hover:shadow-[0_24px_58px_rgba(59,36,36,0.14)] sm:min-h-[165px] sm:pt-24`}
            >
              <div className="absolute -top-[42%] left-1/2 h-[132px] w-[88%] -translate-x-1/2 drop-shadow-[0_22px_18px_rgba(59,36,36,0.16)] transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[160px] sm:w-[90%]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 40vw, 260px"
                  className="object-contain"
                />
              </div>
              <h3 className={`text-center font-serif text-lg font-semibold leading-tight ${item.isAccent ? 'text-[#3B2424]' : 'text-[#FFF8F4]'}`}>{item.title}</h3>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="font-serif text-2xl font-semibold leading-tight text-[#3B2424]">Want to see the full menu?</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#3B2424]/70">
            Explore our complete menu with all desserts, flavors, and sweet creations.
          </p>
          <a
            href="https://drive.google.com/your-menu-pdf-link"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-14 items-center justify-center rounded-full bg-[#F6C9D2] px-8 text-sm font-semibold leading-none text-[#3B2424] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#A85F78] hover:text-white focus-visible:bg-[#A85F78] focus-visible:text-white"
          >
            Explore Menu
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutOrganicTopRight() {
  return (
    <svg className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 text-[#A85F78] opacity-[0.05]" viewBox="0 0 360 360" fill="none" aria-hidden="true">
      <path d="M226 28c62 18 105 71 100 133-6 72-66 124-143 129-75 5-133-41-143-105C29 119 69 55 135 31c28-10 58-12 91-3z" fill="currentColor" />
    </svg>
  );
}

function AboutFlowBottomLeft() {
  return (
    <svg className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-[34rem] text-[#F3E4D8] opacity-[0.38]" viewBox="0 0 540 260" fill="none" aria-hidden="true">
      <path d="M24 168c69-98 142 18 218-72 55-65 115-47 160-12 40 31 78 31 120-8v184H24V168z" fill="currentColor" />
    </svg>
  );
}

function AboutTextCurve() {
  return (
    <svg className="pointer-events-none absolute right-[13%] top-[38%] h-36 w-[26rem] text-[#A85F78] opacity-[0.08]" viewBox="0 0 420 150" fill="none" aria-hidden="true">
      <path d="M8 93c84-68 173-64 264-3 45 30 89 38 139 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AboutGoldSparkles() {
  return (
    <svg className="pointer-events-none absolute right-[34%] top-[27%] h-16 w-24 text-[#C9A86A] opacity-70" viewBox="0 0 100 70" fill="none" aria-hidden="true">
      <path d="M20 12l4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9z" fill="currentColor" />
      <path d="M71 36l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" fill="currentColor" />
    </svg>
  );
}

function AboutWaveBottomRight() {
  return (
    <svg className="pointer-events-none absolute -bottom-6 right-[-5%] h-24 w-[17rem] text-[#F6C9D2] opacity-[0.06]" viewBox="0 0 540 190" fill="none" aria-hidden="true">
      <path d="M0 118c80-57 156-44 228-1 87 52 180 52 312-32v105H0v-72z" fill="currentColor" />
    </svg>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFF6F8_0%,#FFF3F6_100%)] px-6 py-28 sm:py-32 lg:px-10" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-14 xl:gap-[4.5rem]">
        <div className="grid gap-5 sm:grid-cols-[1.55fr_0.85fr] sm:grid-rows-[340px_230px] lg:gap-6 lg:grid-rows-[390px_245px]" aria-label="About section editorial bento image layout">
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] sm:min-h-0 lg:rounded-[2.25rem]">
            <Image
              src="/about-dessert-prep.jpg"
              alt="Chef adding chocolate to a premium plated dessert"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 62vw, 38vw"
              className="object-cover object-[50%_48%]"
            />
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-0 lg:rounded-[2.25rem]">
            <Image
              src="/about-waffles-plate.jpg"
              alt="Tall waffle dessert with ice cream and chocolate topping"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 36vw, 18vw"
              className="object-cover object-[52%_58%]"
            />
          </div>
          <div className="relative min-h-[210px] overflow-hidden rounded-[2rem] sm:min-h-0 lg:rounded-[2.25rem]">
            <Image
              src="/about-cheesecake-chocolate.jpg"
              alt="Chocolate-drizzled cheesecake slice on a plate"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 62vw, 38vw"
              className="object-cover object-[50%_52%]"
            />
          </div>
          <div className="relative min-h-[210px] overflow-hidden rounded-[2rem] sm:min-h-0 lg:rounded-[2.25rem]">
            <Image
              src="/about-ice-cream-cup.jpg"
              alt="Small cup of chocolate and vanilla ice cream"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 36vw, 18vw"
              className="object-cover object-[50%_45%]"
            />
          </div>
        </div>

        <div className="relative flex min-h-[520px] items-start pt-2 sm:min-h-[594px] lg:min-h-[659px] lg:pt-3">
          <div className="max-w-[370px]">
            <h2 id="about-title" className="font-sans text-3xl font-bold leading-tight text-[#2E1D1B] sm:text-[2.15rem]">
              About Us
            </h2>
            <div className="mt-4 space-y-3 text-[13px] leading-6 text-[#4A2E2B]/52 sm:text-sm sm:leading-6">
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
          </div>
        </div>
      </div>
    </section>
  );
}
function getBranchStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentMinutes = hour * 60 + minute;
  const opensAt = day === 5 ? 14 * 60 : 10 * 60;
  const closesAt = 24 * 60;

  return currentMinutes >= opensAt && currentMinutes < closesAt ? 'Open Now' : 'Closed Now';
}

function BranchSection() {
  const [branchStatus, setBranchStatus] = useState('Open Now');
  const branch = {
    name: 'Chokola Dessert Lounge',
    address: '24 Sweet Avenue, Dessert District, Cairo, Egypt',
    phone: '+1 234 567 890',
    phoneHref: 'tel:+1234567890',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=24%20Sweet%20Avenue%20Dessert%20District%20Cairo%20Egypt',
    amenities: ['Parking available', 'Indoor seating available', 'Family friendly', 'Free Wi-Fi'],
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
    <section id="branch" className="bg-[#FFF1F4] px-6 py-24 lg:px-10" aria-labelledby="branch-title">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#B07A8D]">Branch Location</p>
          <h2 id="branch-title" className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#4A2E2B] md:text-5xl">
            Our Branch
          </h2>
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[380px] overflow-hidden rounded-[28px] border border-[#E7B5BB]/45 bg-[#FFF5F0] lg:min-h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85"
              alt="Warm premium dessert lounge branch interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(74,46,43,0.22)_100%)]" aria-hidden="true" />
          </div>

          <div className="flex flex-col justify-center rounded-[28px] border border-[#E7B5BB]/45 bg-white/88 p-7 shadow-[0_18px_54px_rgba(74,46,43,0.08)] backdrop-blur-xl sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="font-serif text-3xl font-semibold leading-tight text-[#4A2E2B] md:text-4xl">{branch.name}</h3>
              <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#E7B5BB]/60 bg-[#FFF5F0] px-4 text-xs font-bold uppercase tracking-[0.16em] text-[#4A2E2B]">
                <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-[#6F9C68]' : 'bg-[#B07A8D]'}`} aria-hidden="true" />
                {branchStatus}
              </span>
            </div>

            <div className="mt-10 grid gap-7 text-[#725758]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B07A8D]">Address</p>
                <p className="mt-2 flex gap-3 text-base leading-7 text-[#4A2E2B]">
                  <Icon name="mapPin" className="mt-1 shrink-0 text-[#B07A8D]" size={19} />
                  {branch.address}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B07A8D]">Opening Hours</p>
                <div className="mt-2 space-y-2 text-base leading-7 text-[#4A2E2B]">
                  <p className="flex gap-3">
                    <Icon name="clock" className="mt-1 shrink-0 text-[#B07A8D]" size={19} />
                    <span>Saturday - Thursday: 10:00 AM - 12:00 AM</span>
                  </p>
                  <p className="pl-8">Friday: 2:00 PM - 12:00 AM</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B07A8D]">Phone</p>
                <p className="mt-2 flex gap-3 text-base leading-7 text-[#4A2E2B]">
                  <Icon name="phone" className="mt-1 shrink-0 text-[#B07A8D]" size={19} />
                  {branch.phone}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 text-sm font-semibold text-[#4A2E2B] sm:grid-cols-2">
              {branch.amenities.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-full bg-[#FFF5F0] px-4 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A86A]" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Chokola Dessert Lounge directions in Google Maps"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#E7B5BB] px-6 text-sm font-semibold leading-none text-[#4A2E2B] transition-colors duration-300 hover:bg-[#B07A8D] hover:text-[#FFF5F0] focus-visible:bg-[#B07A8D] focus-visible:text-[#FFF5F0]"
              >
                Get Directions
                <Icon name="arrowRight" className="ml-2" size={17} />
              </a>
              <a
                href={branch.phoneHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E7B5BB]/80 bg-transparent px-6 text-sm font-semibold leading-none text-[#4A2E2B] transition-[transform,border-color] duration-300 ease-out hover:scale-[1.03] hover:border-[#B07A8D]/80"
              >
                Call Branch
              </a>
            </div>
          </div>
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

    if (name === 'phone') {
      nextValue = value.replace(/\D/g, '').slice(0, PHONE_DIGIT_LENGTH);
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

  const statusClass = status.type === 'success' ? 'text-green-700 bg-green-50 border-green-200' : status.type === 'error' ? 'text-red-700 bg-red-50 border-red-200' : 'text-[#725758] bg-[#FFF1F4] border-[#A85F78]/15';

  return (
    <section id="contact" className="bg-white px-6 py-24" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#A85F78]">Contact Us</p>
          <h2 id="contact-title" className="font-serif text-3xl font-semibold leading-tight text-[#3B2424] md:text-4xl">
            Have a question? We would love to hear from you.
          </h2>
          <p className="mt-5 leading-8 text-[#725758]">
            Reach us for branch information, menu details, collaborations, or general inquiries.
          </p>
          <address className="mt-8 space-y-4 not-italic text-[#4A2E2B]">
            <p className="flex items-center gap-3"><Icon name="phone" className="text-[#B07A8D]" /> +1 234 567 890</p>
            <p className="flex items-center gap-3"><Icon name="mail" className="text-[#B07A8D]" /> hello@chokola.com</p>
          </address>
        </div>

        <form onSubmit={handleContactSubmit} noValidate className="rounded-[24px] border border-[#A85F78]/15 bg-white/82 p-6 shadow-[0_22px_70px_rgba(59,36,36,0.10)] backdrop-blur-xl md:p-9">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#3B2424]">Name <span className="text-red-600">*</span></label>
              <input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                className="w-full rounded-[22px] border border-[#E7B5BB]/55 bg-white px-5 py-4 text-left outline-none transition-all duration-300 placeholder:text-[#725758]/60 focus:border-[#B07A8D] focus:ring-4 focus:ring-[#E7B5BB]/30"
                placeholder="Your Name"
              />
              {fieldErrors.name && <p id="name-error" className="mt-2 text-sm text-red-700">{fieldErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#3B2424]">Email <span className="text-red-600">*</span></label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                className="w-full rounded-[22px] border border-[#E7B5BB]/55 bg-white px-5 py-4 text-left outline-none transition-all duration-300 placeholder:text-[#725758]/60 focus:border-[#B07A8D] focus:ring-4 focus:ring-[#E7B5BB]/30"
                placeholder="example@email.com"
              />
              {fieldErrors.email && <p id="email-error" className="mt-2 text-sm text-red-700">{fieldErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#3B2424]">Contact Number <span className="text-red-600">*</span></label>
              <div className="flex min-h-[58px] overflow-hidden rounded-[22px] border border-[#E7B5BB]/55 bg-white transition-all duration-300 focus-within:border-[#B07A8D] focus-within:ring-4 focus-within:ring-[#E7B5BB]/30">
                <span className="flex shrink-0 items-center border-r border-[#E7B5BB]/45 bg-[#FFF5F0] px-5 text-sm font-bold text-[#4A2E2B]" aria-hidden="true">
                  +1
                </span>
                <input
                  id="phone"
                  name="phone"
                  value={formatUSPhoneDigits(formState.phone)}
                  onChange={handleChange}
                  autoComplete="tel-national"
                  inputMode="numeric"
                  pattern="[0-9 ]*"
                  maxLength={12}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  className="min-w-0 flex-1 bg-transparent px-5 py-4 text-left outline-none placeholder:text-[#725758]/60"
                  placeholder="234 567 8900"
                />
              </div>
              {fieldErrors.phone && <p id="phone-error" className="mt-2 text-sm text-red-700">{fieldErrors.phone}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-[#3B2424]">Subject <span className="text-red-600">*</span></label>
              <input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.subject)}
                aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                className="w-full rounded-[22px] border border-[#E7B5BB]/55 bg-white px-5 py-4 text-left outline-none transition-all duration-300 placeholder:text-[#725758]/60 focus:border-[#B07A8D] focus:ring-4 focus:ring-[#E7B5BB]/30"
                placeholder="Subject"
              />
              {fieldErrors.subject && <p id="subject-error" className="mt-2 text-sm text-red-700">{fieldErrors.subject}</p>}
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#3B2424]">Your Message <span className="text-red-600">*</span></label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                maxLength={MESSAGE_MAX_LENGTH}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'message-error message-counter' : 'message-counter'}
                className="min-h-52 w-full rounded-[22px] border border-[#E7B5BB]/55 bg-white px-5 py-4 pb-11 text-left outline-none transition-all duration-300 placeholder:text-[#725758]/60 focus:border-[#B07A8D] focus:ring-4 focus:ring-[#E7B5BB]/30"
                placeholder="Your Message"
              />
              <span id="message-counter" className="pointer-events-none absolute bottom-4 right-5 text-xs font-medium text-[#725758]/65">
                {formState.message.length} / {MESSAGE_MAX_LENGTH}
              </span>
            </div>
            {fieldErrors.message && <p id="message-error" className="mt-2 text-sm text-red-700">{fieldErrors.message}</p>}
          </div>

          {status.message && (
            <p className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${statusClass}`} role="status" aria-live="polite">
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="mt-6 w-full rounded-full bg-[#E7B5BB] px-7 py-4 font-semibold text-[#4A2E2B] transition-colors duration-300 hover:bg-[#B07A8D] hover:text-[#FFF5F0] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:bg-[#E7B5BB] disabled:hover:text-[#4A2E2B]"
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
    <footer className="section-dark px-6 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="relative h-20 w-[clamp(120px,9vw,150px)]">
            <Image
              src="/chokola-logo.png"
              alt="Chokola Dessert Lounge logo"
              fill
              sizes="(max-width: 640px) 120px, (max-width: 1024px) 9vw, 150px"
              className="object-contain object-left"
            />
          </div>
          <p className="mt-4 max-w-sm leading-7 text-white/65">
            Premium desserts, soft elegance, and sweet lounge moments.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-[#F6C9D2]">Quick Links</h2>
          <div className="mt-4 space-y-2 text-white/65">
            {FOOTER_LINKS.map((link) => (
              <p key={link.href}>
                <a href={link.href} className="transition-colors duration-300 hover:text-[#E7B5BB] focus-visible:text-[#E7B5BB]">{link.label}</a>
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-[#F6C9D2]">Contact</h2>
          <address className="mt-4 space-y-2 text-white/65 not-italic">
            <p>+1 234 567 890</p>
            <p>hello@chokola.com</p>
            <p>@chokola</p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-white/45">
        &copy; 2026 Chokola Dessert Lounge. All rights reserved.
      </div>
    </footer>
  );
}

const selfCheck = {
  hasSixMenuItems: MENU_ITEMS.length === 6,
  hasNoOrderingLabels: !JSON.stringify({ menuItems: MENU_ITEMS, navLinks: NAV_LINKS }).toLowerCase().match(/cart|checkout|order now|add to cart|payment|delivery/),
  hasRequiredSections: ['#home', '#menu', '#about', '#branch'].every((href) => NAV_LINKS.some((link) => link.href === href)),
  hasHeroSlides: HERO_SLIDES.length === 4,
  hasHeroSlideImages: HERO_SLIDES.every((slide) => Boolean(slide.image && slide.name && slide.price && slide.alt)),
  hasUniqueHeroSlideNames: new Set(HERO_SLIDES.map((slide) => slide.name)).size === HERO_SLIDES.length,
  hasNoDuplicateNavHrefs: new Set(NAV_LINKS.map((link) => link.href)).size === NAV_LINKS.length,
  usesChokolaBrand: BRAND.name === 'Chokola' && BRAND.primary === '#E7B5BB' && BRAND.secondary === '#4A2E2B' && BRAND.accent === '#B07A8D',
};

if (typeof console !== 'undefined') {
  console.assert(selfCheck.hasSixMenuItems, 'Expected exactly six menu categories.');
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

      setIsScrolled(scrollPosition > 24);
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
    <main className="min-h-screen overflow-hidden bg-[#FFFFFF] text-[#3B2424]">
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

