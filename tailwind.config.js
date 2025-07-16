/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'system-ui', 'sans-serif'],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[700]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-links': theme('colors[#F7A69D]'),
            '--tw-prose-bold': theme('colors.gray[900]'),
            '[lang="hi"] &': {
              fontFamily: 'var(--font-devanagari)',
              lineHeight: '2',
              letterSpacing: '0.3px',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 