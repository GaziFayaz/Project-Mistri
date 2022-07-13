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
    fontFamily: {
      "poppins": "Poppins, sans-serif",
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "homebg": "#ADD0CC",
        "header": "#00D3AD",
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
