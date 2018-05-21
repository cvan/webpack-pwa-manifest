import checkDeprecated from './validators/versioning'
import validateCategories from './validators/categories'
import validateColors from './validators/colors'
import validatePresets from './validators/presets'

class WebpackPwaManifest {
  constructor (options = {}) {
    checkDeprecated(options, 'useWebpackPublicPath')
    validateCategories(options, 'categories')
    validateColors(options, 'background_color', 'theme_color')
    validatePresets(options, 'dir', 'display', 'orientation')
    this._generator = null
    this.assets = null
    this.htmlPlugin = false
    const name = _parseName(options.name, 'App')
    const shortName = _parseShortName(options.short_name, name)
    const startUrl = _parseStartUrl(options.start_url, '.')
    const scope = _parseScope(options.scope, startUrl)
    const categories = _parseCategories(options.categories)
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

  _parseName (name, fallbackName) {
    return name.trim() || fallbackName
  }

  _parseShortName (shortName, fallbackShortName) {
    return shortName.trim() || fallbackShortName
  }

  _parseStartUrl (startUrl, fallbackStartUrl) {
    return startUrl || fallbackStartUrl
  }

  _parseScope (scope, fallbackScope) {
    return scope || startUrl
  }

  _parseCategories (categories) {
    return (categories || []).map(cat => (cat || '').trim().toLowerCase()).filter(cat => !!cat)
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
