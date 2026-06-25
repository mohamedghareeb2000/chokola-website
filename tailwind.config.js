/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        chokola: {
          cream: 'rgb(var(--rgb-warm-cream) / <alpha-value>)',
          mauve: 'rgb(var(--rgb-dusty-mauve) / <alpha-value>)',
          blush: 'rgb(var(--rgb-blush-pink) / <alpha-value>)',
          chocolate: 'rgb(var(--rgb-chocolate-brown) / <alpha-value>)',
          nude: 'rgb(var(--rgb-nude-beige) / <alpha-value>)',
          gold: 'rgb(var(--rgb-soft-gold) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
