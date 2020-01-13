
// use local obj for local addon
const obj = {}

module.exports = {
	get: (slug, cb) => {
		cb(obj[slug] || false)
	},
	set: (slug, data) => {
		obj[slug] = data
	}
}
