const h = require('react').createElement
const PropTypes = require('prop-types')
const cxs = require('./index')
const PureComponent = require('react').PureComponent
const shallowCompare = require('shallow-compare').default

module.exports = C => (...args) => {
 class Comp extends PureComponent {
    render() {
      const props = this.props
      const context = this.context
      const stylePropKeys = Object.keys(Comp.propTypes || {})
      const styleProps = Object.assign({ theme: context.theme || {} }, props)

      const next = {}
      for (let key in props) {
        if (stylePropKeys.includes(key)) continue
        next[key] = props[key]
      }
      next.className = [
        next.className,
        ...args.map(a => typeof a === 'function' ? a(styleProps) : a)
          .filter(s => s !== null)
          .map(s => cxs(s))
      ].join(' ').trim()

      return h(C, next)
    }
  }

  Comp.contextTypes = {
    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ])
  }

  return Comp
}

module.exports.css = cxs.css
module.exports.reset = cxs.reset
