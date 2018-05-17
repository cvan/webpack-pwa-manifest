import validatePresets from './validators/presets'
import validateColors from './validators/colors'
import checkDeprecated from './validators/versioning'

class WebpackPwaManifest {
  constructor (options = {}) {
    validatePresets(options, 'dir', 'display', 'orientation')
    validateColors(options, 'background_color', 'theme_color')
    checkDeprecated(options, 'useWebpackPublicPath')
    this._generator = null
    this.assets = null
    this.htmlPlugin = false
    const name = (options.name || 'App').trim()
    const shortName = (options.short_name || name).trim()
    const categories = (options.categories || []).map(cat => (cat || '').trim().toLowerCase()).filter(cat => !!cat)
    const startUrl = options.start_url || '.'
    const scope = options.scope || startUrl
    this.options = Object.assign({
      filename: '[name].[hash][ext]',
      name: name,
      short_name: shortName,
      orientation: 'portrait',
      display: 'standalone',
      start_url: startUrl,
      scope: scope,
      inject: true,
      fingerprints: true,
      ios: false,
      publicPath: null,
      includeDirectory: true
    }, options)
    if (categories.length) {
      this.options.categories = categories
    }
  }

  _acquireGenerator (hooks) {
    return hooks ? require('./generators/tapable') : require('./generators/legacy')
  }

  apply (compiler) {
    const { hooks } = compiler
    const generator = this._generator || (this._generator = this._acquireGenerator(hooks))
    generator(this, compiler)
  }
}

module.exports = WebpackPwaManifest
