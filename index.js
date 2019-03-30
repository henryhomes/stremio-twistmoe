const metas = require('./lib/meta')
const episodes = require('./lib/episodes')
const anime = require('./lib/db')
const manifest = require('./lib/manifest')

const { addonBuilder }  = require('stremio-addon-sdk')

const addon = new addonBuilder(manifest)

const paginate = 40

addon.defineCatalogHandler(args => {
    return new Promise((resolve, reject) => {
      if (args.extra.search) {
        anime.search(args, metas => {
          if (metas.length)
            resolve({ metas, cacheMaxAge: 1209600 }) // cache 14 days
          else
            reject(new Error('No search results for: ' + args.extra.search))
        })
      } else {
        const skip = parseInt(args.extra.skip || 0)
        anime.pages(args.type, skip, skip + paginate, metas => {
          if (metas.length)
            resolve({ metas, cacheMaxAge: 172800 }) // cache 2 days
          else
            reject(new Error('No catalog entries available'))
        })
      }
    })
})

addon.defineMetaHandler(args => {
  return anime.get(args)
})

addon.defineStreamHandler(args => {
  return new Promise((resolve, reject) => {
    episodes(args, (err, ep) => {
      if (ep)
        resolve({ streams: [ep], cacheMaxAge: 1209600 }) // cache 14 days
      else
        reject(err || new Error('Unknown episode error for: ' + args.id))
    })
  })
})

module.exports = addon.getInterface()
