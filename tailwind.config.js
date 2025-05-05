/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Cabin", "serif"],
        utilities: {
          '.hide-scrollbar': {
            /* Hide scrollbar */
            '-ms-overflow-style': 'none',  /* IE and Edge */
            'scrollbar-width': 'none',  /* Firefox */
          },
          '.hide-scrollbar::-webkit-scrollbar': {
            'display': 'none',  /* Chrome, Safari, and Opera */
          },
        },
  
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar': {
          /* Hide scrollbar */
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none',  /* Chrome, Safari, and Opera */
        },
      }

      addUtilities(newUtilities)
    }
  ],
}