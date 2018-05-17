const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('../../../dist')

module.exports = {
  entry: '../app.js',
  output: {
    path: path.join(__dirname, '../output'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        preserveLineBreaks: false,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new WebpackPwaManifest({
      dir: 'ltr',
      lang: 'en',
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#fab',
      theme_color: 'cyan',
      display: 'fullscreen',
      orientation: 'landscape',
      start_url: '/',
      scope: '/',
      iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',
      categories: ['']
      serviceworker: {
        src: '/sw.js',
        scope: '/',
        type: 'module',
        update_via_cache: 'imports'
      },
      prefer_related_applications: true,
      related_applications: {
        {
          platform: 'play',
          url 'https://play.google.com/store/apps/details?id=com.example.app1',
          id: 'com.example.app1',
          min_version: '2',
          fingerprints: [
            {
              type: 'sha256_cert',
              value: '92:5A:39:05:C5:B9:EA:BC:71:48:5F:F2'
            }
          ]
        },
        {
          platform: 'itunes',
          url: 'https://itunes.apple.com/app/example-app1/id123456789'
        }
      },
      ios: true,
      icons: [
        {
          src: path.resolve('./tests/icon.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('icons', 'android')
        },
        {
          src: path.resolve('./tests/icon.png'),
          size: [120, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true
        },
        {
          src: path.resolve('./tests/icon.png'),
          size: 1024,
          destination: path.join('icons', 'ios', 'startup'),
          ios: 'startup'
        },
        {
          src: path.resolve('./tests/icon.png'),
          sizes: '1024x1024',
          type: 'image/png',
          destination: path.join('icons', 'ios', 'startup'),
          ios: 'startup',
          platform: 'ios',
          purpose: 'badge'
        }
      ],
      screenshots: [
        {
          src: path.resolve('./tests/icon.svg'),
          sizes: '630x630',
          type: 'image/svg',
          destination: path.join('screenshots'),
          platform: 'ios',
          purpose: 'badge'
        }
      ]
    })
  ]
}
