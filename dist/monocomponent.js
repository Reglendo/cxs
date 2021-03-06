'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var h = require('react').createElement;
var PropTypes = require('prop-types');
var cxs = require('./monolithic');

module.exports = function (C) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var Comp = function Comp(props) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var stylePropKeys = Object.keys(Comp.propTypes || {});
      var styleProps = Object.assign({ theme: context.theme || {} }, props);

      var next = {};
      for (var key in props) {
        if (stylePropKeys.includes(key)) continue;
        next[key] = props[key];
      }
      next.className = [next.className].concat(_toConsumableArray(args.map(function (a) {
        return typeof a === 'function' ? a(styleProps) : a;
      }).filter(function (s) {
        return s !== null;
      }).map(function (s) {
        return cxs(s);
      }))).join(' ').trim();

      return h(C, next);
    };

    Comp.contextTypes = {
      theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    };

    return Comp;
  };
};

module.exports.css = cxs.css;
module.exports.reset = cxs.reset;