/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      'Lato': ['Lato', 'sans-serif']
    },
    screens: {
      'lph': '425px',
      'bmd': '525px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px'
    },
    extend: {
      backgroundImage: {
        'logo': 'url("../src/images/sneakers.png")',
        'search': 'url("../src/images/search.png")',
        'break-wall': 'url("../src/images/brick_wall.jpg")',
        'arrow-up': 'url("../src/images/up-arrow.svg")',
        'cancel': 'url("../src/images/cancel.svg")',
      },
      textShadow: {
        'default': '4px 0 0 #000' 
      },
      colors: {
        'transparent-black': '#0000004c',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
