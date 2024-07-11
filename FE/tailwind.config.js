/** @type {import('tailwindcss').Config} */
// require('@tailwindcss/typography'), require('daisyui')
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    extend: {
      height: {
        'header-height': '56px'
      },
      spacing: {
        'header-height': '56px'
      },
      colors: {
        primary: '#1565D8',
        dark: {
          light: '#5A7184',
          hard: '#0D2436',
          soft: '#183B56',
          gray: '#77808B'
        }
      },
      fontFamily: {
        roboto: ["'Roboto'", 'sans-serif'],
        opensans: ["'Open Sans'", 'sans-serif']
      }
    }
  },

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ['light'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: 'd-', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root' // The element that receives theme color CSS variables
  }
}
