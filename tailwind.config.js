/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
