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
  watchForFileChanges: false,

  e2e: {
    baseUrl: 'https://www.madeiramadeira.com.br/',
  },
};