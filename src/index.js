import prefixAll from 'inline-style-prefixer/static'
let cache = {}
const rules = []
const prefix = '#app '
let insert = rule => rules.push(rule)
const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
const mx = (rule, media) => media ? `${media}{${rule}}` : rule
const qts = (prop, val) => (prop === 'content' ? ('"' + val + '"') : val)
const rx = (cn, prop, val) => { return `${cn}{${hyph(prop)}:${qts(prop, val)}}` }
const noAnd = s => s.replace(/&/g, '')
const multi = (cn, child) => {
  let r = []
  child.split(',').forEach((o) => {
    r.push((cn === '' ? '' : prefix + '.' + cn) + o)
  })
  return r.join(',')
}
const anim = (obj) => {
  return Object.keys(obj).map(key => {
    if (typeof obj[key] === 'string') {
      return hyph(key) + ': ' + obj[key] + ';'
    } else {
      return key + ' {'
        + anim(obj[key]) +
        '}'
    }
  }).join(' ')
}
const parse = (obj, child = '', media, prep = true) => {
  return Object.keys(obj).map(key => {
    const val = obj[key]

    if (val === null) return ''
    if (typeof val === 'object') {
      if (/^@keyframes/.test(key)) {
        insert(key + '{' + anim(val) + '}')
        return
      } else {
        const m2 = /^@/.test(key) ? key : null
        const c2 = m2 ? child : child + key
        return parse(val, c2, m2 || media)
      }
    }
    const _key = key + val + child + media
    if (cache[_key]) return cache[_key]
    const className = 'x' + (rules.length).toString(36)
    insert(mx(rx(multi(className, noAnd(child)), key, val), media))
    cache[_key] = className
    return className
  })
    .join(' ')
}
module.exports = (...styles) => {
  return styles.map(style => {
    const prefixedStyle = prefixAll(style)
    return parse(prefixedStyle)
  })
    .join(' ').trim()
}
module.exports.css = () => rules.sort().join('')

module.exports.reset = () => {
  cache = {}
  while (rules.length) rules.pop()
}

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(
    document.createElement('style')
  ).sheet
  insert = rule => {
    rules.push(rule)
    try {
      sheet.insertRule(rule, sheet.cssRules.length)
    } catch (e) {
    }
  }
}
