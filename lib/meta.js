const images = require('./images')
const simplify = require('./simplify')

module.exports = {

	toMeta: obj => {
		return {
			id: 'kitsu:' + obj.hb_id,
			type: 'series',
			name: obj.title,
			logo: images.getLogo(obj),
			poster: images.getPoster(obj),
			background: images.getBackground(obj),
			slug: obj.slug.slug,
			searcher: {
				name: simplify(obj.title),
				altName: obj.alt_title ? simplify(obj.alt_title) : null
			}
		}
	}

}

