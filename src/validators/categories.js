// @ts-ignore
import PresetError from '../errors/PresetError'

export default function (config, ...properties) {
  if (!config) return
  for (let property of properties) {
    let categories = config[property]
    if (categories && !Array.isArray(categories)) throw new PresetError(property, color)
  }
}
