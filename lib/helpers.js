const config = require('./config')

const CryptoJS = require('crypto-js')

const helpers = {
	decryptURL: encrypted => {
		return CryptoJS.enc.Utf8.stringify(
			CryptoJS.AES.decrypt(encrypted, config.AES_KEY)
		)
	},
	atob: str => {
	  return Buffer.from(str, 'base64').toString('binary')
	},
	btoa: str => {
	  return Buffer.from(str.toString(), 'binary').toString('base64')
	},
	meta: {

	}
}

module.exports = helpers
