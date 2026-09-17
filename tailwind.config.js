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
        slackey: ['var(--font-slackey)', 'Slackey', 'cursive', 'sans-serif'],
        caprasimo: ['var(--font-caprasimo)', 'Caprasimo', 'serif'],
        encode: ['var(--font-encode-sans)', 'Encode Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          gold: '#DFB143',
          goldDark: '#C99E34',
          mint: '#50BF8E',
          mintDark: '#3DA376',
          green: '#3FA360',
          greenDark: '#328A4F',
          lime: '#D4F88D',
          limeMuted: '#BBE66E',
          blue: '#6EB3C6',
          blueDark: '#559CAE',
          cream: '#F6F7F3',
          charcoal: '#141716',
          deepBlack: '#0B0D0C',
        }
      },
      aspectRatio: {
        'anamorphic': '2.39 / 1',
        'cinemascope': '2.35 / 1',
        'academy': '1.375 / 1',
        'classic': '4 / 3',
        'vertical': '9 / 16',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
