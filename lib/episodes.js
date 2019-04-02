const CryptoJS = require('crypto-js')
const needle = require('needle')
const anime = require('./db')
const httpOpts = require('./httpOpts')
const config = require('./config')
const redis = require('./redis')

const episodes = {}

function decryptURL(encrypted) {
	return CryptoJS.enc.Utf8.stringify(
		CryptoJS.AES.decrypt(encrypted, config.AES_KEY)
	)
}

function episodeUrl(eps, nr) {
	let episode
	eps.some(ep => {
		if (ep.number == nr) {
			episode = ep
			return true
		}
	})
	const decrypted = decryptURL(episode.source)
	return episode && decrypted ? encodeURI('https://twist.moe' + decrypted) : false
}

module.exports = (args, callback) => {
	const id = args.id
	const idParts = id.split(':')
	const twistId = idParts[0] + ':' + idParts[1]
	const episode = idParts.length > 2 ? idParts[idParts.length -1] : 1
	const meta = anime.getById(args.type, twistId).meta
	const slug = (meta || {}).slug
	if (slug) {
		if (episodes[slug]) {
			const url = episodeUrl(episodes[slug], episode)
			if (url) {
				callback(null, { title: 'Stream', url })
				return
			}
		}
		redis.get(slug, redisSlug => {
			if (redisSlug) {
				const epUrl = episodeUrl(redisSlug, episode)
				if (epUrl) {
					callback(null, { title: 'Stream', url: epUrl })
					return
				}
			}
			needle.get('https://twist.moe/api/anime/' + slug + '/sources', httpOpts.twist, (err, resp, body) => {
			  if (body && Array.isArray(body)) {
			  	episodes[slug] = body
			  	redis.set(slug, body)
			  	// cache for 2 days
			  	setTimeout(() => {
			  		delete episodes[slug]
			  	}, 172800000)
			  	const url = episodeUrl(body, episode)
			  	if (url)
					callback(null, { title: 'Stream', url })
			  	else
					callback(new Error('Episode unavailable for: ' + id))
			  } else
				callback(new Error('Could not get episode url for: ' + id))
			})
		})
	} else {
		callback(new Error('No slug for id: ' + id))
	}
}
