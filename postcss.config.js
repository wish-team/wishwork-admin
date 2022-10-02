module.exports = {
  plugins: {
    tailwindcss: {},

    // https://github.com/csstools/postcss-preset-env
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'custom-properties': false,
      },
    },
  },
}
