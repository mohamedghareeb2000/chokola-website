'use client';

import Image from 'next/image';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BRAND = {
  name: 'Chokola',
  subtitle: 'Dessert Lounge',
  primary: '#E7B5BB',
  secondary: '#4A2E2B',
  background: '#FFF5F0',
  accent: '#B07A8D',
  cream: '#FFF9F6',
  muted: '#7B5A56',
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
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '#about' },
  { label: 'Location', href: '#location' },
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
    name: 'Velvet Cream Dessert',
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
  message: '',
};

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
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-36 sm:h-14 sm:w-44">
        <Image
          src="/chokola-logo.png"
          alt="Chokola Dessert Lounge logo"
          fill
          priority
          sizes="(max-width: 640px) 144px, 176px"
          className="object-contain object-left"
        />
      </div>
    </div>
  );
});

function useHeroMotion(shouldReduceMotion) {
  return useMemo(
    () => ({
      float: shouldReduceMotion
        ? { y: 0 }
        : { rotate: [0, 2.5, -1.5, 0], y: [0, -14, 0], scale: 1 },
      floatTransition: shouldReduceMotion
        ? { duration: 0.3 }
        : { duration: 1, ease: 'easeOut', y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } },
      atmosphereTransition: shouldReduceMotion
        ? { duration: 0.3 }
        : { duration: 10, repeat: Infinity, ease: 'easeInOut' },
    }),
    [shouldReduceMotion]
  );
}

function Navbar({ mobileMenuOpen, onToggleMenu, onCloseMenu }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#E7B5BB]/45 bg-[#FFF5F0]/95 px-4 py-3 shadow-[0_10px_35px_rgba(74,46,43,0.08)] backdrop-blur-xl sm:px-6 lg:px-10" aria-label="Main navigation">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between">
        <a href="#home" onClick={onCloseMenu} aria-label="Go to Chokola homepage">
          <Logo />
        </a>

        <div className="hidden items-center gap-2 text-sm font-semibold text-[#4A2E2B] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-[#E7B5BB] hover:text-[#4A2E2B] focus-visible:bg-[#E7B5BB]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-[#E7B5BB] px-5 py-2.5 text-sm font-semibold text-[#4A2E2B] shadow-[0_12px_30px_rgba(231,181,187,0.45)] transition hover:-translate-y-0.5 hover:bg-[#B07A8D] hover:text-white sm:inline-flex"
          >
            Contact Us
          </a>
          <button
            type="button"
            onClick={onToggleMenu}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#E7B5BB] bg-white text-[#B07A8D] transition hover:bg-[#FFF9F6] md:hidden"
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
          className="mx-auto mt-3 max-w-[1600px] rounded-[1.5rem] border border-[#E7B5BB]/60 bg-[#FFF9F6]/95 p-4 shadow-[0_20px_60px_rgba(74,46,43,0.12)] md:hidden"
        >
          <div className="grid gap-2 text-sm font-semibold text-[#4A2E2B]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onCloseMenu}
                className="rounded-2xl px-4 py-3 transition hover:bg-[#E7B5BB] focus-visible:bg-[#E7B5BB]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function Hero({ activeSlide, setActiveSlide }) {
  const shouldReduceMotion = useReducedMotion();
  const currentSlide = HERO_SLIDES[activeSlide];
  const motionConfig = useHeroMotion(shouldReduceMotion);

  return (
    <section id="home" className="hero-bg relative min-h-screen overflow-hidden px-4 pt-[108px] sm:px-6 lg:px-10" aria-labelledby="hero-title">
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0] }}
        transition={motionConfig.atmosphereTransition}
        className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#E7B5BB]/60 blur-3xl"
      />
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: [0, -20, 0], y: [0, 14, 0] }}
        transition={{ ...motionConfig.atmosphereTransition, duration: 11 }}
        className="absolute right-[-120px] top-[120px] h-[560px] w-[560px] rounded-full bg-[#B07A8D]/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-108px)] w-full max-w-[1650px] items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] xl:gap-14">
        <div className="max-w-[620px] pb-10 lg:pb-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E7B5BB]/70 bg-white/45 px-4 py-2 text-sm font-medium text-[#B07A8D] backdrop-blur-md"
          >
            <Icon name="sparkles" size={16} />
            Life is sweeter with dessert
          </motion.div>

          <motion.h1
            id="hero-title"
            key={currentSlide.name}
            initial={{ opacity: 0, y: 40, filter: shouldReduceMotion ? 'none' : 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7 }}
            className="font-serif text-5xl font-black leading-[0.94] tracking-tight text-[#B07A8D] sm:text-6xl md:text-7xl xl:text-[7rem]"
          >
            {currentSlide.name}
          </motion.h1>

          <motion.div
            key={`rating-${activeSlide}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-1 text-[#C9A66A]" aria-label="Rated four out of five stars">
              <span aria-hidden="true">★</span>
              <span aria-hidden="true">★</span>
              <span aria-hidden="true">★</span>
              <span aria-hidden="true">★</span>
              <span className="text-[#E7D8D2]" aria-hidden="true">★</span>
            </div>
            <span className="text-sm font-medium text-[#7B5A56]">4.8 dessert favorite</span>
          </motion.div>

          <motion.p
            key={`desc-${activeSlide}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mt-6 max-w-[520px] text-base leading-7 text-[#4A2E2B] sm:text-lg sm:leading-8"
          >
            Elegant desserts, soft feminine details, warm chocolate notes, and a premium dessert lounge experience designed for sweet moments.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-wrap gap-4">
            <a
              href="#menu"
              className="group rounded-full bg-[#E7B5BB] px-8 py-4 text-sm font-semibold text-[#4A2E2B] shadow-[0_18px_40px_rgba(231,181,187,0.45)] transition hover:-translate-y-1 hover:bg-[#B07A8D] hover:text-white focus-visible:bg-[#B07A8D] focus-visible:text-white"
            >
              View Menu
              <Icon name="arrowRight" size={17} className="ml-2 inline transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-[#E7B5BB] bg-white/45 px-8 py-4 text-sm font-semibold text-[#B07A8D] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/70 focus-visible:bg-white"
            >
              Contact Us
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-12 flex items-center gap-4" aria-label="Featured dessert selector">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.name}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`relative h-16 w-16 overflow-hidden rounded-full bg-white p-1.5 shadow-[0_14px_30px_rgba(74,46,43,0.12)] transition ${activeSlide === index ? 'scale-110 ring-2 ring-[#E7B5BB]' : 'opacity-90 hover:scale-105'}`}
                aria-label={`Show ${slide.name}`}
                aria-pressed={activeSlide === index}
              >
                <Image src={slide.image} alt="" width={64} height={64} sizes="64px" className="h-full w-full rounded-full object-cover" />
                {activeSlide === index && <span className="absolute -bottom-3 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#B07A8D]" />}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[calc(100vh-150px)]">
          <motion.div
            key={`halo-${activeSlide}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute h-[340px] w-[340px] rounded-full bg-white/55 blur-2xl sm:h-[480px] sm:w-[480px] xl:h-[650px] xl:w-[650px]"
          />

          <motion.div
            key={`product-${currentSlide.name}`}
            initial={{ x: shouldReduceMotion ? 0 : 180, opacity: 0, rotate: shouldReduceMotion ? 0 : -10, scale: 0.78 }}
            animate={{ x: 0, opacity: 1, ...motionConfig.float }}
            transition={motionConfig.floatTransition}
            className="relative z-10 aspect-square w-[300px] overflow-hidden rounded-full shadow-[0_40px_90px_rgba(74,46,43,0.18)] sm:w-[460px] md:w-[560px] lg:w-[640px] xl:w-[720px]"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.alt}
              fill
              priority={activeSlide === 0}
              sizes="(max-width: 640px) 300px, (max-width: 768px) 460px, (max-width: 1024px) 560px, (max-width: 1280px) 640px, 720px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="section-soft px-6 py-24" aria-labelledby="menu-title">
      <div className="mx-auto max-w-6xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#B07A8D]">Our Menu</p>
          <h2 id="menu-title" className="font-serif text-4xl font-bold text-[#4A2E2B] md:text-5xl">
            A curated world of sweetness
          </h2>
          <p className="mt-5 leading-7 text-[#7B5A56]">
            Explore signature desserts crafted for sweet moments, celebrations, and elegant lounge experiences.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {MENU_ITEMS.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.015 }}
              className="group overflow-hidden rounded-[1.75rem] border border-[#E7B5BB]/55 bg-white/80 shadow-[0_24px_60px_rgba(74,46,43,0.10)] backdrop-blur-xl"
            >
              <div className="relative h-60 overflow-hidden">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-bold text-[#4A2E2B]">{item.title}</h3>
                  <span className="rounded-full bg-[#FFF5F0] px-3 py-1 text-sm font-semibold text-[#B07A8D]">{item.price}</span>
                </div>
                <p className="mt-3 leading-7 text-[#7B5A56]">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-dark px-6 py-24 text-white" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#E7B5BB]">About Us</p>
          <h2 id="about-title" className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            Elegant, modern, sweet.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Chokola Dessert Lounge is built around indulgence, warmth, and feminine luxury. Every dessert is presented with soft details, rich flavors, and a polished visual experience.
          </p>
          <p className="mt-5 leading-8 text-white/70">
            From chocolate desserts to strawberry-inspired sweets, Chokola creates a premium lounge feeling for moments worth remembering.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="relative">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#E7B5BB]/25 blur-3xl" />
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1100&q=90"
              alt="Chokola dessert preparation with cream and decorative sweets"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section id="location" className="section-soft px-6 py-24" aria-labelledby="location-title">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#B07A8D]">Our Branch</p>
        <h2 id="location-title" className="font-serif text-4xl font-bold text-[#4A2E2B] md:text-5xl">
          Visit Chokola
        </h2>

        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-[#E7B5BB]/55 bg-white/80 shadow-[0_28px_80px_rgba(74,46,43,0.12)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 md:p-12">
            <h3 className="font-serif text-3xl font-bold text-[#4A2E2B]">Chokola — Main Branch</h3>
            <div className="mt-7 space-y-5 text-[#7B5A56]">
              <p className="flex gap-3">
                <Icon name="mapPin" className="mt-1 shrink-0 text-[#B07A8D]" /> 24 Sweet Avenue, Dessert District
              </p>
              <p className="flex gap-3">
                <Icon name="clock" className="mt-1 shrink-0 text-[#B07A8D]" /> Open daily: 10:00 AM - 11:00 PM
              </p>
              <p className="flex gap-3">
                <Icon name="phone" className="mt-1 shrink-0 text-[#B07A8D]" /> +1 234 567 890
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Chokola location in Google Maps"
              className="mt-9 inline-flex items-center rounded-full bg-[#E7B5BB] px-7 py-4 font-semibold text-[#4A2E2B] transition hover:-translate-y-1 hover:bg-[#B07A8D] hover:text-white focus-visible:bg-[#B07A8D] focus-visible:text-white"
            >
              Get Directions <Icon name="arrowRight" className="ml-2" size={18} />
            </a>
          </div>

          <div className="relative min-h-[360px] bg-[#FFF5F0]">
            <div className="absolute inset-6 rounded-[1.5rem] border border-[#E7B5BB]/60 bg-[linear-gradient(135deg,#FFF9F6,#FFF5F0)] p-8">
              <div className="grid h-full place-items-center rounded-[1.2rem] border-2 border-dashed border-[#E7B5BB] text-center">
                <div>
                  <Icon name="mapPin" className="mx-auto mb-4 text-[#B07A8D]" size={44} />
                  <p className="font-serif text-3xl font-bold text-[#4A2E2B]">Map Placeholder</p>
                  <p className="mt-2 text-[#7B5A56]">Embed your Google Map here</p>
                </div>
              </div>
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

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: undefined }));
    setStatus({ type: 'idle', message: '' });
  }, []);

  const validateClient = useCallback(() => {
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Please enter your name.';
    if (!formState.phone.trim()) errors.phone = 'Please enter your phone number.';
    if (!formState.message.trim()) errors.message = 'Please write your message.';
    return errors;
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

  const statusClass = status.type === 'success' ? 'text-green-700 bg-green-50 border-green-200' : status.type === 'error' ? 'text-red-700 bg-red-50 border-red-200' : 'text-[#7B5A56] bg-[#FFF9F6] border-[#E7B5BB]/60';

  return (
    <section id="contact" className="section-soft px-6 py-24" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-[#B07A8D]">Contact Us</p>
          <h2 id="contact-title" className="font-serif text-4xl font-bold leading-tight text-[#4A2E2B] md:text-5xl">
            Have a question? We would love to hear from you.
          </h2>
          <p className="mt-5 leading-8 text-[#7B5A56]">
            Reach us for branch information, menu details, collaborations, or general inquiries.
          </p>
          <address className="mt-9 space-y-4 not-italic text-[#4A2E2B]">
            <p className="flex items-center gap-3"><Icon name="phone" className="text-[#B07A8D]" /> +1 234 567 890</p>
            <p className="flex items-center gap-3"><Icon name="messageCircle" className="text-[#B07A8D]" /> WhatsApp available</p>
            <p className="flex items-center gap-3"><Icon name="instagram" className="text-[#B07A8D]" /> @chokola</p>
            <p className="flex items-center gap-3"><Icon name="mail" className="text-[#B07A8D]" /> hello@chokola.com</p>
          </address>
        </div>

        <form onSubmit={handleContactSubmit} noValidate className="rounded-[2rem] border border-[#E7B5BB]/55 bg-white/80 p-6 shadow-[0_28px_80px_rgba(74,46,43,0.12)] backdrop-blur-xl md:p-9">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#4A2E2B]">Name</label>
              <input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                className="w-full rounded-2xl border border-[#E7B5BB]/70 bg-[#FFF9F6] px-4 py-4 outline-none transition focus:border-[#B07A8D] focus:ring-4 focus:ring-[#E7B5BB]/35"
                placeholder="Your name"
              />
              {fieldErrors.name && <p id="name-error" className="mt-2 text-sm text-red-700">{fieldErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#4A2E2B]">Phone</label>
              <input
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                className="w-full rounded-2xl border border-[#E7B5BB]/70 bg-[#FFF9F6] px-4 py-4 outline-none transition focus:border-[#B07A8D] focus:ring-4 focus:ring-[#E7B5BB]/35"
                placeholder="Your phone"
              />
              {fieldErrors.phone && <p id="phone-error" className="mt-2 text-sm text-red-700">{fieldErrors.phone}</p>}
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#4A2E2B]">Message</label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? 'message-error' : undefined}
              className="min-h-40 w-full rounded-2xl border border-[#E7B5BB]/70 bg-[#FFF9F6] px-4 py-4 outline-none transition focus:border-[#B07A8D] focus:ring-4 focus:ring-[#E7B5BB]/35"
              placeholder="Write your message"
            />
            {fieldErrors.message && <p id="message-error" className="mt-2 text-sm text-red-700">{fieldErrors.message}</p>}
          </div>

          {status.message && (
            <p className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${statusClass}`} role="status" aria-live="polite">
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-[#E7B5BB] px-7 py-4 font-semibold text-[#4A2E2B] transition hover:-translate-y-1 hover:bg-[#B07A8D] hover:text-white disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0 disabled:hover:bg-[#E7B5BB] disabled:hover:text-[#4A2E2B]"
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
          <div className="font-script text-5xl text-[#E7B5BB]">Chokola</div>
          <p className="mt-4 max-w-sm leading-7 text-white/65">
            Premium desserts, soft elegance, and sweet lounge moments.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-[#E7B5BB]">Quick Links</h2>
          <div className="mt-4 space-y-2 text-white/65">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <p key={link.href}>
                <a href={link.href} className="hover:text-[#E7B5BB] focus-visible:text-[#E7B5BB]">{link.label}</a>
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-[#E7B5BB]">Contact</h2>
          <address className="mt-4 space-y-2 text-white/65 not-italic">
            <p>+1 234 567 890</p>
            <p>hello@chokola.com</p>
            <p>@chokola</p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-white/45">
        © 2026 Chokola Dessert Lounge. All rights reserved.
      </div>
    </footer>
  );
}

const selfCheck = {
  hasSixMenuItems: MENU_ITEMS.length === 6,
  hasNoOrderingLabels: !JSON.stringify({ menuItems: MENU_ITEMS, navLinks: NAV_LINKS }).toLowerCase().match(/cart|checkout|order now|add to cart|payment|delivery/),
  hasRequiredSections: ['#home', '#menu', '#about', '#location', '#contact'].every((href) => NAV_LINKS.some((link) => link.href === href)),
  hasHeroSlides: HERO_SLIDES.length === 4,
  hasHeroSlideImages: HERO_SLIDES.every((slide) => Boolean(slide.image && slide.name && slide.price && slide.alt)),
  hasUniqueHeroSlideNames: new Set(HERO_SLIDES.map((slide) => slide.name)).size === HERO_SLIDES.length,
  hasNoDuplicateNavHrefs: new Set(NAV_LINKS.map((link) => link.href)).size === NAV_LINKS.length,
  usesChokolaBrand: BRAND.name === 'Chokola' && BRAND.primary === '#E7B5BB' && BRAND.secondary === '#4A2E2B',
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((value) => !value), []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % HERO_SLIDES.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF5F0] text-[#4A2E2B]">
      <Navbar mobileMenuOpen={mobileMenuOpen} onToggleMenu={toggleMobileMenu} onCloseMenu={closeMobileMenu} />
      <Hero activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
      <MenuSection />
      <AboutSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
