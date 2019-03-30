
const async = require('async')
const namedQueue = require('named-queue')
const needle = require('needle')
const metas = require('./meta')
const httpOpts = require('./httpOpts')
const simplify = require('./simplify')
const redis = require('./redis')

let anime = {
  movie: [],
  series: [],
  updated: 0
}

const kitsuEndpoint = 'https://addon.stremio-kitsu.cf'

const db = {
	flush: () => {
		anime = {
			movie: [],
			series: []
		}
		return true
	},
	insert: obj => {
		anime[obj.type].push(obj)
	},
	set: (type, index, obj) => {
		anime[type][index] = obj
	},
	getById: (type, id) => {
		if (!type || !id) return false
		let meta
		let index = -1
		anime[type].some((el, ij) => {
			if (el.id == id) {
				meta = el
				index = ij
				return true
			}
		})
		return { meta, index }
	},
	get: args => {
		return new Promise((resolve, reject) => {
			needle.get(kitsuEndpoint + '/meta/' + args.type + '/' + args.id + '.json', (err, resp, body) => {
				if (body && body.meta)
					resolve(body)
				else
					reject(new Error('Could not get meta from kitsu api for: '+args.id))
			})
		})
	},
	pages: (type, skip, end, cb) => {
		db.update(() => {
			cb(anime[type].slice(skip, end))
		})
	},
	search: (args, cb) => {
		db.update(() => {
			const query = simplify(args.extra.search)

			const results = []

			for (let key in anime[args.type]) {
				const item = anime[args.type][key].searcher
				if (item.name.includes(query) || (item.altName && item.altName.includes(query)))
					results.push(anime[args.type][key])
			}

			cb(results)
		})
	},
	shouldUpdate: () => {
		// update every 3 days
		return (!((anime || {}).series || []).length || !anime.updated || (anime.updated && anime.updated < Date.now() - 259200000))
	},
	update: cb => {
		if (db.shouldUpdate) {
			redis.get('anime-db', redisDb => {
				if (redisDb)
					anime = redisDb
				if (db.shouldUpdate) {
					needle.get('https://twist.moe/api/anime/', httpOpts.twist, (err, resp, body) => {
						if (body && Array.isArray(body)) {
							db.flush()
							body.forEach(el => {
								db.insert(metas.toMeta(el))
							})
							anime.updated = Date.now()
							redis.set('anime-db', anime)
						}
						if (cb) cb()
					})
				} else if (cb) cb()
			})
		} else if (cb) cb()
	}
}

module.exports = db
