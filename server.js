const { serveHTTP } = require('stremio-addon-sdk')
const addonInterface = require('./index')

serveHTTP(addonInterface, { port: process.env.PORT || 7650 })
