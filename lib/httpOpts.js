const config = require('./config')

module.exports = {
	twist: {
		headers: {
			'x-access-token': config.ACCESS_TOKEN
		}
	}
}
