

/**  @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        QuickSand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primaryColor: "#1A3764",
      },
    },
    animation: {
      slideTop : `slideTop .5s ease-out forwards`
    },
    keyframes: {
      slideTop: {
        '0%' : { opacity: 0 , transform: 'translateY(0)' },
        '100%' : { opacity: 1 , transform: 'translateY(50px)' }
      }
    }
  },
  plugins: [
    plugin(function ({  addUtilities }) {
      addUtilities({
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
          '.text-stroke': {
            '-webkit-text-stroke': '2px #DCDFE2', // Green color stroke
            'text-stroke': '2px #DCDFE2',
          },
      })

     }),

  ],
}

