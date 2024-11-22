const { defineConfig } = require('cypress')

module.exports = {
  reporter: 'junit',
  defaultCommandTimeout: 60000,
  defaultBrowser: 'electron',

  env: {
    desktop: 'macbook-15',
  },
  experimentalWebKitSupport: true,
  experimentalStudio: true,

  e2e: {
    baseUrl: 'https://www.cocobambu.com/home',
  },
};