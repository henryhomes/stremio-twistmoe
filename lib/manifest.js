
module.exports = {
    id: 'org.twist.moe',
    version: '0.0.3',
    logo: 'https://pbs.twimg.com/profile_images/1040274899854606338/f-VmanYZ_400x400.jpg',
    name: 'Twist.moe Anime',
    description: 'Add-on to show Anime from the Twist.moe website',
    resources: ['catalog', 'meta', 'stream'],
    types: ['series', 'movie'],
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
