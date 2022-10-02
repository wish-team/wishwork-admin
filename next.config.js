const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['events.h1y4.la.idrivee2-31.com'],
  },
  i18n,
  async redirects() {
    return [{ source: '/', destination: '/profile', permanent: true }]
  },
}
