'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var h = require('react').createElement;
var PropTypes = require('prop-types');
var cxs = require('./index');
var PureComponent = require('react').PureComponent;
var shallowCompare = require('shallow-compare').default;

module.exports = function (C) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var Comp = function (_PureComponent) {
      _inherits(Comp, _PureComponent);

      function Comp() {
        _classCallCheck(this, Comp);

        return _possibleConstructorReturn(this, (Comp.__proto__ || Object.getPrototypeOf(Comp)).apply(this, arguments));
      }

      _createClass(Comp, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          return shallowCompare(this, nextProps, nextState);
        }
      }, {
        key: 'render',
        value: function render() {
          var props = this.props;
          var context = this.context;
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
        }
      }]);

      return Comp;
    }(PureComponent);

    Comp.contextTypes = {
      theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    };

    return Comp;
  };
};

module.exports.css = cxs.css;
module.exports.reset = cxs.reset;