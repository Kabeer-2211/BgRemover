/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FBA834',
        secondary: '#3C3D37',
        'alice-blue': '#EBF1F8',
        'bright-azure': '#0B80E0',
        'emerald-green': '#37C978',
        ash: '#191919',
        black: '#202020',
        charcoal: '#292929',
        'lavender-blue': '#EBEFFF',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '900px',
        'xl': '1280px',
      }
    },
  },

  plugins: [],
}

