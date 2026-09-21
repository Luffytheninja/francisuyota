/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        slackey:  ['var(--font-slackey)',     'Slackey',    'cursive',    'sans-serif'],
        caprasimo:['var(--font-caprasimo)',   'Caprasimo',  'serif'],
        cinzel:   ['var(--font-cinzel)',      'Cinzel',     'serif'],
        encode:   ['var(--font-encode-sans)', 'Encode Sans','sans-serif'],
      },
      colors: {
        brand: {
          black:     '#0B0D0C',
          charcoal:  '#141716',
          surface:   '#1A1D1B',
          mint:      '#50BF8E',
          mintDark:  '#3DA376',
          gold:      '#DFB143',
          goldDark:  '#C99E34',
          cream:     '#FFFAB3',
          sky:       '#8ECDE2',
          lime:      '#D4F88D',
          white:     '#F4F4F0',
        },
      },
      aspectRatio: {
        'anamorphic':  '2.39 / 1',
        'cinemascope': '2.35 / 1',
        'academy':     '1.375 / 1',
        'classic':     '4 / 3',
        'vertical':    '9 / 16',
      },
      animation: {
        'spin-slow':      'spin 12s linear infinite',
        'pulse-subtle':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up':        'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
