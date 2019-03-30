
module.exports = {
	getPoster: obj => {
		return obj.hb_id ? 'https://media.kitsu.io/anime/poster_images/' + obj.hb_id + '/small.jpg' : null
	},
	getLogo: obj => {
		return obj.hb_id ? 'https://media.kitsu.io/anime/cover_images/' + obj.hb_id + '/small.jpg' : null
	},
	getBackground: obj => {
		return obj.hb_id ? 'https://media.kitsu.io/anime/cover_images/' + obj.hb_id + '/original.jpg' : null
	}
}
