const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],

  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        'title-color': '#1a1a1a',
        'background-color': '#fff',
        primary: '#1a1a1a',
        'primary-hover': '#333333',
        secondary: '#ffbb00',
        'input-color': '#ccc',
        'input-active-color': '#60C4B2',
        'input-error-color': '#f46a6a',
      },
      fontWeight: {
        extrablack: 950,
      },
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-logical'),

    // firefox only modifier
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: 'supports',
          params: '(-moz-appearance:none)',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1).replaceAll('\\', '')}`
          )}`
        })
      })
    }),
  ],
}
