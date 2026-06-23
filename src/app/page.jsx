'use client';

import Image from 'next/image';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
    music2: (
      <>
        <circle cx="8" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        <path d="M11 18V5l10-2v13" />
      </>
    ),
    check: <path d="M20 6L9 17l-5-5" />,
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
              Premium <span className="text-[#C9A86A]">Desserts</span>
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

function MenuCard({ item }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[30px] border border-[#EAD9C8]/80 bg-[#FFF5F0]">
      <div className="relative aspect-[5/6] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="object-cover saturate-[0.88] contrast-[0.97] sepia-[0.06]"
        />
      </div>

      <div className="flex min-h-[155px] flex-1 flex-col border-t border-[#EAD9C8]/70 px-6 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A86A]">{item.label}</p>
        <h3 className="mt-1.5 font-serif text-2xl font-semibold leading-tight text-[#4A2E2B]">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#4A2E2B]/66">{item.description}</p>
        <p className="mt-auto pt-3 text-xs leading-5 text-[#4A2E2B]/52">Crafted fresh daily</p>
      </div>
    </article>
  );
}

function MenuSection() {
  const [showAllDesserts, setShowAllDesserts] = useState(false);
  const menuCards = [
    {
      title: 'Waffles',
      description: 'Warm golden waffles layered with rich chocolate and premium toppings.',
      label: 'Signature',
      image: '/about-waffles-plate.jpg',
      alt: 'Golden waffles served with ice cream and chocolate',
    },
    {
      title: 'Crepes',
      description: 'Thin handcrafted crepes made fresh daily with delicious fillings.',
      label: 'Handcrafted',
      image: '/about-dessert-prep.jpg',
      alt: 'Chef finishing a handcrafted dessert',
    },
    {
      title: 'Chocolate',
      description: 'Rich chocolate creations crafted for sharing and unforgettable moments.',
      label: 'Premium',
      image: '/hero-chocolate-brownie-stack.jpg',
      alt: 'Rich layered chocolate dessert',
    },
    {
      title: 'Pancakes',
      description: 'Soft pancakes finished with smooth sauces and carefully chosen toppings.',
      label: 'Fresh Daily',
      image: '/about-waffle-dessert-wide.jpg',
      alt: 'Fresh dessert stack with cream and fruit',
    },
    {
      title: 'Ice Cream',
      description: 'Creamy ice cream with elegant toppings and refreshing flavors.',
      label: 'Chilled',
      image: '/about-ice-cream-cup.jpg',
      alt: 'Chocolate and vanilla ice cream in a dessert cup',
    },
    {
      title: 'Sweet Cups',
      description: 'Small sweet moments crafted with premium ingredients and beautiful presentation.',
      label: 'Best Seller',
      image: '/about-pink-milkshake.jpg',
      alt: 'Pink dessert drink presented in a glass',
    },
  ];

  return (
    <section id="menu" className="bg-white px-6 py-12 lg:px-10" aria-labelledby="menu-title">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base font-bold uppercase tracking-[0.3em] text-[#B07A8D]">Menu</p>
          <h2 id="menu-title" className="mt-2 font-serif text-4xl font-semibold leading-[1.08] text-[#3B2424] sm:text-5xl lg:text-[3.5rem]">
            Signature Desserts
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm leading-7 text-[#4A2E2B]/64 sm:text-base sm:leading-8">
            Warm waffles, rich chocolate creations, handcrafted cakes, premium brownies, ice cream, and sweet cups made fresh daily using carefully selected ingredients and crafted for sharing every sweet moment.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-[920px] grid-cols-1 gap-7 sm:mt-10 sm:grid-cols-2 lg:max-w-[860px] lg:grid-cols-3 lg:gap-6">
          {menuCards.slice(0, 3).map((item) => (
            <MenuCard key={item.title} item={item} />
          ))}
        </div>

        <AnimatePresence initial={false}>
          {showAllDesserts && (
            <motion.div
              id="more-desserts"
              key="more-desserts"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mx-auto mt-7 grid max-w-[920px] grid-cols-1 gap-7 overflow-hidden sm:grid-cols-2 lg:max-w-[860px] lg:grid-cols-3 lg:gap-6"
            >
              {menuCards.slice(3).map((item) => (
                <MenuCard key={item.title} item={item} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 px-2 text-center">
          <button
            type="button"
            aria-expanded={showAllDesserts}
            aria-controls="more-desserts"
            onClick={() => setShowAllDesserts((current) => !current)}
            className="mx-auto flex w-full min-w-0 max-w-[320px] items-center justify-center gap-2 rounded-full bg-[#E7B5BB] px-6 py-3.5 text-sm font-bold leading-none text-[#4A2E2B] transition-colors duration-300 hover:bg-[#B07A8D] hover:text-[#FFF5F0] focus-visible:bg-[#B07A8D] focus-visible:text-[#FFF5F0] sm:w-fit sm:min-w-[220px] sm:max-w-none sm:px-8 lg:px-[34px] lg:py-4"
          >
            <span>{showAllDesserts ? 'Show Less' : 'View More Desserts'}</span>
            <span aria-hidden="true">{showAllDesserts ? '\u2191' : '\u2193'}</span>
          </button>
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
          <div className="max-w-[540px]">
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
    <section id="branch" className="bg-[linear-gradient(180deg,#FFF5F7_0%,#FFF8F3_100%)] px-6 py-24 lg:px-10 lg:py-28" aria-labelledby="branch-title">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="relative min-h-[420px] overflow-hidden rounded-[30px] sm:min-h-[560px] lg:min-h-[680px]">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85"
              alt="Warm Chokola dessert lounge storefront and entrance"
              fill
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover"
            />
        </div>

        <div className="max-w-[500px] lg:py-8">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#B07A8D]">Our Branch</p>
          <h2 id="branch-title" className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#4A2E2B] sm:text-5xl">
            {branch.name}
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-[#4A2E2B]/68">
            A cozy destination crafted for sweet moments and unforgettable dessert experiences.
          </p>

          <span className={`mt-7 inline-flex min-h-10 items-center gap-2.5 rounded-full px-4 text-sm font-bold ${isOpen ? 'bg-[#EAF4E8] text-[#4F7D49]' : 'bg-[#F5E7E8] text-[#9A5F68]'}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-[#5F9258]' : 'bg-[#B07A8D]'}`} aria-hidden="true" />
            {branchStatus}
          </span>

          <div className="mt-9 space-y-5 text-sm leading-6 text-[#4A2E2B]/82">
            <p className="flex items-start gap-3">
              <Icon name="mapPin" className="mt-0.5 shrink-0 text-[#B07A8D]" size={18} />
              <span>{branch.address}</span>
            </p>
            <p className="flex items-start gap-3">
              <Icon name="clock3" className="mt-0.5 shrink-0 text-[#C9A86A]" size={18} />
              <span>Daily · 10 AM - 12 AM</span>
            </p>
            <p className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 shrink-0 text-[#B07A8D]" size={18} />
              <span>{branch.phone}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {branch.amenities.map((item) => (
              <span key={item} className="rounded-full border border-[#EAD9C8]/70 bg-[#FFF8F3] px-4 py-2.5 text-xs font-semibold text-[#4A2E2B]/72">
                {item}
              </span>
            ))}
          </div>

          <a
            href={branch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Chokola Dessert Lounge directions in Google Maps"
            className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-[#E7B5BB] px-8 text-sm font-bold leading-none text-[#4A2E2B] transition-colors duration-300 hover:bg-[#B07A8D] hover:text-[#FFF5F0] focus-visible:bg-[#B07A8D] focus-visible:text-[#FFF5F0]"
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
    <section id="contact" className="bg-white px-6 py-24 lg:px-10" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-[590px]">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#A85F78]">Contact Us</p>
          <h2 id="contact-title" className="font-serif text-4xl font-semibold leading-tight text-[#3B2424] md:text-5xl">
            Have a Question?
            <span className="block">We Would Love to Hear From You.</span>
          </h2>
          <p className="mt-5 max-w-lg leading-8 text-[#725758]">
            Reach us for branch information, menu details, collaborations, event bookings, or general inquiries.
          </p>

          <address className="mt-8 grid gap-3 not-italic sm:grid-cols-3 lg:grid-cols-1">
            <a href="tel:+1234567890" className="flex items-center gap-4 rounded-[24px] border border-[#F0DFE1] bg-[#FFF8F3] p-5 text-[#4A2E2B]">
              <Icon name="phone" className="shrink-0 text-[#B07A8D]" size={20} />
              <span>
                <span className="block text-sm font-semibold">Call Us</span>
                <span className="mt-1 block text-sm text-[#4A2E2B]/66">+1 234 567 890</span>
              </span>
            </a>
            <a href="mailto:hello@chokola.com" className="flex items-center gap-4 rounded-[24px] border border-[#F0DFE1] bg-[#FFF8F3] p-5 text-[#4A2E2B]">
              <Icon name="mail" className="shrink-0 text-[#B07A8D]" size={20} />
              <span>
                <span className="block text-sm font-semibold">Email Us</span>
                <span className="mt-1 block text-sm text-[#4A2E2B]/66">hello@chokola.com</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-[24px] border border-[#F0DFE1] bg-[#FFF8F3] p-5 text-[#4A2E2B]">
              <Icon name="mapPin" className="shrink-0 text-[#B07A8D]" size={20} />
              <span>
                <span className="block text-sm font-semibold">Location</span>
                <span className="mt-1 block text-sm text-[#4A2E2B]/66">Cairo, Egypt</span>
              </span>
            </div>
          </address>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[#4A2E2B]">Follow Us</h3>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#725758]">
              <a href="https://instagram.com/chokola" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#B07A8D]">
                <Icon name="instagram" size={17} /> Instagram
              </a>
              <a href="https://facebook.com/chokola" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#B07A8D]">
                <Icon name="facebook" size={17} /> Facebook
              </a>
              <a href="https://tiktok.com/@chokola" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#B07A8D]">
                <Icon name="music2" size={17} /> TikTok
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#B07A8D]">
                <Icon name="messageCircle" size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleContactSubmit} noValidate className="w-full max-w-[500px] justify-self-end rounded-[32px] border border-[#F0DFE1] bg-[#FFFDFC] p-6 md:p-8">
          <div className="space-y-7">
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
                className="h-16 w-full rounded-[18px] border border-[#F0DFE1] bg-white px-5 text-left outline-none transition-all duration-300 placeholder:text-[#725758]/60 focus:border-[#B07A8D] focus:ring-2 focus:ring-[#E7B5BB]/24"
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
                className="h-16 w-full rounded-[18px] border border-[#F0DFE1] bg-white px-5 text-left outline-none transition-all duration-300 placeholder:text-[#725758]/60 focus:border-[#B07A8D] focus:ring-2 focus:ring-[#E7B5BB]/24"
                placeholder="example@email.com"
              />
              {fieldErrors.email && <p id="email-error" className="mt-2 text-sm text-red-700">{fieldErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#3B2424]">Contact Number <span className="text-red-600">*</span></label>
              <div className="flex h-16 overflow-hidden rounded-[18px] border border-[#F0DFE1] bg-white transition-all duration-300 focus-within:border-[#B07A8D] focus-within:ring-2 focus-within:ring-[#E7B5BB]/24">
                <span className="flex shrink-0 items-center border-r border-[#F0DFE1] bg-[#FFF8F3] px-5 text-sm font-bold text-[#4A2E2B]" aria-hidden="true">
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
          </div>
          <div className="mt-7">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#3B2424]">Your Message <span className="text-red-600">*</span></label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                maxLength={MESSAGE_MAX_LENGTH}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                className="min-h-[240px] w-full resize-y rounded-[18px] border border-[#F0DFE1] bg-white px-5 py-4 text-left outline-none transition-all duration-300 placeholder:text-[#725758]/60 focus:border-[#B07A8D] focus:ring-2 focus:ring-[#E7B5BB]/24"
                placeholder="Your Message"
              />
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
            className="mx-auto mt-8 flex min-h-14 w-full max-w-[220px] items-center justify-center rounded-full bg-[#E7B5BB] px-8 text-sm font-bold text-[#4A2E2B] transition-colors duration-300 hover:bg-[#B07A8D] hover:text-[#FFF5F0] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:bg-[#E7B5BB] disabled:hover:text-[#4A2E2B]"
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
    <footer className="rounded-t-[32px] bg-[linear-gradient(135deg,#FFF5F0_0%,#F3E7EA_50%,#DCCDD1_100%)] px-6 py-14 text-[#6B5654] lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_1fr_0.8fr] lg:gap-12">
        <div>
          <div className="relative h-20 w-[210px]">
            <Image
              src="/chokola-logo-cropped.png"
              alt="Chokola Dessert Lounge logo"
              fill
              sizes="210px"
              className="object-contain object-left"
            />
          </div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#6B5654]">
            Premium desserts crafted daily for sweet moments and unforgettable experiences.
          </p>

          <div className="mt-5 flex gap-2.5">
            {[
              { label: 'Instagram', href: 'https://instagram.com/chokola', icon: 'instagram' },
              { label: 'Facebook', href: 'https://facebook.com/chokola', icon: 'facebook' },
              { label: 'TikTok', href: 'https://tiktok.com/@chokola', icon: 'music2' },
              { label: 'WhatsApp', href: 'https://wa.me/1234567890', icon: 'messageCircle' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#B07A8D]/28 text-[#B07A8D] transition-colors duration-300 hover:border-[#B07A8D] hover:bg-[#B07A8D] hover:text-white focus-visible:bg-[#B07A8D] focus-visible:text-white"
              >
                <Icon name={social.icon} size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#4A2E2B]">Navigation</h2>
          <div className="mt-5 space-y-3 text-sm text-[#6B5654]">
            {FOOTER_LINKS.map((link) => (
              <p key={link.href}>
                <a href={link.href} className="transition-colors duration-300 hover:text-[#C9A86A] focus-visible:text-[#C9A86A]">{link.label}</a>
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#4A2E2B]">Contact</h2>
          <address className="mt-5 space-y-4 text-sm text-[#6B5654] not-italic">
            <a href="tel:+1234567890" className="flex items-center gap-3 transition-colors duration-300 hover:text-[#C9A86A]">
              <Icon name="phone" className="shrink-0 text-[#B07A8D]" size={17} />
              +1 234 567 890
            </a>
            <a href="mailto:hello@chokola.com" className="flex items-center gap-3 transition-colors duration-300 hover:text-[#C9A86A]">
              <Icon name="mail" className="shrink-0 text-[#B07A8D]" size={17} />
              hello@chokola.com
            </a>
            <p className="flex items-center gap-3">
              <Icon name="mapPin" className="shrink-0 text-[#B07A8D]" size={17} />
              Cairo, Egypt
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#4A2E2B]">Opening Hours</h2>
          <div className="mt-5 space-y-3 text-sm leading-6 text-[#6B5654]">
            <div>
              <p className="font-semibold text-[#4A2E2B]">Daily</p>
              <p>{'10 AM \u2013 12 AM'}</p>
            </div>
            <div>
              <p className="font-semibold text-[#4A2E2B]">Friday</p>
              <p>{'2 PM \u2013 12 AM'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-center gap-2 border-t border-[#4A2E2B]/12 pt-5 text-center text-xs text-[#6B5654]/80 sm:flex-row sm:gap-6">
        <p>&copy; 2026 Chokola Dessert Lounge. All rights reserved.</p>
        <p>Crafted with love in Cairo, Egypt.</p>
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

