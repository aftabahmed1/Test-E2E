const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video:false,
  screenshotOnRunFailure:false,
  reporter: 'cypress-mochawesome-reporter',
  failOnStatusCode: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'test-e2e',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://iprice.my/',
    apiUrl: "https://restful-booker.herokuapp.com/booking"
  },
})
