/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'inter' : ['Inter'],
      'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      'Secula-One': ['Secular One', 'sans-serif']
        },
    extend: {
      colors:{
        'rieu-blue': '#003355',
        'rieu-blue2': '#1361F5',
        'rieu-yellow': '#EE9322',
        'rieu-cyan': '#088395',
        'rieu-gray100': '#535558',
        'rieu-bg': '#F4F4F4'
      },
      margin: {
        '-116': '-28.75rem',
      },
    },
  },
  plugins: [],
}

