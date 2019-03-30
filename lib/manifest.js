const package = require('../package')

module.exports = {
    id: 'org.twist.moe',
    version: package.version,
    logo: 'https://pbs.twimg.com/profile_images/1040274899854606338/f-VmanYZ_400x400.jpg',
    name: 'Twist.moe Anime',
    description: 'Add-on to show Anime from the Twist.moe website',
    resources: ['catalog', 'meta', 'stream'],
    types: ['series'],
    idPrefixes: ['kitsu:'],
    catalogs: [
      {
        type: 'series',
        id: 'twistmoeseries',
        name: 'Twist.moe',
        extra: [
          {
            name: 'skip'
          },
          {
          	name: 'search'
          }
        ]
      }
    ]
}
