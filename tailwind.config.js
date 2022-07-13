module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm': {'max' : '639px'},
      'md': {'min' : '639px'}
    },
    extend: {
      colors: {
        // ...
        'New Swatch': {
          DEFAULT: '#51555A',
          dark: '#0e7490',
        },
        // ...
      },
    },
  },
  plugins: [],
}
