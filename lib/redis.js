const redis = require('redis').createClient({
  host: 'redis-13025.c52.us-east-1-4.ec2.cloud.redislabs.com',
  port: 13025,
  password: process.env.REDIS_PASS
})

redis.on('error', err => { console.error('Redis error', err) })

module.exports = {
	get: (slug, cb) => {
		redis.get(slug, (err, redisRes) => {
			let redisSlug
			if (!err && redisRes) {
				try {
				  redisSlug = JSON.parse(redisRes)
				} catch(e) {
				  console.log('Redis error')
				  console.error(e)
				}
			}
			cb(redisSlug)
		})
	},
	set: (slug, data) => {
		redis.set(slug, JSON.stringify(data))
	}
}
