module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    screens:{
      'sm': {'max' : '660px'},
      'md': {'min' : '660px'}
    },
    fontFamily: {
      "poppins": "Poppins, sans-serif",
      "monts": "Montserrat, sans-serif",
      "dosis": "Dosis, sans-serif",
    },
    extend: {
      colors: {
        "transparent": "transparent",
        "current": "currentColor",
        "homebg": "#ADD0CC",
        "header": "#00D3AD",
        "proDropDown": "#9EFFE8",
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
