
const searchers = {
	movie: {},
	series: {}
}

function simplify(str) {
	return str.toLowerCase().replace(/[^a-z0-9 ]/gi,'')
}

module.exports = {
	set: (meta, obj) => {
		searchers[meta.type][meta.id] = {
			name: simplify(obj.title),
			altName: obj.alt_title ? simplify(obj.alt_title) : null
		}
	},
	get: args => {

		const query = simplify(args.extra.search)

		const results = []

		for (let key in searchers[args.type])
			if (searchers[args.type][key].name.includes(query) || (searchers[args.type][key].altName && searchers[args.type][key].altName.includes(query)))
				results.push(key)

		return results

	}
}
